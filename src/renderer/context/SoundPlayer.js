import React, { createContext, useContext, useEffect, useState } from 'react';
import path from 'path-browserify';

const audioContext = new AudioContext();
const gainNode = audioContext.createGain();

const soundPlayerContext = createContext();
export const usePlayer = () => {
	const context = useContext(soundPlayerContext);
	if (!context) throw new Error('There is no sound player provider');

	return context;
};

export const SoundPlayer = ({ children }) => {
	const [sounds, setSounds] = useState([]);
	const [buffers, setBuffers] = useState([]);
	const [volume, setVolume] = useState(gainNode.gain.defaultValue);
	const [playerState, setPlayerState] = useState({ playing: false, sourceNode: null });

	const createBuffer = async ({ key, route }) => {
		const buffer = await window.sounds.createBuffer(route);
		const decodedBuffer = await audioContext.decodeAudioData(buffer);

		setBuffers([...buffers, { key, buffer: decodedBuffer }]);
	};

	const getSounds = async () => {
		const soundsArray = await window.sounds.getAll();
		setSounds(soundsArray);

		return soundsArray;
	};

	const createSound = async ({ key, shortcut, route }) => {
		const parsedPath = path.parse(route).base;

		try {
			const newSoundsArray = await window.sounds.createSound({ key, shortcut, route: parsedPath });
			setSounds(newSoundsArray);
		} catch (e) {
			console.log(e);
		}
	};

	const deleteSound = async (key) => {
		const newSoundsArray = await window.sounds.deleteSound(key);
		setSounds(newSoundsArray);
	};

	const playSound = async (key) => {
		const { playing, sourceNode } = playerState;

		const soundBufferExists = buffers.find((sound) => sound.key === key);
		if (!soundBufferExists) throw new Error('Invalid sound key');

		if (playing) {
			await sourceNode.stop();
		}

		const bufferSource = audioContext.createBufferSource();
		bufferSource.buffer = await soundBufferExists.buffer;
		bufferSource.connect(gainNode).connect(audioContext.destination);
		bufferSource.start(0);

		setPlayerState({ playing: true, sourceNode: bufferSource });
	};

	const stopSound = () => {
		const { playing, sourceNode } = playerState;

		if (playing) {
			sourceNode.stop();
			setPlayerState({ playing: false, sourceNode: null });
		}
	};

	const getSoundCards = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const filteredDevices = devices.filter(
			(device) => device.kind === 'audiooutput' && device.deviceId !== 'default'
		);

		return filteredDevices;
	};

	const changeSink = (sink) => {
		if (sink === 'choose') return;

		audioContext.setSinkId(sink);
	};

	const changeVolume = (changedVolume) => {
		setVolume(changedVolume);
		gainNode.gain.value = parseFloat(changedVolume);
	};

	useEffect(() => {
		(async () => {
			const soundData = await getSounds();
			const auxBuffers = [];

			for (const { key, route } of soundData) {
				const buffer = await window.sounds.createBuffer(route);
				const decodedBuffer = await audioContext.decodeAudioData(buffer);

				auxBuffers.push({ key, buffer: decodedBuffer });
			}

			setBuffers(auxBuffers);
		})();
	}, []);

	return (
		<soundPlayerContext.Provider
			value={{
				sounds,
				createSound,
				deleteSound,
				createBuffer,
				playSound,
				stopSound,
				getSoundCards,
				changeSink,
				volume,
				changeVolume,
			}}
		>
			{children}
		</soundPlayerContext.Provider>
	);
};
