import { ModeToggle } from "@/components/Mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import UserAvatar from "../commons/Avatar";

const avatarImage = "https://avatar.iran.liara.run/public/boy"; //avatar url

const Header = () => {
	return (
		<header className="flex w-full h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<div className="flex items-center gap-4">
				<ModeToggle />
				<Separator orientation="vertical" />
				<UserAvatar avatarUrl={avatarImage} />
			</div>
		</header>
	);
};

export default Header;
