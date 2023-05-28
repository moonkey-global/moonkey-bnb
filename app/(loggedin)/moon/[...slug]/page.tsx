export default function Page({ params }: { params: { slug: string } }) {
	let url = '';
	if (params.slug) url = params.slug[1];

	return (
		<div className='flex items-center justify-center col-span-8 md:w-full'>
			<iframe
				src={`https://${url}`}
				sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
				referrerPolicy='strict-origin'
				width='100%'
				height='720px'
				style={{ border: 0 }}
			></iframe>
		</div>
	);
}
