import { KeyToCode, hotkeyToString } from 'Utils/keycode';
import React, { forwardRef, useState } from 'react';

const InputShortcut = ({ value = [] }, ref) => {
	const [shortcut, setShortcut] = useState(value);

	const handleKeyPress = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (event.code == 'Backspace') {
			setShortcut('');
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
			setShortcut(hotkeyToString([code], ctrlKey, shiftKey, altKey));
		}
	};

	return (
		<input
			className="default-input"
			type="text"
			tabIndex="-1"
			readOnly
			placeholder="Shortcut"
			value={shortcut}
			onKeyDown={handleKeyPress}
			ref={ref}
		/>
	);
};

export default forwardRef(InputShortcut);
