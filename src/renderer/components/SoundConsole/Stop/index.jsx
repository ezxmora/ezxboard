import './style.css';

import React from 'react';
import { usePlayer } from 'Contexts/SoundPlayer';

import stopImg from 'Assets/icons/stop.svg';

const Stop = () => {
	const { stopSound } = usePlayer();

	const stopPlaying = () => {
		stopSound();
	};

	return (
		<div className="stop-control">
			<div className="stop-control-label">Stop</div>
			<img className="stop-button-img" src={stopImg} onClick={stopPlaying} />
		</div>
	);
};

export default Stop;
