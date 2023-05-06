import './style.css';

import { useModal } from 'Contexts/CModal';
import { usePlayer } from 'Contexts/SoundPlayer';
import { KeyToCode, hotkeyToString } from 'Utils/keycode';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Modal = () => {
	const { showModal, toggleModal, modalMode, modalData } = useModal();
	const { sounds, createBuffer, createSound, deleteSound } = usePlayer();
	const [sound, setSound] = useState({ key: '', shortcut: [], route: '' });

	const closeModal = (event) => {
		const { className, id } = event.target;

		if (className === 'modal-background' || id === 'close-modal') {
			setSound({ key: '', shortcut: '', route: '' });
			toggleModal();
		}
	};

	const handleKeyPress = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (event.code === 'Backspace') {
			setSound({ ...sound, shortcut: '' });
			return;
		}

		let { code, ctrlKey, shiftKey, altKey } = event;

		if (!code) return;
		if (code.includes('Meta')) return;
		if (code.startsWith('Key')) {
			code = code.slice('Key'.length);
		} else if (code.startsWith('Digit')) {
			code = code.slice('Digit'.length);
		}

		if (KeyToCode[code]) {
			setSound({ ...sound, shortcut: hotkeyToString([code], ctrlKey, shiftKey, altKey) });
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
			if (!sound.key) {
				toast.error('Name cannot be empty');
				return;
			}
			if (!sound.shortcut) {
				toast.error('Shortcut cannot be empty');
				return;
			}

			const shortcutExist = sounds.find((s) => s.shortcut === sound.shortcut);
			if (shortcutExist) {
				toast.error('That shortcut is already in use');
				return;
			}

			if (!sound.route) {
				toast.error('You have to specify a file');
				return;
			}

			createBuffer(sound);
			createSound(sound);
			setSound({ key: '', shortcut: [], route: '' });
			toggleModal();
		};

		return (
			<>
				<div className="modal-title">Add a new sound</div>
				<input type="text" placeholder="Name" onChange={(e) => setSound({ ...sound, key: e.target.value })} />
				<input
					type="text"
					tabIndex="-1"
					placeholder="Shortcut - Right click or Backspace to clear"
					id="shortcut-input"
					readOnly
					defaultValue={sound.shortcut}
					onKeyDown={handleKeyPress}
					onContextMenu={() => setSound({ ...sound, shortcut: '' })}
				/>
				<input
					type="text"
					tabIndex="-1"
					placeholder="Select sound"
					value={sound.route}
					onClick={selectFile}
					readOnly
				/>
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
