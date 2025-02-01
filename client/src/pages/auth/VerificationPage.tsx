import  VerifyForm  from "@/components/forms/VerifyForm";

const VerificationPage = () => {
  return (
    <div className="overflow-hidden h-screen">
      <div className="flex justify-between px-4 md:px-8 py-4 md:py-8">
        <div className="flex-1 shrink md:p-8 h-full">
          <VerifyForm />
        </div>
        <div className="flex-1 hidden justify-center md:flex z-10">
          <img
            src="../images/design.webp"
            alt="doodles"
            className="w-[500px] h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
