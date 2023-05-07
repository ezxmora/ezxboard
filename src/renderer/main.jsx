import 'Assets/styles/index.css';
import TitleBar from 'Components/TitleBar';
import { SoundPlayer } from 'Contexts/SoundPlayer';
import { domAnimation, LazyMotion } from 'framer-motion';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Home from 'Views/Home';
import Settings from 'Views/Settings';

const router = createHashRouter([
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
				<LazyMotion features={domAnimation}>
					<SoundPlayer>
						<RouterProvider router={router} />
					</SoundPlayer>
				</LazyMotion>
				<ToastContainer autoClose="2000" theme="dark" position="bottom-left" />
			</main>
		</>
	);
};

export default Main;
