import React from 'react';
import { ToastContainer } from 'react-toastify';

// Contexts
import Modal from 'Components/Modal';
import SoundConsole from 'Components/SoundConsole';
import SoundList from 'Components/SoundList';
import { CModal } from 'Contexts/CModal';

const Home = () => {
	return (
		<>
			<CModal>
				<SoundConsole />
				<hr />
				<SoundList />
				<Modal />
			</CModal>
			<ToastContainer autoClose="2000" theme="dark" position="bottom-left" />
		</>
	);
};

export default Home;
