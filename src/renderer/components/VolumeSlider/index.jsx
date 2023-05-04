import './style.css';
import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from 'Contexts/SoundPlayer';

const VolumeSlider = () => {
	const DEFAULT_VOLUME_VALUE = 0.5;
	const sliderRef = useRef(null);
	const { changeVolume } = usePlayer();
	const [volumeValue, setVolumeValue] = useState(DEFAULT_VOLUME_VALUE);

	const fillSlider = () => {
		const colorSettings = {
			fill: '#e7e7e7',
			background: '#181818',
		};

		const percentage =
			(100 * (sliderRef.current.value - sliderRef.current.min)) / (sliderRef.current.max - sliderRef.current.min);
		const background = `linear-gradient(90deg, ${colorSettings.fill} ${percentage}%, ${colorSettings.background} ${
			percentage + 0.1
		}%)`;

		console.log(percentage, background, sliderRef.current.style.backgroundColor);
		sliderRef.current.style.background = background;
	};

	useEffect(() => {
		fillSlider();
	}, []);

	const handleVolume = (e) => {
		const { value } = e.target;
		fillSlider();
		setVolumeValue(value);
		changeVolume(value);
	};

	return (
		<div className="volume-control">
			<div className="volume-label">Volume: {parseInt(volumeValue * 100)}%</div>
			<input
				ref={sliderRef}
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

export default VolumeSlider;
