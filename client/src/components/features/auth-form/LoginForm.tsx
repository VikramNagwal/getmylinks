import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema } from "@/zod/authentication-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { logger } from "@/utils/logger";
import { fireCall } from "@/lib/axiosConfig";

type LogInForm = z.infer<typeof LoginSchema>;

const useLoginMutation = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: LogInForm) => {
			return fireCall.post(`/auth/login`, data);
		},

		onSuccess: () => {
			toast({
				title: "Welcome Back 🥳",
			});
			navigate(`/admin`);
		},

		onError: (error) => {
			logger.error(error);
			toast({
				title: "Email does not exists",
				description: "Please check your credentials",
				variant: "destructive",
			});
		},
	});
};

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate } = useLoginMutation();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, touchedFields, dirtyFields },
	} = useForm<LogInForm>({
		resolver: zodResolver(LoginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: LogInForm) => {
		mutate(data);
	};

	const TogglePassword = () => {
		setShowPassword((showPassword) => !showPassword);
	};

	const shouldShowError = (fieldName: keyof LogInForm) => {
		const value = watch(fieldName);
		return (
			touchedFields[fieldName] &&
			dirtyFields[fieldName] &&
			errors[fieldName] &&
			value
		);
	};

	const getInputValidationClass = (fieldName: keyof LogInForm) => {
		const baseClass = "transition-all duration-200";

		if (dirtyFields[fieldName] && touchedFields[fieldName]) {
			const value = watch(fieldName);
			if (!value) return baseClass;

			if (errors[fieldName]) {
				return `${baseClass} focus-visible:ring-red-500`;
			}
			return `${baseClass} focus-visible:ring-green-500`;
		}

		return baseClass;
	};

	return (
		<section className="flex-1 flex justify-center items-center">
			<div className="w-full max-w-sm px-4">
				<div className="mb-4">
					<h2 className="text-2xl md:text-4xl font-passage font-semibold mb-2 text-center">
						Welcome Back!
					</h2>
					<p className="text-center md:text-xl font-thin">
						Log in to your getmylinks
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4 mt-12"
				>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							{...register("email")}
							className={`input-base ${getInputValidationClass("email")}`}
							placeholder="Johndoe@myself.co"
						/>
						{shouldShowError("email") && (
							<span className="text-red-500 text-sm mt-2">
								{errors.email?.message || "Please enter a valid email"}
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
							onClick={TogglePassword}
							className="absolute inset-y-0 top-6 right-4 flex items-center text-gray-600"
						>
							{showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
						</button>
						{shouldShowError("password") && (
							<span className="text-red-500 text-sm mt-2">
								{errors.password?.message || "Please enter your password"}
							</span>
						)}
					</div>

					<Button type="submit" className="mt-2">
						Log in
					</Button>
				</form>

				{/* <div className="mt-6 link text-violet-800 text-sm flex flex-col items-start space-y-1">
					<a href="/forgot-password" className="hover:opacity-90">
						Forgot Password?
					</a>
					<Separator orientation="vertical" />
					<a href="/forgot-username" className="hover:opacity-90">
						Forgot Username?
					</a>
				</div> */}

				<p className="capitalize text-sm mt-8 text-center leading-relaxed">
					Don't have an account?{" "}
					<a
						href="/register"
						className="text-blue-700 hover:opacity-90 underline underline-offset-2"
					>
						Create one
					</a>
				</p>
			</div>
		</section>
	);
};

export default LoginForm;
