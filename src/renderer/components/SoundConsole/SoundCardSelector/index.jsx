import React, { useEffect, useState } from 'react';
import { usePlayer } from 'Contexts/SoundPlayer';

import './style.css';

const SoundCardSelector = () => {
	const [soundCards, setSoundCards] = useState([]);
	const { getSoundCards, changeSink } = usePlayer();

	const setAudioCard = (e) => {
		const { value } = e.target;
		changeSink(value);
	};

	useEffect(() => {
		(async () => {
			const soundCardsArray = await getSoundCards();
			setSoundCards(soundCardsArray);
		})();
	}, []);

	return (
		<select tabIndex="-1" className="soundcard-selector" onChange={setAudioCard}>
			<option hidden defaultValue>
				Select Output device
			</option>
			{soundCards.map(({ label, deviceId }) => (
				<option value={deviceId} key={deviceId}>
					{label}
				</option>
			))}
		</select>
	);
};

export default SoundCardSelector;
