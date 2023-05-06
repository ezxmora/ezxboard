/* Keycodes from
	https://github.com/SnosMe/awakened-poe-trade/blob/master/ipc/KeyToCode.ts
*/
export const KeyToCode = {
	Cancel: 3,
	Backspace: 8,
	Tab: 9,
	Enter: 13,
	Shift: 16,
	Ctrl: 17,
	Alt: 18,
	Pause: 19,
	CapsLock: 20,
	Escape: 27,
	Space: 32,
	PageUp: 33,
	PageDown: 34,
	End: 35,
	Home: 36,
	ArrowLeft: 37,
	ArrowUp: 38,
	ArrowRight: 39,
	ArrowDown: 40,
	Insert: 45,
	Delete: 46,
	0: 48,
	1: 49,
	2: 50,
	3: 51,
	4: 52,
	5: 53,
	6: 54,
	7: 55,
	8: 56,
	9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	Numpad0: 96,
	Numpad1: 97,
	Numpad2: 98,
	Numpad3: 99,
	Numpad4: 100,
	Numpad5: 101,
	Numpad6: 102,
	Numpad7: 103,
	Numpad8: 104,
	Numpad9: 105,
	NumpadMultiply: 106,
	NumpadAdd: 107,
	NumpadSubtract: 109,
	NumpadDecimal: 110,
	NumpadDivide: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	F13: 124,
	F14: 125,
	F15: 126,
	F16: 127,
	F17: 128,
	F18: 129,
	F19: 130,
	F20: 131,
	F21: 132,
	F22: 133,
	F23: 134,
	F24: 135,
	Semicolon: 186,
	Equal: 187,
	Comma: 188,
	Minus: 189,
	Period: 190,
	Slash: 191,
	Backquote: 192,
	BracketLeft: 219,
	Backslash: 220,
	BracketRight: 221,
	Quote: 222,
};

const isAMod = (key) => {
	return key === 'Ctrl' || key === 'Shift' || key === 'Alt';
};

export const hotkeyToString = (shortcut, ctrl = false, shift = false, alt = false) => {
	if (!Array.isArray(shortcut)) throw new Error('The first argument has to be an Array');

	if (shortcut.includes('Ctrl')) ctrl = true;
	if (shortcut.includes('Shift')) shift = true;
	if (shortcut.includes('Alt')) alt = true;
	shortcut = shortcut.filter((key) => !isAMod(key));

	let mod = '';
	if (ctrl && shift && alt) mod = 'Ctrl + Shift + Alt';
	else if (shift && alt) mod = 'Shift + Alt';
	else if (ctrl && shift) mod = 'Ctrl + Shift';
	else if (ctrl && alt) mod = 'Ctrl + Alt';
	else if (alt) mod = 'Alt';
	else if (ctrl) mod = 'Ctrl';
	else if (shift) mod = 'Shift';

	return mod && shortcut.length ? `${mod} + ${shortcut?.join(' + ')}` : shortcut?.join(' + ') || mod;
};
