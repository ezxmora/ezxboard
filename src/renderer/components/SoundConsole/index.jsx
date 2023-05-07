import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import addImage from 'Assets/icons/add.svg';
import settingsImage from 'Assets/icons/settings.svg';
import stopImage from 'Assets/icons/stop.svg';
import SoundControlButton from 'Components/SoundControlButton';
import VolumeSlider from 'Components/VolumeSlider';
import { useModal } from 'Contexts/CModal';
import { usePlayer } from 'Contexts/SoundPlayer';
import { useIPC } from 'Hooks/useIPC';

const SoundConsole = () => {
	const { playSound, stopSound } = usePlayer();
	const { showModal, setModalMode, toggleModal } = useModal();

	useIPC('global:shortcut', (key) => {
		if (!showModal) {
			playSound(key);
		}
	});

	useIPC('global:shortcut:stop', () => stopSound());

	const stopPlaying = () => {
		stopSound();
	};

	const openModal = () => {
		setModalMode(true);
		toggleModal();
	};

	return (
		<div className="sound-console">
			<Link to={'/settings'}>
				<img className="settings-button" src={settingsImage} />
			</Link>
			<SoundControlButton label={'Add'} color={'green'} icon={addImage} action={openModal} />
			<SoundControlButton label={'Stop'} color={'red'} icon={stopImage} action={stopPlaying} />
			<VolumeSlider />
		</div>
	);
};

export default SoundConsole;
