import React, { createContext, useContext, useState } from 'react';

const togglerContext = createContext();
export const useModal = () => {
	const context = useContext(togglerContext);
	if (!context) throw new Error('There is no modal context provider');

	return context;
};

export const CModal = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState(true); // true add; false confirm
	const [modalData, setModalData] = useState('');

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<togglerContext.Provider value={{ showModal, toggleModal, modalMode, setModalMode, modalData, setModalData }}>
			{children}
		</togglerContext.Provider>
	);
};
