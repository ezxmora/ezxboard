import { useEffect, useRef } from 'react';

export const useIPC = (channel, listener) => {
	const handlerReference = useRef();

	useEffect(() => {
		handlerReference.current = listener;
	}, [listener]);

	useEffect(() => {
		const eventHandler = (event, ...rest) => handlerReference.current(event, ...rest);
		const ipcChannel = window.ipc.on(channel, eventHandler);

		return () => {
			ipcChannel();
		};
	}, [channel]);
};
