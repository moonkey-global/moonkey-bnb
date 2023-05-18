export default function Page({ params }: { params: any }) {
	let address = '';
	if (params.slug) address = params.slug[0];
	// push Moon URL from here
	return (
		<div className='flex flex-col col-span-6'>
			<div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-1 md:px-3'>
				<div className='flex flex-col items-center'>
					<img
						src='/AlienWorlds.png'
						alt='AlienWorlds logo'
						width='90'
						height='90'
					/>
					<p>Alien Worlds</p>
				</div>
				<div className='flex flex-col items-center'>
					<img src='/Faraland.png' alt='Faraland logo' width='90' height='90' />
					<p>Faraland</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/CrazyDefense.png'
						alt='CrazyDefense logo'
						width='90'
						height='90'
					/>
					<p>Crazy Defense</p>
				</div>
				<div className='flex flex-col items-center'>
					<img
						src='/DrunkRobots.png'
						alt='DrunkRobots logo'
						width='90'
						height='90'
					/>
					<p>Drunk Robots</p>
				</div>
			</div>
		</div>
	);
}
