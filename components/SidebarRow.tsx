'use client';
//import { useRouter } from 'next/router';
import { IconBaseProps, IconType } from 'react-icons';
interface Props {
	Icon: IconType;
	title: string;
}
function SidebarRow({ Icon, title }: Props) {
	//const router = useRouter();
	//const currentRoute = router.pathname;
	//const checkActive = () => {
	//	if (title === 'Moons') {
	//		if (currentRoute === '/moons') {
	//			return true;
	//		}
	//
	//		return false;
	//	} else {
	//		if (`/moons/${title.toLowerCase()}` === currentRoute) {
	//			return true;
	//		}
	//		return false;
	//	}
	//};

	return (
		<div
			className={`group hover:bg-gray-100 transition-all duration-200 group flex cursor-pointer items-center space-x-2 px-4 py-3 rounded-full`}
		>
			<p
				className={`hidden md:inline-flex text-base font-light lg:text-xl group-hover:text-[#00ADED]`}
			>
				{title}
			</p>
			<Icon size={25} className={`group-hover:text-[#00ADED]`} />
		</div>
	);
}

export default SidebarRow;
