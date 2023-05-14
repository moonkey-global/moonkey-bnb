import './globals.css';
import ClientProvider from '@/components/ClientProvider';

export const metadata = {
	title: 'Moonkey',
	description: 'Super app with, ERC4337 account abstraction',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<ClientProvider>{children}</ClientProvider>
			</body>
		</html>
	);
}
