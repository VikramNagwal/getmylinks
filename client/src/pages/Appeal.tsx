import { useEmail } from "@/app/context/email-context";
import { useAppSelector } from "@/app/hooks";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const EmailVerifyRequest = () => {
	const data = useAppSelector(state => state.auth);
	const { toast } = useToast();
	const { email } = useEmail()


	const handleResendEmail = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/auth/email/resend-otp`,
				email,
			);
			if (!response)
				return toast({
					title: "We are busy at the moment",
					description: "Please try again after some time",
				});

			return toast({
				title: `We have sent email on ${email}`,
				description: "Please check your email",
			});
		} catch (error) {
			return toast({
				title: "Something went wrong on our side",
			});
		}
	};
	return (
    <div className="flex flex-col items-center space-y-4 justify-center shrink p-4 md:p-8">
      <h1 className="font-heading text-3xl font-extrabold">Check your Email</h1>
      <div className="flex flex-col space-y-10 items-center">
        <h2 className="text-2xl">You are just one step away</h2>
        <div className="text-center text-lg font-thin">
          <p>We know its annoying but its ssential for your own security</p>
          <p className="font-thin opacity-90">
            We have sent you a Secret Code via email on your{" "}
            <span className="underline underline-offset-4 capitalize font-normal">{email}</span>
          </p>
        </div>
      </div>
      <div>
        <img
          src="/images/mail.png"
          alt="email-verification"
          loading="lazy"
          className="w-[200px] h-[200px]"
        />
      </div>
      <div className="md:mt-6 mt-4">
        <p className="leading-8 text-blue-600 md:text-lg text-thin">
          Did'nt recieved code?{" "}
          <button
            onClick={handleResendEmail}
            className="underline underline-offset-2"
          >
            Resend again
          </button>
        </p>
      </div>
    </div>
  );
};
