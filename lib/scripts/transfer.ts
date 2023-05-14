import { ethers } from 'ethers';
import { fillUserOp, getUserOpHash } from './UserOp';
import { arrayify } from 'ethers/lib/utils';
import { accountAddress, entrypointAddress } from '../constants';

export async function transfer(
	ownerAddress: string,
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
	to: string,
	toContract?: string
) {
	const erc20ABI = [
		'function transfer(address to, uint amount) returns (bool)',
	];
	let callData = '0x';
	if (toContract && toContract !== '') {
		const erc20 = new ethers.utils.Interface(erc20ABI);
		callData = erc20.encodeFunctionData('transfer', [to, amount]);
		to = toContract;
	}
	//if (!toContract) toContract = '0xE097d6B3100777DC31B34dC2c58fB524C2e76921'; //ERC20 token address
	//executeTx(ownerAddress, provider, amount, toContract, callData);
	const accountFactory = new ethers.Contract(
		accountAddress,
		[
			'function createAccount(address owner, uint256 salt) public returns (address account)',
			'function safeSingleton() returns (address)',
			'function getAddress(address owner, uint256 salt) public returns (address account)',
		],
		provider
	);

	const safeSingleton = new ethers.Contract(
		await accountFactory.callStatic.safeSingleton(),
		[
			'function executeAndRevert(address to,uint256 value,bytes calldata data,uint8 operation) external',
		],
		provider
	);
	const safe_execTxCallData = safeSingleton.interface.encodeFunctionData(
		'executeAndRevert',
		[to, amount, callData, 0]
	);

	const counterfactualAddress = await accountFactory.callStatic.getAddress(
		ownerAddress,
		1234
	);
	const op = {
		sender: counterfactualAddress, //The account
		callData: safe_execTxCallData,
	};
	const op2 = await fillUserOp(
		op,
		entrypointAddress,
		provider as ethers.providers.Provider
	);

	console.log('UserOp', op2);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(op2, entrypointAddress, chainId));

	return {
		message: message,
		op2: op2,
		counterfactualAddress: counterfactualAddress,
	};
}
