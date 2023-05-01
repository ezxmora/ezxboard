const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('controls', {
	minimizeSoundboard: () => ipcRenderer.invoke('controls:minimize'),
	maximizeSoundboard: () => ipcRenderer.invoke('controls:maximize'),
	closeSoundboard: () => ipcRenderer.invoke('controls:close'),
	selectFile: () => ipcRenderer.invoke('controls:getSoundfile'),
});

contextBridge.exposeInMainWorld('sounds', {
	createBuffer: (route) => ipcRenderer.invoke('sounds:buffer', route),
	getAll: () => ipcRenderer.invoke('sounds:get'),
	valid: (data) => ipcRenderer.invoke('sounds:valid', data),
	createSound: (data) => ipcRenderer.invoke('sounds:create', data),
	deleteSound: (key) => ipcRenderer.invoke('sounds:delete', key),
});

contextBridge.exposeInMainWorld('ipc', {
	on: (channel, callback) => {
		const subscription = (_event, ...args) => callback(...args);

		ipcRenderer.on(channel, subscription);

		return () => {
			ipcRenderer.removeAllListeners(channel);
		};
	},
});
