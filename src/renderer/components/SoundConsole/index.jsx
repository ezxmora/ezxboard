import React from 'react';
import './style.css';

import SoundControlButton from 'Components/SoundControlButton';
import VolumeSlider from 'Components/VolumeSlider';
import addImg from 'Assets/icons/add.svg';
import stopImg from 'Assets/icons/stop.svg';
import { usePlayer } from 'Contexts/SoundPlayer';
import { useModal } from 'Contexts/CModal';

const SoundConsole = () => {
	const { stopSound } = usePlayer();
	const { setModalMode, toggleModal } = useModal();

	const stopPlaying = () => {
		stopSound();
	};

	const openModal = () => {
		setModalMode(true);
		toggleModal();
	};

	return (
		<div className="sound-console">
			<SoundControlButton label={'Add'} color={'green'} icon={addImg} action={openModal} />
			<SoundControlButton label={'Stop'} color={'red'} icon={stopImg} action={stopPlaying} />
			<VolumeSlider />
		</div>
	);
};

export default SoundConsole;
