import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ArrowDownLeft, ArrowUpRight, Copy, Plus } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
	const Recieve = () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='ghost'>
						<ArrowDownLeft />
						Recieve
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Recieve tokens</DialogTitle>
						<DialogDescription>Smart account address</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<p className='text-sm font-medium leading-none'>QR Code</p>
						<Image src='/qrcode.png' alt='QR Code' width={100} height={100} />
						<p className='flex text-sm text-muted-foreground'>
							Copy address
							<Copy className='ml-1 h-3 w-3' />
						</p>
					</div>
				</DialogContent>
			</Dialog>
		);
	};
	return (
		<div className='flex flex-col items-center justify-center col-span-6 mt-10'>
			<div className='w-[800px]'>
				<h4 className='text-xl font-medium leading-none'>Assets</h4>
				<Separator className='my-4 w-[200px]' />
				<div className='flex h-5 items-center space-x-4 text-sm mb-4'>
					<div>Tokens</div>
					<Separator orientation='vertical' className='my-4' />
					<div>NFTs</div>
				</div>
				<div className='grid gap-4'>
					<div className='flex items-center space-x-4 rounded-md border p-4'>
						<Image
							src='/dai-logo.svg'
							alt='DAI Logo'
							width={24}
							height={24}
							priority
						/>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none'>DAI</p>
							<p className='text-sm text-muted-foreground'>0.0</p>
						</div>
						<div className='flex'>
							<ArrowUpRight />
							Send
						</div>
						<div className='flex'>
							<Recieve />
						</div>
					</div>
					<div className='flex items-center space-x-4 rounded-md border p-4'>
						<Image
							src='/matic-logo.svg'
							alt='Matic Logo'
							width={24}
							height={24}
						/>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none'>MATIC</p>
							<p className='text-sm text-muted-foreground'>0.0</p>
						</div>
						<div className='flex'>
							<ArrowUpRight />
							Send
						</div>
						<div className='flex'>
							<Recieve />
						</div>
					</div>
					<div className='flex items-center space-x-4 rounded-md border p-4'>
						<Image
							src='/usdc-logo.svg'
							alt='USDC Logo'
							width={24}
							height={24}
						/>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none'>USDC</p>
							<p className='text-sm text-muted-foreground'>0.0</p>
						</div>
						<div className='flex'>
							<ArrowUpRight />
							Send
						</div>
						<div className='flex'>
							<Recieve />
						</div>
					</div>
					<div className='flex items-center space-x-4 rounded-md border p-4'>
						<Image src='/eth-logo.svg' alt='ETH Logo' width={24} height={24} />
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none'>WETH</p>
							<p className='text-sm text-muted-foreground'>0.0</p>
						</div>
						<div className='flex'>
							<ArrowUpRight />
							Send
						</div>
						<div className='flex'>
							<Recieve />
						</div>
					</div>
					<div className='flex relative items-center justify-center space-x-4 p-4'>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant='outline' className='w-10 rounded-full p-0'>
									<Plus className='h-6 w-6' />
									<span className='sr-only'>Open</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-80'>
								<div className='grid gap-4'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Token import</h4>
										<p className='text-sm text-muted-foreground'>
											Set the contract address
										</p>
									</div>
									<div className='grid gap-2'>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='tokenAddress'>Contract Address</Label>
											<Input
												id='tokenaddress'
												defaultValue=' '
												className='col-span-2 h-8'
											/>
										</div>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='tokenName'>Name</Label>
											<Input
												id='tokenname'
												placeholder=' '
												className='col-span-2 h-8'
											/>
										</div>
									</div>
								</div>
							</PopoverContent>
						</Popover>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none'>Import new</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
