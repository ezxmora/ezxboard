import './style.css';

import React from 'react';

import minimize from 'Assets/icons/minimize.svg';
import maximize from 'Assets/icons/maximize.svg';
import close from 'Assets/icons/close.svg';

const TitleBar = () => {
	const handleMinimize = () => window.controls.minimizeSoundboard();
	const handleMaximize = () => window.controls.maximizeSoundboard();
	const handleClose = () => window.controls.closeSoundboard();

	return (
		<nav className="titlebar">
			<div className="frame-controls">
				<div className="frame-control" id="draggable"></div>
				<div className="frame-control">
					<button onClick={handleMinimize} className="frame-control-minimize" tabIndex="-1" id="minimize">
						<img src={minimize} />
					</button>
				</div>
				<div className="frame-control">
					<button onClick={handleMaximize} className="frame-control-maximize" tabIndex="-1" id="maximize">
						<img src={maximize} />
					</button>
				</div>
				<div className="frame-control">
					<button onClick={handleClose} className="frame-control-close" tabIndex="-1" id="close">
						<img src={close} />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default TitleBar;
