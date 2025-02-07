import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/schemas/authentication-schema";
import { usePasswordStreanth } from "@/utils/use-password";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEmail } from "@/context/email-context";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/AuthSlicer";

const useSignUpMutation = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (data: Omit<SignUpForm, "confirmPassword">) => {
			return await axios.post(
				"http://localhost:8080/api/v1/auth/register",
				data,
			);
		},
		onSuccess: () => {
			toast({
				title: "Just few steps away🎉",
				description: "we've sent you a verification link!",
			});
			navigate(`/request/verify-email`);
		},

		onError: () => {
			toast({
				title: "Registeration Failed",
				description: "Something went wrong on our side. Please try later",
				variant: "destructive",
			});
		},
	});
};

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { mutate } = useSignUpMutation();
	const { setEmail, setUsername } = useEmail();
	const dispatch = useDispatch();

	const form = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const { watch } = form;
	const password = watch("password");

	//   password strength check
	const { strengthColor, strengthText, strengthChecks, strengthScore } =
		usePasswordStreanth(password);

	const onSubmit = async (data: SignUpForm) => {
		if (isSubmitting) return;
    setIsSubmitting(true);
		setEmail(data.email);
		setUsername(data.username);
		dispatch(setUser({ email: data.email, username: data.username }));
		mutate(data);
		setIsSubmitting(false);
	};

	return (
		<Card className="w-full border-0 shadow-none max-w-md mx-auto">
			<CardHeader className="space-y-1 md:pb-6">
				<CardTitle className="font-heading md:text-4xl">
					Just Few Steps Away.
				</CardTitle>
				<CardDescription>
					Sign up to get started with getmylinks
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="flex justify-between space-x-4">
							{/* Name field */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Jane Doe"
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Username field */}
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="hey_jane"
												{...field}
												onChange={(e) =>
													field.onChange(e.target.value.toLowerCase())
												}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* Email Field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="janedoe@example.com"
											type="email"
											{...field}
											onChange={(e) =>
												field.onChange(e.target.value.toLowerCase())
											}
											disabled={isSubmitting}
											autoComplete="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password Field */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="Enter your password"
												type={showPassword ? "text" : "password"}
												{...field}
												disabled={isSubmitting}
												autoComplete="new-password"
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-2 top-1/2 -translate-y-1/2"
												onClick={() => setShowPassword(!showPassword)}
												disabled={isSubmitting}
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />

									{field.value && (
										<div className="space-y-2 mt-2">
											<div className="flex gap-2">
												{[0, 1, 2, 3, 4].map((index) => (
													<div
														key={index}
														className={`h-2 w-full rounded ${
															index < strengthScore
																? strengthColor
																: "bg-gray-200"
														}`}
													/>
												))}
											</div>
											<p className="text-sm text-gray-500">
												Password Strength: {strengthText}
											</p>

											<div className="space-y-1">
												{Object.entries(strengthChecks).map(([key, valid]) => (
													<div
														key={key}
														className="flex items-center text-sm gap-2"
													>
														{valid ? (
															<CheckCircle2
																className="text-green-500"
																size={16}
															/>
														) : (
															<XCircle className="text-red-500" size={16} />
														)}
														{key === "length"
															? "At least 8 characters"
															: key === "uppercase"
																? "Contains uppercase letter"
																: key === "lowercase"
																	? "Contains lowercase letter"
																	: key === "number"
																		? "Contains number"
																		: "Contains special character"}
													</div>
												))}
											</div>
										</div>
									)}
								</FormItem>
							)}
						/>

						{/* Confirm Password Field */}
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="Confirm your password"
												type={showConfirmPassword ? "text" : "password"}
												{...field}
												disabled={isSubmitting}
												autoComplete="new-password"
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-2 top-1/2 -translate-y-1/2"
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												disabled={isSubmitting}
											>
												{showConfirmPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Creating Account...
								</>
							) : (
								"Sign Up"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default SignUpForm;
