import React from 'react';
import { motion } from 'framer-motion';

const Textanime = ({ text }) => {
	const word = text.split(' ');

	const box = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
		}),
	};

	const textOption = {
		visible: {
			opacity: 1,
			x: 350,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: 450,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			style={{
				overflow: 'hidden',
				display: 'flex',
				fontSize: '6rem',
				color: 'white',
				marginTop: '50px',
				textAlign: 'center',
			}}
			variants={box}
			initial='hidden'
			whileInView={'visible'}
		>
			{word.map((k, i) => (
				<motion.span variants={textOption} style={{ marginRight: '30px' }} key={i}>
					{k}
				</motion.span>
			))}
		</motion.div>
	);
};

export default Textanime;
