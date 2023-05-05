import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

import closeButton from 'Assets/icons/close.svg';
import SoundCardSelector from 'Components/SoundCardSelector';
import { motion } from 'framer-motion';

const Settings = () => {
	const navigate = useNavigate();

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

	const handleExit = (e) => {
		if (e.key === 'Escape') {
			navigate('/');
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleExit, true);

		return () => window.removeEventListener('keydown', handleExit, true);
	}, []);

	return (
		<motion.div {...animation}>
			<div className="settings-container">
				<h1 className="settings-title">Settings</h1>

				<div className="settings-soundcard">
					<span className="settings-label">Sound cards:</span>
					<SoundCardSelector />
				</div>

				<div className="settings-close-button">
					<Link to="/" title="Close">
						<img className="close-image" src={closeButton} />
						<span className="close-label">Esc</span>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default Settings;
