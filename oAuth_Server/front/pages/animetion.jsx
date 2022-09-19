import { useLottie, useLottieInteractivity } from 'lottie-react';
import anime from '../animation/anime.json';

const Animation = () => {
	const option = {
		animationData: anime,
	};

	const lottieObj = useLottie(option);
	const animation = useLottieInteractivity({
		lottieObj,
		mode: 'scroll',
		actions: [
			{
				visibility: [0.1, 0.9],
				type: 'seek',
				frames: [0, 170],
			},
		],
	});

	return animation;
};

export default Animation;
