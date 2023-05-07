import Modal from 'Components/Modal';
import SoundConsole from 'Components/SoundConsole';
import SoundList from 'Components/SoundList';
import { CModal } from 'Contexts/CModal';
import React from 'react';

const Home = () => {
	return (
		<>
			<CModal>
				<SoundConsole />
				<hr />
				<SoundList />
				<Modal />
			</CModal>
		</>
	);
};

export default Home;
