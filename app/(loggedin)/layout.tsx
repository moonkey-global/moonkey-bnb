import Sidebar from '@/components/Sidebar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='grid grid-cols-8'>
			<Sidebar />
			{children}
		</main>
	);
}
