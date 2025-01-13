import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
	document.title = "Create account - GetMyLinks";
	return (
		<main className="h-screen overflow-hidden">
			<div className="flex justify-between relative h-screen">
				<div className="flex-1">
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

				<div className="flex-1 flex justify-center items-center">
					<div className="w-full h-full max-w-sm py-4">
						<h2 className="text-4xl font-passage font-semibold mt-[80px] text-center">
							Just Few Steps Away
						</h2>
						<p className="text-center mt-3 md: text-xl">Sign up for free!!</p>
						<form action="" className="flex flex-col gap-y-4 mt-[120px]">
							<div className="flex gap-x-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										type="text"
										name="name"
										id="name"
										placeholder="Jane Doe"
									/>
								</div>
								<div>
									<Label htmlFor="username">Username</Label>
									<Input
										type="text"
										id="username"
										name="username"
										placeholder="hey_janedoe"
									/>
								</div>
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									name="email"
									placeholder="janedoe@myself.co"
								/>
							</div>
							<div>
								<Label htmlFor="password">Password</Label>
								<Input type="password" id="password" name="password" />
							</div>
							<Button type="submit">Create account</Button>
						</form>

						<p className="capitalize my-2 p-2">
							Already have an account?{" "}
							<a href="/login" className="text-blue-700">
								Log in
							</a>
						</p>

						<div className="mt-2 flex items-start">
							<Checkbox id="update" defaultChecked className="mr-2 mt-1" />
							<Label
								htmlFor="update"
								className="capitalize leading-5 font-thin peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								By clicking <b>Create Account</b>, you agree to GetMyLink's
								<span className="underline"> Terms & Conditions</span> and to
								accept offers, news, and updates.
							</Label>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default RegisterPage;
