export default function Page({ params }: { params: any }) {
	let address = '';
	if (params.slug) address = params.slug[0];
	// push Moon URL from here
	return <h1>My moons Page {address}</h1>;
}
