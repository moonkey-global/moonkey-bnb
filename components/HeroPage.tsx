'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
//import getScrollAnimation from '@/libs/utils/getScrollAnimation';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ScrollCards from './ScrollCards';
function getScrollAnimation() {
	return {
		offscreen: {
			y: 150,
			opacity: 0,
		},
		onscreen: ({ duration = 2 } = {}) => ({
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				duration,
			},
		}),
	};
}
function HeroPage() {
	const scrollAnimation = useMemo(() => getScrollAnimation(), []);
	return (
		<div className='flex flex-col w-full my-16' id='testimoni'>
			<ScrollAnimationWrapper className=''>
				<motion.h3
					variants={scrollAnimation}
					className='text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto'
				>
					Moonkey
				</motion.h3>
				<motion.p
					variants={scrollAnimation}
					className='leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12'
				>
					Your web3 gaming wallet.
				</motion.p>
			</ScrollAnimationWrapper>
			<ScrollAnimationWrapper className='w-full flex flex-col py-12'>
				<motion.div variants={scrollAnimation}>
					{/* <ScrollCards /> */}
				</motion.div>
			</ScrollAnimationWrapper>
		</div>
	);
}

export default HeroPage;
