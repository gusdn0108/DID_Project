import React from 'react';
import { motion } from 'framer-motion';
import { background, Text } from '@chakra-ui/react';
import { color } from '@chakra-ui/react';

const Textanime3 = ({ text }) => {
	const word = text.split(' ');
	const colorarry = ['white'];
	const backcolorarray = ['160627', '#FF5675', '160627', '#FF5675'];
	const box = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 2.3 * i },
		}),
	};

	const textOption = {
		visible: {
			opacity: 1,
			x: 100,
			y: 3,
			rotate: [3, -6],
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: -20,
			y: 40,
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
				fontSize: '5rem',
				color: 'white',
				textAlign: 'center',
				textstyle: 'bold',
			}}
			variants={box}
			initial='hidden'
			whileInView={'visible'}
		>
			{word.map((word, i) => (
				<motion.span variants={textOption} style={{ marginRight: '30px' }} key={i}>
					<Text
						style={{
							color: colorarry[i],
							background: backcolorarray[i],
							height: 120,
							borderRadius: 20,
						}}
					>
						{word}
					</Text>
				</motion.span>
			))}
		</motion.div>
	);
};

export default Textanime3;
