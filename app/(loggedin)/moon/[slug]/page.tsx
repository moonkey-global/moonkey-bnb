export default function Page({ params }: { params: { slug: string } }) {
	return (
		<div>
			<iframe
				src='https://faraland.io/'
				sandbox='allow-scripts'
				referrerPolicy='strict-origin'
				width='1080'
				height='760'
				loading='lazy'
				style={{ border: 0 }}
			></iframe>
		</div>
	);
}
