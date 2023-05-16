import { hexConcat, arrayify, defaultAbiCoder } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { fillUserOp } from './UserOp';
import { getUserOpHash } from './UserOp';
import { UserOperation } from './UserOperation';
import {
	VALID_AFTER,
	VALID_UNTIL,
	entrypointAddress,
	paymasterDeployAddress,
} from '../constants';
import { _abi } from '../typechains/VerifyingPaymaster__factory';
import { deploy } from './deploy';

async function paymasterDeploySign(op: UserOperation) {
	const sig: string = await fetch('/api/paymaster', {
		method: 'POST',
		body: JSON.stringify({
			paymasterAddress: paymasterDeployAddress,
			op: JSON.stringify(op),
			until: VALID_UNTIL,
			after: VALID_AFTER,
		}),
		cache: 'no-store',
	}).then((res) => res.json());
	console.log('PaymasterDeploy Sig: ', sig);

	return { sig: sig };
}

export async function fillOpPaymasterDeploy(
	ownerAddress: string,
	provider: ethers.providers.JsonRpcProvider
) {
	const { initCode, counterfactualAddress } = await deploy(
		ownerAddress,
		provider
	);
	const op = {
		sender: counterfactualAddress,
		initCode: initCode,
		verificationGasLimit: 1000000,
		paymasterAndData: hexConcat([
			paymasterDeployAddress,
			defaultAbiCoder.encode(['uint48', 'uint48'], [VALID_UNTIL, VALID_AFTER]),
			'0x' + '00'.repeat(65),
		]),
	};
	const userOp = await fillUserOp(
		op,
		entrypointAddress,
		provider as ethers.providers.Provider
	);

	console.log('UserOp1', userOp);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(userOp, entrypointAddress, chainId));
	// const entrypoint = new ethers.Contract(
	// 	entrypointAddress,
	// 	['function balanceOf(address account) public view returns (uint256)'],
	// 	provider
	// );

	// const balance = await entrypoint.callStatic.balanceOf(paymasterDeployAddress);

	return {
		message: message,
		userOp: userOp,
		counterfactualAddress: counterfactualAddress,
		// balance: balance,
	};
}

export async function paymasterFillOpDeploy(
	op: UserOperation,
	provider: ethers.providers.JsonRpcProvider
) {
	const { sig } = await paymasterDeploySign(op);

	// Build userOperation
	const op2 = {
		...op,
		paymasterAndData: hexConcat([
			paymasterDeployAddress,
			defaultAbiCoder.encode(['uint48', 'uint48'], [VALID_UNTIL, VALID_AFTER]),
			sig,
		]),
	};
	const userOp = await fillUserOp(
		op2,
		entrypointAddress,
		provider as ethers.providers.Provider
	);

	console.log('UserOp2', userOp);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(userOp, entrypointAddress, chainId));

	return {
		message: message,
		userOp: userOp,
	};
}
