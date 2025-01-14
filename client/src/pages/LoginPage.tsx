import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
	return (
		<main className="h-screen overflow-hidden">
			<div className="flex justify-between h-screen">
				{/* form */}
				<LoginForm />
				<div className="hidden md:block flex-1 relative">
					<a
						href="/"
						className="font-Gloock text-xl md:text-4xl absolute top-3 right-6 text-white shadow-black cursor-pointer z-10"
					>
						getmylinks
					</a>
					<img
						src="../images/spiral.webp"
						alt="seashore-img"
						loading="lazy"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
