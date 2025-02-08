import LogoutButton from "./buttons/LogoutButton";
import { ModeToggle } from "../Mode-toggle";

const Navbar = () => {
	return (
		<nav className="z-10">
			<div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center">
				<a href="/" className="text-xl md:text-3xl font-Gloock">
					getmylinks
				</a>

				<div className="flex items-center space-x-4">
					<ModeToggle />
					<LogoutButton />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
