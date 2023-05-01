import './style.css';

import React from 'react';
import { useModal } from 'Contexts/CModal';

import addImg from 'Assets/icons/add.svg';

const AddSound = () => {
	const { setModalMode, toggleModal } = useModal();

	const openModal = () => {
		setModalMode(true);
		toggleModal();
	};

	return (
		<div className="addSound-control">
			<div className="add-control-label">Add</div>
			<img className="add-button-img" src={addImg} onClick={openModal} />
		</div>
	);
};

export default AddSound;
