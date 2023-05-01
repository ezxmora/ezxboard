const { app, dialog } = require('electron');

const minimizeWindow = (application) => application.minimize();

const maximizeWindow = (application) => (application.isMaximized() ? application.unmaximize() : application.maximize());

const closeWindow = () => app.quit();

const getSoundFile = async (window) => {
	const { canceled, filePaths } = await dialog.showOpenDialog(window, {
		filters: [{ name: 'Sounds', extensions: ['mp3', 'ogg', 'wav'] }],
		properties: ['openFile'],
	});

	if (canceled) return;

	return filePaths[0];
};

module.exports = { minimizeWindow, maximizeWindow, closeWindow, getSoundFile };
