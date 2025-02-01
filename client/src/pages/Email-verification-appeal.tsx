
export const EmailVerificationAppealPage = () => {
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
        <img src="/images/mail.png" alt="email-verification" loading="lazy" className="w-[200px] h-[200px]" />
      </div>
    </div>
  );
}
