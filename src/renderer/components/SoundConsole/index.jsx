import React from 'react';
import './style.css';

// Components
import AddSound from './AddSound';
import Stop from './Stop';
import Volume from './Volume';
import SoundCardSelector from './SoundCardSelector';

const SoundConsole = () => {
	return (
		<div className="sound-console">
			<AddSound />
			<Stop />
			<Volume />
			<SoundCardSelector />
		</div>
	);
};

export default SoundConsole;
