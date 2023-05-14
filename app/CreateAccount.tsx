'use client';
import { ClientContext } from '@/components/ClientProvider';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BiAddToQueue, BiImport } from 'react-icons/bi';

function CreateAccount() {
	const { logIn, logOut, account, particle, changeAddress, provider } =
		useContext(ClientContext);
	const [showModal, setShowModal] = useState(false);
	const [accountsList, setAccountsList] = useState([] as Array<string>);
	const [checked, setChecked] = useState(false);
	const handleChecked = () => {
		setChecked(!checked);
	};

	const router = useRouter();

	const handleCreateAccount = async () => {
		const notification = toast.loading(`SigningIn...`, { duration: 2000 });
		try {
			if (!particle.auth.isLogin()) logIn!();

			if (changeAddress) {
				const prov = provider;
				// new ethers.providers.JsonRpcProvider(
				// 	`https://bsc-testnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODEREAL_PROVIDER}`
				// );
				const signer: ethers.providers.JsonRpcSigner = prov.getSigner();
				console.log(await signer.getAddress());

				const res = await fillOp(await signer.getAddress(), prov);
				const smartAccountAddress = res.counterfactualAddress;
				console.log('AA: ', smartAccountAddress);

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
				if (balance.lte(parseEther('0.09'))) {
					toast.error(
						`No paymaster found! And not enough balance on ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push(`/transfers/${smartAccountAddress}`);
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

	return (
		<div className='min-h-full flex space-x-4 items-center justify-center mt-4'>
			<div className=' hover:shadow ml-2 w-96 p-4 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5'>
				{/* <ConnectButton />
				<br />
				<ConnectButton.Custom>
					{({ account, openConnectModal }) => (
						<button onClick={openConnectModal} className='cursor-pointer'>
							Create account {account}
						</button>
					)}
				</ConnectButton.Custom>
				<br /> */}
				<button onClick={handleCreateAccount} className='cursor-pointer'>
					Create AA
				</button>
				<br />
				<button onClick={() => logIn!()} className='cursor-pointer'>
					Connect
				</button>
				<br />
				<button onClick={logOut} className='cursor-pointer'>
					Disconnect
				</button>
				<br />
				{account}
				{/* <div className='flex justify-between'>
					
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
				</div> */}
			</div>

			<div className='flex flex-col items-center justify-center mt-5 px-2'>
				{accountsList.length > 0 &&
					accountsList.map((account, index) => (
						<div key={index} className='flex items-center justify-center'>
							<button
								onClick={() => {
									// changeAddress!(account);
									router.push('/moons');
								}}
								className='cursor-pointer bg-transparent border-none p-2 mb-2'
							>
								<span className=' text-[20px]'>Account-{index + 1}: </span>
								<span className='font-bold hover:text-blue-700'>{account}</span>
							</button>
						</div>
					))}
			</div>
		</div>
	);
}

export default CreateAccount;
