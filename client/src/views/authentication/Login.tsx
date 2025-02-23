import LoginForm from "@/components/features/auth-form/LoginForm";

const LoginPage = () => {
	return (
		<main className="h-screen overflow-hidden">
			<div className="flex justify-between h-screen">
				<LoginForm />
				<div className="hidden md:block flex-1 relative">
					<a
						href="/"
						className="font-Gloock text-xl md:text-4xl absolute top-3 right-6 text-white shadow-black cursor-pointer z-10"
					>
						getmylinks
					</a>
					<div>
						<p className="z-20 absolute bottom-8 left-12 font-passage text-2xl text-white">this is awesome.</p>
					</div>
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
