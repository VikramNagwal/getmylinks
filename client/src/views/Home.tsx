import Navbar from "@/components/commons/Navbar";


const HomePage = () => {
	return (
		<main className="px-2">
			<header>
				<Navbar />
			</header>
			<main>
				<h1 className="text-3xl font-semibold text-center mt-8">
					Welcome to GetMyLink
				</h1>
				
				<p className="text-center mt-4">
					To get started,{" "}
					<a href="/register" className="text-blue-700">
						create an account
					</a>{" "}
					or{" "}
					<a href="/login" className="text-blue-700">
						log in
					</a>
					.
				</p>
			</main>
		</main>
	);
};

export default HomePage;
