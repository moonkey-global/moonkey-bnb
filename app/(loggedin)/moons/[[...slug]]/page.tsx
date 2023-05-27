import { Input } from '@/components/ui/input';

export default function Page({ params }: { params: any }) {
	let address = '';
	if (params.slug) address = params.slug[0];
	// push Moon URL from here
	return (
		<div className='flex flex-col col-span-6 mt-10'>
			<Input
				id='searchbar'
				defaultValue='Search...'
				className='col-span-2 max-w-md h-10 items-center justify-center ml-2'
			/>
			<div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-1 md:px-3'>
				<div className='flex flex-col items-center'>
					<img
						src='/alien-worlds.webp'
						alt='AlienWorlds logo'
						width='90'
						height='90'
						className='rounded-md'
					/>
					<p>Alien Worlds</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/faraland.jpeg'
						alt='Faraland logo'
						width='90'
						height='90'
						className='rounded-md'
					/>
					<p>Faraland</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/crazydefenseheros.jpeg'
						alt='CrazyDefense logo'
						width='90'
						height='90'
						className='rounded-md'
					/>
					<p>Crazy Defense</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/drunkrobots.webp'
						alt='DrunkRobots logo'
						width='90'
						height='90'
						className='rounded-md'
					/>
					<p>Drunk Robots</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/spacesix.jpeg'
						alt='SpaceSix logo'
						width='90'
						height='90'
						className='rounded-md'
					/>
					<p>Space six</p>
				</div>
			</div>
		</div>
	);
}
