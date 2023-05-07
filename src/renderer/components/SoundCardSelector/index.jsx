import { usePlayer } from 'Contexts/SoundPlayer';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';

import './style.css';

const SoundCardSelector = () => {
	const [defaultSoundcard, setDefaultSoundcard] = useLocalStorage('default-sound-card', false);
	const [soundCards, setSoundCards] = useState([]);
	const { getSoundCards, changeSink } = usePlayer();

	const setAudioCard = (e) => {
		const { value } = e.target;
		setDefaultSoundcard(value);
		changeSink(value);
	};

	useEffect(() => {
		(async () => {
			const soundCardsArray = await getSoundCards();
			setSoundCards(soundCardsArray);
		})();
	}, []);

	return (
		<select tabIndex="-1" className="soundcard-selector" onChange={setAudioCard} value={defaultSoundcard}>
			{soundCards.map(({ label, deviceId }) => {
				return (
					<option value={deviceId} key={deviceId}>
						{label}
					</option>
				);
			})}
		</select>
	);
};

export default SoundCardSelector;
