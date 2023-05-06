import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'Assets/styles/index.css';
import 'Assets/styles/reset.css';
import 'react-toastify/dist/ReactToastify.min.css';

// Context
import { SoundPlayer } from 'Contexts/SoundPlayer';

// Component
import TitleBar from 'Components/TitleBar';

// Views
import { AnimatePresence } from 'framer-motion';
import Home from 'Views/Home';
import Settings from 'Views/Settings';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/settings',
		element: <Settings />,
	},
]);

const Main = () => {
	return (
		<>
			<TitleBar />
			<main className="main-container">
				<AnimatePresence mode="sync">
					<SoundPlayer>
						<RouterProvider router={router} />
					</SoundPlayer>
				</AnimatePresence>
			</main>
		</>
	);
};

export default Main;
