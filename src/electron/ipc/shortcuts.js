const Store = require('../store');
const { UiohookKey } = require('uiohook-napi');
const soundsStore = new Store({ configName: 'sounds' });

const findShortcut = (shortcut) => {
	const sounds = soundsStore.data;
	return sounds.find((sound) => sound.shortcut === shortcut);
};

const parseShortcut = (keyEvent, mainWindow) => {
	const { altKey, ctrlKey, shiftKey, keycode } = keyEvent;
	const auxShortcut = [];

	if (altKey) auxShortcut.push('Alt');
	if (ctrlKey) auxShortcut.push('Ctrl');
	if (shiftKey) auxShortcut.push('Shift');
	if (keycode) auxShortcut.push(Object.keys(UiohookKey).find((k) => UiohookKey[k] === keycode));

	mainWindow.webContents
		.executeJavaScript("localStorage.getItem('stop-shortcut')")
		.then((localStorageShortcut) => {
			const parsedShortcut = auxShortcut.join(' + ');
			const shortcutExists = findShortcut(parsedShortcut);

			// Don't ask me why, but both being strings if I don't parse
			// localStorageShortcut as a JSON it doesn't count as equal
			if (JSON.parse(localStorageShortcut) === parsedShortcut) {
				mainWindow.webContents.send('global:shortcut:stop');
			} else if (shortcutExists) {
				mainWindow.webContents.send('global:shortcut', shortcutExists.key);
			}
		})
		.catch((error) => console.log(error));
};

module.exports = { parseShortcut };
