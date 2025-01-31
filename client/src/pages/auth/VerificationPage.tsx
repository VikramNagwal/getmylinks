import { VerifyForm } from "@/components/forms/VerifyForm";

const VerificationPage = () => {
	return (
		<div className="overflow-hidden">
			<div className="flex h-[700px]">
				{/* Left half */}
				<div className="flex-1 p-8 bg-[#FFDE59]">
					<VerifyForm />
				</div>
				{/* Right half */}
				<div className="flex-1 hidden md:flex items-center justify-center">
					<img
						src="../images/design.webp"
						alt="doodles"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default VerificationPage;
