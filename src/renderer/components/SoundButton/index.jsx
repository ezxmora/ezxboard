import './style.css';

import React from 'react';
import { usePlayer } from 'Contexts/SoundPlayer';
import { useModal } from 'Contexts/CModal';

const SoundButton = ({ name, shortcut }) => {
	const { playSound } = usePlayer();
	const { setModalMode, toggleModal, setModalData } = useModal();

	const openModal = () => {
		setModalMode(false);
		setModalData(name);
		toggleModal();
	};

	return (
		<div className="sound-button" onClick={() => playSound(name)} onContextMenu={() => openModal()}>
			<div className="sound-button-name">{name}</div>
			<div className="sound-button-shortcut"> {shortcut}</div>
		</div>
	);
};

export default SoundButton;
