import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

import closeButton from 'Assets/icons/close.svg';
import InputShortcut from 'Components/InputShortcut';
import SoundCardSelector from 'Components/SoundCardSelector';
import { usePlayer } from 'Contexts/SoundPlayer';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import { m } from 'framer-motion';
import { toast } from 'react-toastify';

const Settings = () => {
	const navigate = useNavigate();
	const shortcutReference = useRef(null);
	const [shortcutValue, setShortcutValue] = useLocalStorage('stop-shortcut', '');
	const { soundExists } = usePlayer();

	const animation = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
		transition: {
			duration: 0.9,
		},
	};

	const handleExit = (event) => {
		if (event.key === 'Escape') {
			navigate('/');
		}
	};

	const handleStopShortcut = () => {
		if (soundExists('stop-shortcut', shortcutReference.current.value)) {
			toast.error('That shortcut is already in use');
			return;
		}
		setShortcutValue(shortcutReference.current.value);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleExit, true);

		return () => window.removeEventListener('keydown', handleExit, true);
	}, []);

	return (
		<m.div {...animation}>
			<div className="settings-container">
				<h1 className="settings-title">Settings</h1>

				<div className="settings-section">
					<span className="settings-label">Sound cards:</span>
					<SoundCardSelector />
				</div>

				<div className="settings-section">
					<span className="settings-label">Stop sound shortcut:</span>
					<InputShortcut ref={shortcutReference} value={shortcutValue} />
					<button className="stop-shortcut-set" onClick={handleStopShortcut}>
						Set
					</button>
				</div>

				<div className="settings-close-button">
					<Link to="/" title="Close">
						<img className="close-image" src={closeButton} />
						<span className="close-label">Esc</span>
					</Link>
				</div>
			</div>
		</m.div>
	);
};
export default Settings;
