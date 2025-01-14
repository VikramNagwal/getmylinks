import { z } from "zod";
import { SignUpSchema } from "@/schemas/authentication-schema";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type signUpForm = z.infer<typeof SignUpSchema>;

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const passwordToggle = () => {
		setShowPassword((showPassword) => !showPassword);
	};

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, dirtyFields, touchedFields },
	} = useForm<signUpForm>({
		resolver: zodResolver(SignUpSchema),
		mode: "onBlur",
	});

	const onSubmit = (data: signUpForm) => {
		console.log("Submitted");
		console.log(data);
		reset();
	};

	// Helper function to determine input validation state
	const getInputValidationClass = (fieldName: keyof signUpForm) => {
		const baseClass = "transition-all duration-200";

		if (dirtyFields[fieldName] && touchedFields[fieldName]) {
			if (errors[fieldName]) {
				return `${baseClass} focus-visible:ring-red-500`;
			}
			return `${baseClass} focus-visible:ring-green-500`;
		}

		return baseClass;
	};

	return (
		<div className="flex-1 flex justify-center items-center">
			<div className="max-w-sm py-4">
				<div>
					<h2 className="text-2xl md:text-4xl font-passage font-semibold mt-[40px] text-center">
						Just Few Steps Away
					</h2>
					<p className="text-center mt-3 md:text-xl">Sign up for free!!</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4 mt-[80px]"
				>
					<div className="flex gap-x-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								type="text"
								id="name"
								{...register("name")}
								className={`input-base ${getInputValidationClass("name")}`}
								placeholder="Jane Doe"
							/>
							{touchedFields.name && errors.name && (
								<span className="text-red-500 text-sm mt-2">
									{errors.name.message}
								</span>
							)}
						</div>
						<div>
							<Label htmlFor="username">Username</Label>
							<Input
								type="text"
								id="username"
								{...register("username")}
								className={`input-base ${getInputValidationClass("username")}`}
								placeholder="hey_janedoe"
							/>
							{touchedFields.username && errors.username && (
								<span className="text-red-500 text-sm mt-2">
									{errors.username.message}
								</span>
							)}
						</div>
					</div>

					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							{...register("email")}
							className={`input-base ${getInputValidationClass("email")}`}
							placeholder="janedoe@myself.co"
						/>
						{touchedFields.email && errors.email && (
							<span className="text-red-500 text-sm mt-2">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="relative">
						<Label htmlFor="password">Password</Label>
						<Input
							type={showPassword ? "text" : "password"}
							id="password"
							{...register("password")}
							className={`pr-10 input-base ${getInputValidationClass(
								"password",
							)}`}
						/>

						<button
							type="button"
							onClick={passwordToggle}
							className="absolute inset-y-0 top-6 right-4 flex items-center text-gray-600"
						>
							{showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
						</button>

						{touchedFields.password && errors.password && (
							<span className="text-red-500 text-sm mt-2">
								{errors.password.message}
							</span>
						)}
					</div>

					<div className="relative">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							type={showPassword ? "text" : "password"}
							id="confirmPassword"
							{...register("confirmPassword")}
							className={`pr-10 input-base ${getInputValidationClass(
								"confirmPassword",
							)}`}
						/>

						<button
							type="button"
							onClick={passwordToggle}
							className="absolute inset-y-0 top-6 right-4 flex items-center text-gray-600"
						>
							{showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
						</button>

						{touchedFields.confirmPassword && errors.confirmPassword && (
							<span className="text-red-500 text-sm mt-2">
								{errors.confirmPassword?.message}
							</span>
						)}
					</div>

					<Button type="submit">Create account</Button>
				</form>

				<p className="capitalize my-2 p-2">
					Already have an account?{" "}
					<a href="/login" className="text-blue-700 link">
						Log in
					</a>
				</p>

				<div className="mt-2 flex items-start">
					<Checkbox id="update" defaultChecked className="mr-2 mt-1" />
					<Label
						htmlFor="update"
						className="capitalize leading-5 font-thin peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						By clicking <b>Create Account</b>, you agree to GetMyLink's{" "}
						<a href="/terms" className="link">
							Terms & Conditions
						</a>{" "}
						and to accept offers, news, and updates.
					</Label>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
