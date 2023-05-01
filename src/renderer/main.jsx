import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'Assets/styles/reset.css';
import 'Assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { SoundPlayer } from 'Contexts/SoundPlayer';
import { CModal } from 'Contexts/CModal';

// Components
import TitleBar from 'Components/TitleBar';
import SoundList from 'Components/SoundList';
import SoundConsole from 'Components/SoundConsole';
import Modal from 'Components/Modal';

const Main = () => {
	return (
		<>
			<TitleBar />
			<main className="main-container">
				<SoundPlayer>
					<CModal>
						<SoundConsole />
						<hr />
						<SoundList />
						<Modal />
					</CModal>
					<ToastContainer autoClose="2000" theme="dark" position="bottom-left" />
				</SoundPlayer>
			</main>
		</>
	);
};

export default Main;
