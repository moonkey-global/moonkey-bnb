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
		<div className='flex flex-col col-span-2 items-center px-4 md:items-start text-gray-300 bg-gray-800 border-gray-800'>
			<div
				className='flex items-center bg-none cursor-pointer'
				onClick={() => router.push('/')}
			>
				<img src='/moon.png' className='m-3 h-10 w-10' />
				<p className='font-Kelly text-2xl'>MoonKey</p>
			</div>
			{/* Particle (ERC4337) account */}
			<div className='flex flex-1 flex-col mt-2 items-center bg-gray-700'>
				<div
					className={`flex flex-row items-center ${
						particle.auth.isLogin() ? 'text-green-700' : 'text-red-700'
					} `}
				>
					{/* Change text color to green when connected to signer */}
					<MdVpnKey size={25} />
					<p className='text-gray-300'>{newAccount}</p>
				</div>
				<div className='flex flex-row items-center justify-center'>
					<p className='font-bold '>bsc:</p>
					<p className='font-light '>
						{newAddress?.substring(0, 6)}
						{'...'}
						{newAddress?.substring(newAddress.length - 4)}
					</p>
					<button
						className='cursor-pointer hover:bg-gray-600 hover:text-white'
						onClick={() => navigator.clipboard.writeText(newAddress!)}
					>
						<BiCopy size={10} />
					</button>
				</div>
			</div>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			{/* Assets */}
			<Link
				href={`/asset/${newAddress}`}
				className='no-underline text-gray-300'
			>
				<SidebarRow Icon={GiTwoCoins} title='Assets' />
			</Link>
			{/* Transactions */}
			<Link
				href={`/transfers/${newAddress}`}
				className='no-underline text-gray-300'
			>
				<SidebarRow Icon={BiTransferAlt} title='Transactions' />
			</Link>
			{/* Mods */}
			<Link href={`/mods/${newAddress}`} className='no-underline text-gray-300'>
				<SidebarRow Icon={AiFillTool} title='Mods' />
			</Link>
			{/* Moons */}
			<Link
				href={`/moons/${newAddress}`}
				className='no-underline text-gray-300'
			>
				<SidebarRow Icon={TbPlanet} title='Moons' />
			</Link>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			<Link href={`/buy/${newAddress}`} className='no-underline text-gray-300'>
				<SidebarRow Icon={BiDollarCircle} title='Onramp' />
			</Link>
		</div>
	);
}

export default Sidebar;
