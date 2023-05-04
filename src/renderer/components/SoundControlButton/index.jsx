import './style.css';

import React from 'react';

const SoundControlButton = ({ label, icon, action, color }) => {
	return (
		<div className="button-control">
			<div className="button-control-label">{label}</div>
			<img className={`button-control-img button-hover-${color}`} src={icon} onClick={action} />
		</div>
	);
};

export default SoundControlButton;
