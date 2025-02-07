import Navbar from "@/components/header/Navbar";

const HomePage = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<h1 className="text-3xl font-semibold text-center mt-8">
					Welcome to GetMyLink
				</h1>
				<p className="text-center mt-4">
					GetMyLink is a link shortening service that helps you shorten long
					URLs.
				</p>
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
		</>
	);
};

export default HomePage;
