import { useEffect, useState } from 'react';

export const useLocalStorage = (key, fallback) => {
	const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) ?? fallback);

	useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value, setValue]);

	return [value, setValue];
};
