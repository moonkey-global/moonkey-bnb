import HeroPage from '@/components/HeroPage';
import Image from 'next/image';
import CreateAccount from './CreateAccount';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			{/* 
			
			<div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p> 
				<div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
					<a
						className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
						href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image
							src='/vercel.svg'
							alt='Vercel Logo'
							className='dark:invert'
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>
        */}

			{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
				{/* <Image
					className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
					src='/next.svg'
					alt='Next.js Logo'
					width={180}
					height={37}
					priority
				/> 
				<div className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'>
					MoonKey
				</div>
        
				<HeroPage />
				<CreateAccount />
			</div> */}
			<div className='max-h-screen'>
				<div className='min-h-full flex items-center justify-center'>
					<img src='/moon.png' className='m-4 h-20 w-20' />
				</div>
				<div className='min-h-full flex flex-col items-center justify-center'>
					<p className='font-Kelly text-3xl font-bold'>Who's using MoonKey?</p>
					<p className='text-2xl'>
						With MoonKey profiles you can separate all your wallet stuff. Create
						profiles
					</p>
					<p className='text-2xl'>
						{' '}
						for friends and family, or split between game and defi
					</p>
					{/* MainApp content */}
					<CreateAccount />
				</div>

				<div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80'>
					<svg
						className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
						viewBox='0 0 1155 678'
					>
						<path
							fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
							fillOpacity='.3'
							d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
						/>
						<defs>
							<linearGradient
								id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
								x1='1155.49'
								x2='-78.208'
								y1='.177'
								y2='474.645'
								gradientUnits='userSpaceOnUse'
							>
								<stop stopColor='#9089FC' />
								<stop offset={1} stopColor='#FF80B5' />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div className='absolute inset-x-0 top-[calc(50%-13rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(50%-17rem)]'>
					<svg
						className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
						viewBox='0 0 1155 678'
					>
						<path
							fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
							fillOpacity='.3'
							d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
						/>
						<defs>
							<linearGradient
								id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
								x1='1155.49'
								x2='-78.208'
								y1='.177'
								y2='474.645'
								gradientUnits='userSpaceOnUse'
							>
								<stop stopColor='#9089FC' />
								<stop offset={1} stopColor='#FF80B5' />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</main>
	);
}
