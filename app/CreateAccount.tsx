'use client';
import { ClientContext } from '@/components/ClientProvider';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	fillOpPaymasterDeploy,
	paymasterFillOpDeploy,
} from '@/lib/scripts/paymasterServer';
import { minimumGas } from '@/lib/constants';
import { Copy, Star } from 'lucide-react';
type ProfileList = {
	profile: string;
	address: string;
};
function CreateAccount() {
	const {
		logIn,
		particle,
		changeAddress,
		provider,
		changeAccount,
		newAccount,
		latestProvider,
	} = useContext(ClientContext);

	const [profileList, setProfileList] = useState([] as Array<ProfileList>);
	const [accountsList, setAccountsList] = useState([] as Array<string>);
	const [checked, setChecked] = useState(false);
	const starsArray = [1, 2, 3, 4];

	const handleChecked = () => {
		setChecked(!checked);
	};
	const accountNameChange = (event: { target: { value: string } }) => {
		if (changeAccount) changeAccount(event.target.value);
		console.log(newAccount);
	};

	const router = useRouter();
	const handleLogin = async () => {
		if (!particle.auth.isLogin() || !provider) await logIn!();
	};

	const handleCreateAccount = async () => {
		const notification = toast.loading(`SigningIn...`, { duration: 2000 });
		try {
			if (!particle.auth.isLogin() || !provider) logIn!();

			if (changeAddress && provider) {
				const prov = provider;
				// new ethers.providers.JsonRpcProvider(
				// 	`https://bsc-testnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODEREAL_PROVIDER}`
				// );
				const signer: ethers.providers.JsonRpcSigner = prov.getSigner();
				console.log(await signer.getAddress());

				const res = await fillOp(await signer.getAddress(), prov);
				const smartAccountAddress = res.counterfactualAddress;
				// console.log('AA: ', smartAccountAddress);

				changeAddress(smartAccountAddress);
				setAccountsList((prevState) => [
					...prevState,
					smartAccountAddress as string,
				]);

				if ((await prov.getCode(smartAccountAddress)).length > 2) {
					toast.success(
						`SmartAccount already exist at ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push(`/moons/${smartAccountAddress}`);
					return;
				}
				const balance = await prov.getBalance(smartAccountAddress);
				if (balance.lte(minimumGas)) {
					toast.error(
						`No paymaster found! And not enough balance on ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push(`/asset/${smartAccountAddress}`);
					return;
				}
				const signature = await signer.signMessage(res.message);
				const op: UserOperation = { ...res.op2, signature: signature };
				await sendToBundler(op, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);

				router.push(`/moons/${smartAccountAddress}`);
				return;
			}
			// toast.error(`Whoops... Unexpected exit! Click-again`, {
			// 	id: notification,
			// 	duration: 2000,
			// });
		} catch (error) {
			toast.error(`Whoops... Something went wrong! Check console`, {
				id: notification,
				duration: 5000,
			});
			console.error(error);
		}
	};

	const handleCreateAccountWithPaymaster = async () => {
		const notification = toast.loading(`SigningIn...`, { duration: 2000 });
		try {
			await handleLogin();
			console.log('Logged in');

			if (changeAddress) {
				const prov =
					(await latestProvider()) as ethers.providers.JsonRpcProvider;

				// new ethers.providers.JsonRpcProvider(
				// 	`https://bsc-testnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODEREAL_PROVIDER}`
				// );
				const signer: ethers.providers.JsonRpcSigner = prov.getSigner();
				console.log(await signer.getAddress());

				const res = await fillOpPaymasterDeploy(
					await signer.getAddress(),
					prov
				);
				const smartAccountAddress = res.counterfactualAddress;

				changeAddress(smartAccountAddress);
				setAccountsList((prevState) => [
					...prevState,
					smartAccountAddress as string,
				]);

				if ((await prov.getCode(smartAccountAddress)).length > 2) {
					toast.success(
						`SmartAccount already exist at ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push(`/moons/${smartAccountAddress}`);
					return;
				}
				// const balance = res.balance;
				// if (balance.lte(parseEther('0.009'))) {
				// 	await handleCreateAccount();
				// 	return;
				// }
				const signature = await signer.signMessage(res.message);
				const op: UserOperation = { ...res.userOp, signature: signature };
				// Wait for paymaster signing
				const response = await paymasterFillOpDeploy(op, prov);
				// Sign again after paymaster signing
				const signature2 = await signer.signMessage(response.message);
				const op2: UserOperation = {
					...response.userOp,
					signature: signature2,
				};
				await sendToBundler(op2, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);

				router.push(`/moons/${smartAccountAddress}`);
				return;
			}
			// toast.error(`Whoops... Unexpected exit! Click-again`, {
			// 	id: notification,
			// 	duration: 2000,
			// });
		} catch (error) {
			toast.error(`Whoops... Something went wrong! Check console`, {
				id: notification,
				duration: 5000,
			});
			console.error(error);
			// If the error is low gas from paymaster (32505), try deploying with owners own fund
			// await handleCreateAccount()
		}
	};

	useEffect(() => {
		const list = window.localStorage.getItem('userAccountList');
		if (list) setAccountsList(JSON.parse(list));
	}, []);
	useEffect(() => {
		window.localStorage.setItem(
			'userAccountList',
			JSON.stringify(
				accountsList.filter(
					(item, index) => accountsList.indexOf(item) === index
				)
			)
		);
	}, [accountsList]);
	// useEffect(() => {
	// 	const list = window.localStorage.getItem('userProfileList');
	// 	if (!list) return
	// 	const profile: ProfileList[] = JSON.parse(list)
	// 	setProfileList(profile);
	// }, []);
	// useEffect(() => {
	// 	window.localStorage.setItem(
	// 		'userProfileList',
	// 		JSON.stringify(
	// 			profileList.filter(
	// 				(item, index) => profileList.indexOf(item) === index
	// 			)
	// 		)
	// 	);
	// }, [profileList]);

	return (
		<div className='flex flex-col items-center justify-between mt-8'>
			{/*
			<div className=' hover:shadow ml-2 w-96 p-4 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5'>
				 <ConnectButton /> <div className='min-h-full flex space-x-4 items-center justify-center mt-4'>
				<br />
				<ConnectButton.Custom>
					{({ account, openConnectModal }) => (
						<button onClick={openConnectModal} className='cursor-pointer'>
							Create account {account}
						</button>
					)}
				</ConnectButton.Custom>
				<br /> */}
			<Dialog>
				<DialogTrigger asChild>
					<Button>Create</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Create profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save and connect when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='profile' className='text-right'>
								Profile name
							</Label>
							<Input
								id='profile'
								placeholder={'Account-1'}
								onChange={accountNameChange}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='submit' onClick={handleCreateAccountWithPaymaster}>
								Save and Connect
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 
			<Button variant='ghost' onClick={logOut}>
				x
			</Button>
			<button onClick={handleCreateAccount} className='cursor-pointer'>
				Create AA
			</button>

			<button onClick={() => logIn!()} className='cursor-pointer'>
				Connect
			</button>
			<br />
			<button onClick={logOut} className='cursor-pointer'>
				Disconnect
			</button>
			<br />
			<div className='flex justify-between'>
					
				</div>
				<div>
					<h2
						onClick={handleCreateAccount}
						className='font-bold hover:text-blue-600'
					>
						Create an account
					</h2>
					<p className='truncate break-normal'>
						Two clicks away from having your web3 Smart wallet
					</p>
					{/* <div className='flex'>
							<input type='checkbox' onChange={handleChecked} disabled />
							<p className='text-sm text-gray-400'>Paymaster</p>
						</div> 
				</div>
			</div>
				 */}

			<div className='flex items-center justify-center mt-5 px-2'>
				{accountsList.length > 0 &&
					accountsList.map((account, index) => (
						<Card key={index} className='w-[250px] mr-1 space-x-1'>
							<CardHeader>
								<CardTitle>Account-{index + 1}</CardTitle>
								<CardDescription>
									<Button
										variant='ghost'
										onClick={() => navigator.clipboard.writeText(account)}
									>
										{account.substring(0, 6)}
										{'...'}
										{account.substring(account.length - 4)}
										<Copy className='ml-1 h-3 w-3' />
									</Button>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid w-full items-center gap-4'>
									<div className='flex flex-col space-y-1.5'>
										<div className='flex'>
											<Star color='yellow' fill='yellow' />
											{starsArray.map((stars, index) => (
												<Star color='yellow' key={index} />
											))}
										</div>
										<Button
											variant='secondary'
											onClick={async () => {
												// logOut!();
												await handleCreateAccount();
												console.log('Pushed to moons', account);
												router.push(`/moons/${account}`);
											}}
										>
											Connect
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				{/* {accountsList.length > 0 &&
					accountsList.map((account, index) => (
						<div key={index} className='flex items-center justify-center'>
							<button
								onClick={() => {
									// changeAddress!(account);
									router.push(`/moons/${account}`);
								}}
								className='cursor-pointer bg-transparent border-none p-2 mb-2'
							>
								<span className=' text-[20px]'>Account-{index + 1}: </span>
								<span className='font-bold hover:text-blue-700'>{account}</span>
							</button>
						</div>
					))} */}
			</div>
			{/*
			<div className='bg-gray-500'>
				<div className="bg-[url('/AlienWorlds.png')] rounded text-green-400 h-auto w-auto items-center justify-center">
					BNB
				</div>
			</div>
			 <iframe
				src='https://faraland.io/'
				sandbox='allow-scripts'
				referrerPolicy='strict-origin'
				width='1080'
				height='760'
				loading='lazy'
				style={{ border: 0 }}
			></iframe> */}
		</div>
	);
}

export default CreateAccount;
