import './style.css';

import InputShortcut from 'Components/InputShortcut';
import { useModal } from 'Contexts/CModal';
import { usePlayer } from 'Contexts/SoundPlayer';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Modal = () => {
	const { showModal, toggleModal, modalMode, modalData } = useModal();
	const { soundExists, createBuffer, createSound, deleteSound } = usePlayer();
	const [sound, setSound] = useState({ key: '', route: '' });
	const shortcutReference = useRef(null);

	const closeModal = (event) => {
		const { className, id } = event.target;

		if (className === 'modal-background' || id === 'close-modal') {
			setSound({ key: '', shortcut: [], route: '' });
			toggleModal();
		}
	};

	const addMode = () => {
		const selectFile = async () => {
			const fileRoute = await window.controls.selectFile();
			if (fileRoute) {
				setSound({ ...sound, route: fileRoute });
			}
		};

		const addSound = () => {
			const shortcutValue = shortcutReference.current.value;

			if (!sound.key) {
				toast.error('Name cannot be empty');
				return;
			}

			if (!shortcutValue) {
				toast.error('Shortcut cannot be empty');
				return;
			}

			if (soundExists('shortcut', shortcutValue)) {
				toast.error('That shortcut is already in use');
				return;
			}

			if (!sound.route) {
				toast.error('You have to specify a file');
				return;
			}

			const newSound = { ...sound, shortcut: shortcutValue };
			createBuffer(newSound);
			createSound(newSound);
			setSound({ key: '', route: '' });
			toggleModal();
		};

		return (
			<>
				<div className="modal-title">Add a new sound</div>
				<div className="modal-input-container">
					<input
						className="default-input"
						type="text"
						placeholder="Name"
						onChange={(e) => setSound({ ...sound, key: e.target.value })}
					/>
					<InputShortcut ref={shortcutReference} />
					<input
						className="default-input"
						type="text"
						tabIndex="-1"
						placeholder="Select sound"
						value={sound.route}
						onClick={selectFile}
						readOnly
					/>
				</div>
				<div className="modal-buttons">
					<button className="mdl-btn" onClick={addSound}>
						Add
					</button>
					<button id="close-modal" className="mdl-btn" onClick={closeModal}>
						Cancel
					</button>
				</div>
			</>
		);
	};

	const confirmMode = () => {
		const removeSound = () => {
			deleteSound(modalData);
			toggleModal();
		};

		return (
			<>
				<div className="modal-title">Do you want to delete this sound?</div>
				<div className="modal-buttons">
					<button className="mdl-btn" onClick={removeSound}>
						Confirm
					</button>
					<button id="close-modal" className="mdl-btn" onClick={closeModal}>
						Cancel
					</button>
				</div>
			</>
		);
	};

	const animation = {
		initial: {
			opacity: 0,
			scale: 0,
		},
		animate: {
			opacity: 1,
			scale: 1,
		},
		transition: {
			duration: 0.3,
		},
	};

	return (
		showModal && (
			<div className="modal-wrapper">
				<div className="modal-background" onClick={closeModal}></div>
				<motion.div {...animation} className="modal-window">
					{modalMode ? addMode() : confirmMode()}
				</motion.div>
			</div>
		)
	);
};

export default Modal;
