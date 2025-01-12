import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
};

export default layout;
