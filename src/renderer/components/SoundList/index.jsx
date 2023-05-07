import './style.css';

import { usePlayer } from 'Contexts/SoundPlayer';
import React from 'react';
import SoundButton from '../SoundButton';

const SoundList = () => {
	const { sounds } = usePlayer();

	const renderButtons = () => {
		if (sounds.length === 0) {
			return <div className="empty-sounds">You didn't add any sounds yet, why don't you add some?</div>;
		}

		return sounds.map(({ key, shortcut }, i) => <SoundButton name={key} shortcut={shortcut} key={i} />);
	};

	return <div className="sound-list">{renderButtons()}</div>;
};

export default SoundList;
