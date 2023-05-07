import React from 'react';

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
		</>
	);
};

export default Home;
