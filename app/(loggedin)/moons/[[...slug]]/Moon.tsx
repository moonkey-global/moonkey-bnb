'use client';
import { ClientContext } from '@/components/ClientProvider';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function Moon() {
	const { newAddress } = useContext(ClientContext);
	const router = useRouter();
	return (
		<div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-1 md:px-3'>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/alienworlds.io`);
				}}
			>
				<img
					src='/alien-worlds.webp'
					alt='AlienWorlds logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Alien Worlds</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/faraland.io`);
				}}
			>
				<img
					src='/faraland.jpeg'
					alt='Faraland logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Faraland</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/crazydefenseheroes.com`);
				}}
			>
				<img
					src='/crazydefenseheros.jpeg'
					alt='CrazyDefense logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Crazy Defense</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/drunk-robots.com`);
				}}
			>
				<img
					src='/drunkrobots.webp'
					alt='DrunkRobots logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Drunk Robots</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/spacesix.io`);
				}}
			>
				<img
					src='/spacesix.jpeg'
					alt='SpaceSix logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Space six</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/moonkey-betting.vercel.app`);
				}}
			>
				<img
					src='/azuro-logo.png'
					alt='Azuro logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Azuro betting</p>
			</div>
			<div
				className='flex flex-col items-center cursor-pointer'
				onClick={() => {
					router.push(`/moon/${newAddress}/moonkey-betting.vercel.app`);
				}}
			>
				<img
					src='/request_payment.png'
					alt='Request logo'
					width='90'
					height='90'
					className='rounded-md'
				/>
				<p className='text-sm font-medium leading-none'>Request Payment</p>
			</div>
		</div>
	);
}
