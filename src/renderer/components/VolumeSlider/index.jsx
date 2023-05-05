import { usePlayer } from 'Contexts/SoundPlayer';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const VolumeSlider = () => {
	const [volumeStorage, setVolumeStorage] = useLocalStorage('slider-volume-value', 0.5);
	const sliderRef = useRef(null);
	const { changeVolume } = usePlayer();
	const [volumeValue, setVolumeValue] = useState(volumeStorage);

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

		sliderRef.current.style.background = background;
	};

	useEffect(() => {
		fillSlider();
	}, []);

	const handleVolume = (e) => {
		const { value } = e.target;
		fillSlider();
		setVolumeValue(value);
		setVolumeStorage(value);
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
				defaultValue={volumeStorage}
				max={1}
				step={0.01}
				onChange={handleVolume}
				onInput={handleVolume}
			/>
		</div>
	);
};

export default VolumeSlider;
