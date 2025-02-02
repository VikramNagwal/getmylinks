import { useEmail } from "@/context/email-context";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const EmailVerificationAppealPage = () => {
	const { email } = useEmail()
	const { toast } = useToast()

	const handleResendEmail = async () => {
	try {
			const response = await axios.post("http:localhost:8080/api/v1/auth/request/resend-email", email)
			if (!response) return toast({
				title: "We are busy at the moment",
				description: "Please try again after some time"
			})

			return toast({
				title: `We have sent email on ${email}`,
				description: "Please check your email"
			})
	} catch (error) {
		 return toast({
			title: "Something went wrong on our side"
		 })
	}
	}
	return (
    <div className="flex flex-col items-center space-y-4 justify-center shrink p-4 md:p-8">
      <h1 className="font-heading text-3xl font-extrabold">Check your Email</h1>
      <div className="flex flex-col space-y-10 items-center font-passage">
        <h2 className="text-2xl">You are just one step away</h2>
        <div className="text-center text-lg font-thin">
          <p>We know its annoying but its ssential for your own security</p>
          <p>
            We have sent you a <span>Secret Code</span> via email on your
            registered email id
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
          <button onClick={handleResendEmail} className="underline underline-offset-2">
            Resend again
          </button>
        </p>
      </div>
    </div>
  );
};
