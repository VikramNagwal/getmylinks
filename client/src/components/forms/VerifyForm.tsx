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
import { useMutation } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormSchema = z.object({
	otp: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

const useVerifyMutation = () => {
	const { uuid } = useParams();
	console.log(uuid);

	return useMutation({
		mutationFn: (data: z.infer<typeof FormSchema>) => {
			return axios.post(
				`http://localhost:8080/api/v1/auth/${uuid}/verify`,
				data,
				{
					withCredentials: true,
				},
			);
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
	});
};

export const VerifyForm = () => {
	const { mutate } = useVerifyMutation();
	const { uuid } = useParams();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			otp: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		mutate(data);
	}

	return (
		<div className="p-4 mt-[10px] md:w-[500px] h-full shadow-xl rounded-md flex flex-col justify-between items-center bg-slate-200 text-black">
			<h2 className="font-Gloock text-start text-2xl cursor-default">
				getmylinks
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-center p-4 h-2/4 md:mt-[60px]"
				>
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-between h-full ">
								<div className="flex flex-col items-start space-x-3 py-3">
									<div className="flex flex-col items-center space-x-3">
										<MailCheck />
										<FormLabel className="text-xl font-heading font-normal text-center mx-auto">
											Please enter the 6 digits code
										</FormLabel>
									</div>
									<FormDescription>
										We've sent you Verification code on{" "}
										<strong className="text-black">
											dhanwansingh@gmail.com
										</strong>
									</FormDescription>
									<p></p>
								</div>

								<FormControl className="px-2">
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
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
				<Button
					type="submit"
					className="bg-[#0069FE] text-white hover:bg-[#0050d2] my-3"
				>
					Continue
				</Button>
			</Form>

			<div className="flex flex-col justify-end items-start w-full h-full text-sm">
				<a href="/resend-again" className="text-blue-800 leading-5">
					Did'nt recieved code?
				</a>
			</div>
		</div>
	);
};
