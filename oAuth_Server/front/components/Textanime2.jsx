import React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@chakra-ui/react';
import { color } from '@chakra-ui/react';

const Textanime2 = ({ text }) => {
	const word = text.split(' ');
	const textarry = ['#FF9DFF', '#FFA778', '#FFCD28', '#FFF56E', 'white'];
	const box = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.3, delayChildren: 0.6 * i },
		}),
	};

	const textOption = {
		visible: {
			opacity: 1,
			x: 250,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: 360,
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
				fontSize: '4rem',
				color: '#00CDFF',
				textAlign: 'center',
			}}
			variants={box}
			initial='hidden'
			whileInView={'visible'}
		>
			{word.map((word, i) => (
				<motion.span variants={textOption} style={{ marginRight: '30px' }} key={i}>
					<Text style={{ color: textarry[i] }}>{word}</Text>
				</motion.span>
			))}
		</motion.div>
	);
};

export default Textanime2;
