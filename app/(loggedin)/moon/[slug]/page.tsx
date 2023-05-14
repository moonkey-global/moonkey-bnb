export default function Page({ params }: { params: { slug: string } }) {
	const moonURL = params.slug;
	return <h1>Moon {moonURL}</h1>;
}
