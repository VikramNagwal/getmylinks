import RegisterForm from "@/components/auth-ui/RegisterForm";

const RegisterPage = () => {
	document.title = "Create account - GetMyLinks";
	return (
		<main className="h-screen overflow-hidden">
			<div className="flex justify-between relative h-screen">
				<div className="flex-1 hidden md:flex">
					<a
						href="/"
						className="font-Gloock text-xl md:text-4xl absolute top-3 left-6 text-white shadow-black cursor-pointer"
					>
						getmylinks
					</a>
					<img
						src="../images/login-screen.webp"
						alt="lockscreen-img"
						className="w-full h-full object-cover"
					/>
				</div>
				{/* form */}
				<RegisterForm />
			</div>
		</main>
	);
};

export default RegisterPage;
