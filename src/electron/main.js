const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { uIOhook, UiohookKey } = require('uiohook-napi');
const { minimizeWindow, maximizeWindow, closeWindow, getSoundFile } = require('./ipc/controls');
const { createBufferFromRoute, isAValidSound, createSound, deleteSound, readAllSounds } = require('./ipc/sounds');
const Protocol = require('./protocol');
const Store = require('./store');

process.title = 'ezxboard';

if (!app.requestSingleInstanceLock()) {
	app.exit();
}

// app.disableHardwareAcceleration();

let mainWindow;

const createWindow = () => {
	if (!process.env.DEV_SERVER_URL) {
		protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler);
	}

	mainWindow = new BrowserWindow({
		width: 800,
		minWidth: 550,
		height: 450,
		minHeight: 450,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			webSecurity: true,
			nodeIntegration: false,
			contextIsolation: true,
			devTools: !app.isPackaged,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	ipcMain.handle('controls:minimize', () => minimizeWindow(mainWindow));
	ipcMain.handle('controls:maximize', () => maximizeWindow(mainWindow));
	ipcMain.handle('controls:close', () => closeWindow());
	ipcMain.handle('controls:getSoundfile', () => getSoundFile(mainWindow));

	ipcMain.handle('sounds:buffer', (_, route) => createBufferFromRoute(route));
	ipcMain.handle('sounds:get', () => readAllSounds());
	ipcMain.handle('sounds:valid', (_, data) => isAValidSound(data));
	ipcMain.handle('sounds:create', (_, data) => createSound(data));
	ipcMain.handle('sounds:delete', (_, key) => deleteSound(key));

	if (process.env.DEV_SERVER_URL) {
		mainWindow.loadURL(process.env.DEV_SERVER_URL);
	} else {
		mainWindow.loadURL(`${Protocol.scheme}://rse/index.html`);
	}
};

const soundsStore = new Store({ configName: 'sounds' });

protocol.registerSchemesAsPrivileged([
	{
		scheme: Protocol.scheme,
		privileges: {
			standard: true,
			secure: true,
		},
	},
]);

app.whenReady().then(() => {
	createWindow();
	autoUpdater.checkForUpdatesAndNotify();
	uIOhook.start();

	uIOhook.on('keydown', (keyEvent) => {
		const sounds = soundsStore.data;
		const { altKey, ctrlKey, shiftKey, keycode } = keyEvent;
		const auxShortcut = [];

		if (altKey) auxShortcut.push('Alt');
		if (ctrlKey) auxShortcut.push('Ctrl');
		if (shiftKey) auxShortcut.push('Shift');
		if (keycode) auxShortcut.push(Object.keys(UiohookKey).find((k) => UiohookKey[k] === keycode));

		const shortcutExists = sounds.find(({ shortcut }) => shortcut === auxShortcut.join(' + '));
		if (shortcutExists) {
			mainWindow.webContents.send('global:shortcut', shortcutExists.key);
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => uIOhook.stop());

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
