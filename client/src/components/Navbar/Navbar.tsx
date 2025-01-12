import { ModeToggle } from "../Mode-toggle";

const Navbar = () => {
	return (
		<nav>
			<div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center">
				<h1 className="text-xl md:text-3xl font-Gloock">getmylinks</h1>

				<ModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
