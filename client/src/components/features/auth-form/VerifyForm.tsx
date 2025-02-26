import axios from "axios";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEmail } from "@/app/context/email-context";
import { useState } from "react";
import { z } from "zod";
import { generateRandomUid } from "@/utils/randomId";

const VerificationCodeSchema = z.object({
	otp: z.string().length(6),
});

type VerificationCodePageSchema = z.infer<typeof VerificationCodeSchema>;

const VerifyForm = () => {
	const [submitting, setSubmitting] = useState<boolean>(false);

	const { toast } = useToast();
	const { uuid } = useParams();
	const uid = generateRandomUid();
	const { email } = useEmail();

	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<VerificationCodePageSchema>({
		resolver: zodResolver(VerificationCodeSchema),
		defaultValues: {
			otp: undefined,
		},
	});

	const onFormSubmit = async (data: any) => {
		setSubmitting(true);
		try {
			const res = await axios.post(`/auth/${uuid}/verify`, data);
			if (!res) {
				return toast({
					title: "Verification Failed",
					variant: "destructive",
				});
			}

			toast({
				title: `Account Verified Successfully`,
				description: "Your account has been verified",
			});
			return navigate(`/admin`);
		} catch (error) {
			toast({
				title:
					error instanceof Error
						? error.message
						: (error as any)?.response?.data?.message || "Verification Failed",
				description: "Something went wrong on our side. Please try later",
				variant: "destructive",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col space-y-4 justify-center items-center shrink">
			<div className="my-4 flex flex-col items-center">
				<h1 className="font-heading font-semibold text-2xl md:text-4xl xl:text-6xl p-2">
					Verify your Account
				</h1>
				<p className="text-xl font-thin opacity-70">
					we have sent you 6 digits code via Email on <strong>{email}</strong>
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				className="flex flex-col space-y-6 my-6"
			>
				<div className="p-2 border-opacity-30 ring-2 ring-slate-400 ring-opacity-40 rounded-md">
					<Controller
						name="otp"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						)}
					/>
					{errors.otp && (
						<p className="text-red-500 text-sm">Please enter valid code</p>
					)}
				</div>
				<Button disabled={submitting} type="submit">
					verify
				</Button>
			</form>
		</div>
	);
};

export default VerifyForm;
