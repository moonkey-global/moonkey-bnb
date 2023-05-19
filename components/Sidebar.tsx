'use client';
import { useContext, useEffect, useState } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import { BiTransferAlt, BiDollarCircle, BiCopy } from 'react-icons/bi';
import { TbPlanet } from 'react-icons/tb';
import { AiFillTool } from 'react-icons/ai';
import { MdCurrencyExchange, MdVpnKey } from 'react-icons/md';
import SidebarRow from './SidebarRow';
import { ClientContext } from './ClientProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Sidebar() {
	const { particle, logIn, logOut, newAccount, newAddress } =
		useContext(ClientContext);
	const router = useRouter();
	return (
		<div className='absolute top-0 right-0 flex flex-col items-center px-4 gap-2 md:items-end'>
			<div className='min-h-full flex items-center overflow-x-hidden mb-6'>
				<div
					className='relative text-center text-yellow-900 font-bold '
					onClick={() => router.push('/')}
				>
					<img
						src='/moons_fixed-01.png'
						className='overflow-x-hidden'
						width='80'
						height='80'
					/>
					<div className='absolute top-[50%] left-[63%] translate-x-[-50%] translate-y-[-50%]'>
						BNB
					</div>
				</div>
				<div className='relative text-center text-white font-bold overflow-x-hidden scrollbar-hide whitespace-nowrap'>
					<img
						src='/key_fixed-01.png'
						className='overflow-hidden translate-y-1'
						width='160'
						height='80'
					/>

					<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-40%]'>
						{newAccount}
					</div>
				</div>
			</div>

			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-500' />
			</div>
			{/* Assets */}
			<Link
				href={`/asset/${newAddress}`}
				className='no-underline text-gray-500'
			>
				<SidebarRow Icon={GiTwoCoins} title='Assets' />
			</Link>
			{/* Transactions */}
			<Link
				href={`/transfers/${newAddress}`}
				className='no-underline text-gray-500'
			>
				<SidebarRow Icon={BiTransferAlt} title='Transfers' />
			</Link>
			{/* Mods */}
			<Link href={`/mods/${newAddress}`} className='no-underline text-gray-500'>
				<SidebarRow Icon={AiFillTool} title='Mods' />
			</Link>
			{/* Moons */}
			<Link
				href={`/moons/${newAddress}`}
				className='no-underline text-gray-500'
			>
				<SidebarRow Icon={TbPlanet} title='Moons' />
			</Link>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-500' />
			</div>
			<Link href={`/buy/${newAddress}`} className='no-underline text-gray-500'>
				<SidebarRow Icon={BiDollarCircle} title='Buy' />
			</Link>
		</div>
	);
}

export default Sidebar;
