import RegisterForm from "@/components/features/auth-form/RegisterForm";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const RegisterPage = () => {
	const [imageLoading, setImageLoading] = useState(true);

	return (
		<main className="min-h-screen bg-background">
			<div className="flex flex-col md:flex-row">
				<div className="hidden md:block md:w-1/2 md:fixed left-0 top-0 h-screen bg-black">
					<div className="absolute inset-0 bg-black/30 z-10" />
					<a
						href="/"
						className="absolute top-6 left-6 z-20 font-Gloock text-3xl md:text-4xl text-white hover:opacity-80 transition-opacity"
					>
						getmylinks
					</a>

					{imageLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-black z-[5]">
							<Loader2 className="h-8 w-8 animate-spin text-white" />
						</div>
					)}

					<img
						src="../images/login-screen.webp"
						alt="Welcome to GetMyLinks"
						className={`w-full h-full object-cover transition-opacity duration-300 ${
							imageLoading ? "opacity-0" : "opacity-100"
						}`}
						onLoad={() => setImageLoading(false)}
					/>
				</div>

				<div className="w-full min-h-screen md:w-1/2 md:ml-[50%] flex items-center justify-center px-4 py-6 md:px-6 md:py-8">
					<a
						href="/"
						className="absolute top-6 left-6 md:hidden font-Gloock text-2xl text-primary hover:opacity-80 transition-opacity"
					>
						getmylinks
					</a>
					<div className="w-full sm:px-4 md:px-8 lg:px-12">
						<RegisterForm />
					</div>
				</div>
			</div>
		</main>
	);
};

export default RegisterPage;
