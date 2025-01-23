import ShortnForm from "@/components/forms/ShortnForm";
import Navbar from "@/components/navbar/Navbar";

const Dashboard = () => {
	document.title = "Dashboard | getmylinks";
	return (
		<>
			<nav>
				<Navbar />
			</nav>
			<main className="p-2 mt-[60px]">
				
				<section className="flex flex-col items-center justify-center space-y-4">
					<h1 className="font-heading">Paste or write your link below</h1>
					<ShortnForm />
				</section>
			</main>
		</>
	);
};

export default Dashboard;
