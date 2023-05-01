const { readFileSync } = require('fs');
const Store = require('../store');

const store = new Store({ configName: 'sounds' });

const createBufferFromRoute = (route) => {
	const buffer = readFileSync(route);
	const arrayBuffer = new Uint8Array(buffer).buffer;

	return arrayBuffer;
};

const isAValidSound = ({ key, shortcut }) => {
	const sounds = store.data;

	return sounds.hasOwnProperty(key) || sounds[key].shortcut === shortcut;
};

const readAllSounds = () => store.data;
const createSound = (data) => store.set(data);
const updateSound = ({ key, value }) => store.edit(key, value);
const deleteSound = (key) => store.remove(key);

module.exports = { createBufferFromRoute, isAValidSound, readAllSounds, createSound, updateSound, deleteSound };
