export default function Page({ params }: { params: { slug: string } }) {
	let address = '';
	if (params.slug) address = params.slug;
	// On-ramp page
	return <h1>Buy</h1>;
}
