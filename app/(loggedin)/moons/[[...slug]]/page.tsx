import { Input } from '@/components/ui/input';
import Moon from './Moon';

export default function Page({ params }: { params: any }) {
	let address = '';
	if (params.slug) address = params.slug[0];

	// push Moon URL from here
	return (
		<div className='flex flex-col col-span-6 mt-10'>
			<Input
				id='searchbar'
				defaultValue='Search...'
				className='col-span-2 max-w-md h-10 items-center justify-center ml-4 mb-5'
			/>
			<Moon />
		</div>
	);
}
