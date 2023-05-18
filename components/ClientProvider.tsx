'use client';
import { Toaster } from 'react-hot-toast';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import React, { useEffect, useState, useMemo } from 'react';
import { particleValue } from '@/lib/particleAuth';
import { ethers } from 'ethers';

export const ClientContext = React.createContext<ClientProps>({
	logIn: function (): Promise<void> {
		throw new Error('Function not implemented.');
	},
	logOut: function (): {} {
		throw new Error('Function not implemented.');
	},
	newAccount: '',
	newAddress: '',
	changeAccount: function (newAccount: string): void {
		throw new Error('Function not implemented.');
	},
	changeAddress: function (newAddress: string): void {
		throw new Error('Function not implemented.');
	},
	latestProvider: async function (): Promise<void> {
		throw new Error('Function not implemented.');
	},
});

export interface ClientProps {
	particle?: any;
	provider?: any;
	logIn: () => Promise<void>;
	logOut: () => {};
	newAccount: string;
	newAddress: string;
	changeAccount: (newAccount: string) => void;
	changeAddress: (newAddress: string) => void;
	account?: string;
	latestProvider: () => {};
}

function useExtendedState<T>(initialState: T) {
	const [state, setState] = useState<T>(initialState);
	const getLatestState = () => {
		return new Promise<T>((resolve, reject) => {
			setState((s) => {
				resolve(s);
				return s;
			});
		});
	};
	return [state, setState, getLatestState] as const;
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const particle = useMemo(() => {
		const pn = new ParticleNetwork(particleValue);
		return pn;
	}, []);
	const [account, setAccount] = useState<string>();

	const resetConnectState = () => {
		setAccount(undefined);
	};

	const [provider, setProvider, getLatestState] =
		useExtendedState<ethers.providers.Provider | null>(null);
	const [clientProps, setClientProps] = useState<ClientProps>();
	const [newAccount, setNewAccount] = useState('Account-1');
	const [newAddress, setNewAddress] = useState(
		'0x996f40e8FB99Bb0Cba3231C88186d74C27B232D2'
	);
	const changeAccount = (account: string) => {
		if (!account) return;
		setNewAccount(account);
	};
	const changeAddress = (address: string) => {
		if (!address) return;
		setNewAddress(address);
	};

	useEffect(() => {
		if (!particle) return;
		setClientProps({
			particle: particle,
			provider: provider,
			latestProvider: getLatestState,
			logIn: login,
			logOut: logout,
			newAccount: newAccount,
			newAddress: newAddress,
			changeAccount: changeAccount,
			changeAddress: changeAddress,
			account: account,
		});
	}, [newAccount, newAddress, particle, account, provider]);

	const login = async () => {
		particle.auth
			.login()
			.then((info) => {
				console.log('connect success', info);
				setAccount(particle.auth.wallet()?.public_address);
			})
			.catch((error) => {
				console.log('Error: ', error.message);
			});
		// particle.evm.personalSign(`0x${Buffer.from(msg).toString('hex')}`)
		// try {
		// 	const lin = await particle.auth.login();
		// 	console.log('connect success', lin.wallets);
		// 	setAccount(particle.auth.wallet()?.public_address);
		// } catch (error) {
		// 	console.log('Error: ', error);
		// }
		// const prov = new ethers.providers.JsonRpcProvider(
		// 	`https://bsc-testnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODEREAL_PROVIDER}`
		// );
		const prov = new ethers.providers.Web3Provider(
			new ParticleProvider(particle.auth),
			'any'
		);

		setProvider(prov);
	};
	const logout = async () => {
		particle.auth
			.logout(true)
			.then(resetConnectState)
			.catch((error) => {
				console.log('Error: ', error.message);
			});

		setProvider(null);
	};
	return (
		<>
			{clientProps && (
				<ClientContext.Provider value={clientProps}>
					<Toaster position='bottom-center' />
					{children}
				</ClientContext.Provider>
			)}
		</>
	);
}
