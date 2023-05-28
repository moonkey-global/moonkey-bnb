import { UserOperation } from '@/lib/scripts/UserOperation';
import { ethers } from 'ethers';
import { arrayify } from 'ethers/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	console.log('Body: ', body);
	if (!body) return new Response('Error, no body', { status: 500 });

	const provider = new ethers.providers.JsonRpcProvider(
		`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER}`
	);
	const offchainSigner = new ethers.Wallet(
		process.env.PAYMASTER_OWNER_PRIVATE_KEY!,
		provider
	);
	const paymaster = new ethers.Contract(
		body.paymasterAddress as string,
		[
			'function getHash(tuple(address sender, uint256 nonce, bytes initCode, bytes callData, uint256 callGasLimit, uint256 verificationGasLimit, uint256 preVerificationGas, uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData, bytes signature) calldata userOp, uint48 validUntil, uint48 validAfter) public view returns (bytes32)',
		],
		provider
	);
	const hash = await paymaster.callStatic.getHash(
		JSON.parse(body.op) as UserOperation,
		Number(body.until),
		Number(body.after)
	);
	console.log('Hash: ', hash);
	const sig = await offchainSigner.signMessage(arrayify(hash));
	return NextResponse.json(sig, { status: 201 });
}
