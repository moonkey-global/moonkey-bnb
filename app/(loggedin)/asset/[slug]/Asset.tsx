'use client';
import { ClientContext } from '@/components/ClientProvider';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DAIAddress, USDCAddress, WETHAddress } from '@/lib/constants';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { transfer } from '@/lib/scripts/transfer';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { ArrowUpRight, Copy } from 'lucide-react';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export function ClipboardAddress() {
	const { newAddress } = useContext(ClientContext);
	return (
		<div
			className='flex text-sm text-muted-foreground cursor-pointer'
			onClick={() => navigator.clipboard.writeText(newAddress)}
		>
			Copy address
			<Copy className='ml-1 h-3 w-3' />
		</div>
	);
}

function Asset(props: { tokenSymbol: string }) {
	const tokenSymbol = props.tokenSymbol;
	const {
		logIn,
		particle,
		changeAddress,
		provider,
		changeAccount,
		newAccount,
		latestProvider,
		newAddress,
	} = useContext(ClientContext);
	const [amount, setAmount] = useState('1');
	const [receiverAddress, setReceiverAddress] = useState(
		'0x0000000000000000000000000000000000000000'
	);
	const receiverAddressChange = (event: { target: { value: string } }) => {
		setReceiverAddress(event.target.value);
	};
	const amountChange = (event: { target: { value: string } }) => {
		setAmount(event.target.value);
	};
	const sendTransaction = async (
		to: string,
		amount: number,
		toContract: string
	) => {
		const notification = toast.loading(
			`Sending ${amount} to ${to.substring(0, 6)}`,
			{
				duration: 5000,
			}
		);
		try {
			if (!particle.auth.isLogin() || !provider) {
				toast.error(`Please connect signer for the smart account!`, {
					id: notification,
					duration: 5000,
				});
				return;
			}

			const prov = provider;
			const signer: ethers.providers.JsonRpcSigner = prov.getSigner();
			const res = await transfer(
				await signer.getAddress(),
				prov,
				amount,
				to,
				toContract
			);
			//console.log('Address: ', res.counterfactualAddress);

			const smartAccountAddress = res.counterfactualAddress;
			if (
				(await prov.getCode(smartAccountAddress)).length <= 2 &&
				smartAccountAddress === newAddress
			) {
				toast.loading(
					`Deploying a Smart Account ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);
				const balance = await prov.getBalance(smartAccountAddress);
				if (balance.lte(parseEther('0.001'))) {
					toast.error(
						`No paymaster found! And not enough balance to deploy ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					return;
				}
				const resDeploy = await fillOp(await signer.getAddress(), prov);
				if (resDeploy.counterfactualAddress !== smartAccountAddress) {
					toast.error(
						`Found conflicting address, confirm that the signer is connected to the address ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					return;
				}
				const signature = await signer.signMessage(resDeploy.message);
				const op: UserOperation = { ...resDeploy.op2, signature: signature };
				// const res2 = await paymasterSigned(op, prov);
				// const sig2 = await signer.signMessage(res2.message);
				// const op2: UserOperation = { ...res2.userOp, signature: sig2 };
				await sendToBundler(op, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);
			}
			const signature = await signer.signMessage(res.message);
			const op: UserOperation = { ...res.op2, signature: signature };
			// const res2 = await paymasterSigned(op, prov);
			// const sig2 = await signer.signMessage(res2.message);
			// const op2: UserOperation = { ...res2.userOp, signature: sig2 };
			await sendToBundler(op, prov);
			toast.success(`Sent ${amount} to ${to.substring(0, 6)}`, {
				id: notification,
				duration: 5000,
			});
		} catch (error) {
			toast.error(`Whoops... Something went wrong! Check console`, {
				id: notification,
				duration: 5000,
			});
			console.error(error);
		}
	};
	const handleSubmit = async (tokenSymbol: string) => {
		let toContract = '';
		if (tokenSymbol === 'USDC') {
			toContract = USDCAddress;
		} else if (tokenSymbol === 'WETH') {
			toContract = WETHAddress;
		} else if (tokenSymbol === 'DAI') {
			toContract = DAIAddress;
		}

		console.log('To Contract: ', toContract);
		await sendTransaction(receiverAddress, Number(amount), toContract);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost'>
					<ArrowUpRight />
					Send
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						Transfer
						<Separator orientation='horizontal' />
					</DialogTitle>
					<DialogDescription>
						<div className='flex items-center justify-center space-x-4 mt-1'>
							<img
								src={`/${tokenSymbol.toLowerCase()}-logo.svg`}
								alt={`${tokenSymbol} Logo`}
								width={28}
								height={28}
							/>
							<p className='text-sm font-bold leading-none'>{tokenSymbol}</p>
						</div>
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='address' className='text-right'>
							Receiver address
						</Label>
						<Input
							id='raddress'
							placeholder={'0x0000000000000000000000000000000000000000'}
							onChange={receiverAddressChange}
							className='col-span-3'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='amount' className='text-right'>
							Amount
						</Label>
						<Input
							id='ramount'
							placeholder={'0.00'}
							onChange={amountChange}
							className='col-span-3'
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							onClick={async () => {
								await handleSubmit(tokenSymbol);
							}}
						>
							Send
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default Asset;
