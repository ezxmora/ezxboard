const electron = require('electron');
const { readFileSync, writeFileSync, watch } = require('fs');
const path = require('path');

class Store {
	constructor(options) {
		const userDataPath = electron.app.getPath('userData');

		this.path = path.join(userDataPath, `${options.configName}.json`);
		this._data = [];
		this.#readAndWatchFile();
	}

	get data() {
		return this._data;
	}

	#readAndWatchFile() {
		try {
			this._data = JSON.parse(readFileSync(this.path, 'utf-8'));
		} catch (error) {
			if (error.code === 'ENOENT') {
				writeFileSync(this.path, '[]');
			} else {
				throw error;
			}
		}

		watch(this.path, (eventType) => {
			if (eventType === 'change') {
				try {
					this._data = JSON.parse(readFileSync(this.path, 'utf-8'));
				} catch (error) {
					console.error(`Error while reading or parsing the file '${this.path}':`, error);
				}
			}
		});
	}

	#exists(item) {
		return this._data.some((currentItem) => JSON.stringify(currentItem) === JSON.stringify(item));
	}

	getKey(key) {
		return this._data.find((item) => item.key === key);
	}

	set(item) {
		const itemExists = this.#exists(item);
		if (!itemExists) {
			const newData = [...this._data, item];
			this._data = newData;
			writeFileSync(this.path, JSON.stringify(newData));

			return this._data;
		}
	}

	remove(key) {
		const index = this._data.findIndex((item) => item.key === key);
		if (index !== -1) {
			this._data.splice(index, 1);
			writeFileSync(this.path, JSON.stringify(this._data));

			return this._data;
		}
	}
}

module.exports = Store;
