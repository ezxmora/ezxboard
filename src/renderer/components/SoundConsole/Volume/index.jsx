import './style.css';
import React, { useState } from 'react';
import { usePlayer } from 'Contexts/SoundPlayer';

const Volume = () => {
	const DEFAULT_VOLUME_VALUE = 0.5;
	const { changeVolume } = usePlayer();
	const [volumeValue, setVolumeValue] = useState(DEFAULT_VOLUME_VALUE);

	const handleVolume = (e) => {
		const { value } = e.target;
		setVolumeValue(value);
		changeVolume(value);
	};

	return (
		<div className="volume-control">
			<div className="volume-label">Volume: {parseInt(volumeValue * 100)}%</div>
			<input
				className="volume-slider"
				tabIndex="-1"
				type="range"
				min={0}
				defaultValue={DEFAULT_VOLUME_VALUE}
				max={1}
				step={0.01}
				onChange={handleVolume}
				onInput={handleVolume}
			/>
		</div>
	);
};

export default Volume;
