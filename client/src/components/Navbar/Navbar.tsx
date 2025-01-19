import { ModeToggle } from "../Mode-toggle";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
	return (
		<nav>
			<div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center">
				<a href="/" className="text-xl md:text-3xl font-Gloock">getmylinks</a>

				<div className="flex items-center space-x-4">
					<ModeToggle />
					<LogoutButton />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
