import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MailCheck } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar/Navbar";
import { useMutation } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

const useVerifyMutation = () => {
	const { uuid } = useParams();
	return useMutation({
		mutationFn: (data: z.infer<typeof FormSchema>) => {
			return axios.post(`http://localhost:8080/api/v1/auth/${uuid}/verify`, data, {
				withCredentials: true,
			})
		},

		onSuccess() {
			toast({
				title: "Account Verified",
				description: "You can now login to your account",
			});
		},

		onError() {
			toast({
				title: "Invalid OTP",
				description: "Invalid OTP",
				variant: "destructive",
			});
		},
	})
}

const VerificationPage = () => {

	const { mutate } = useVerifyMutation()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		mutate(data);
	}

	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center mt-[160px] md:mt-[180px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 flex flex-col items-center p-4"
					>
						<FormField
							control={form.control}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center space-x-3 py-3">
										<FormLabel>
											Enter your One Time Password for Verification
										</FormLabel>
										<MailCheck />
									</div>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										Please enter the one-time password sent to your phone.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between w-full">
							<Button type="submit">Submit</Button>
							<a href="/resend-again" className="text-blue-700">
								did'nt recieved otp?
							</a>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
};

export default VerificationPage;
