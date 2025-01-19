
const PhonePreview = (user: any) => {
    const { username, avatar } =  user.data
  return (
    <section className="flex justify-center items-center h-screen">
      <figure className="border ring-4 ring-slate-300 rounded-3xl w-[77.8mm] h-[160.09mm]">
        <div className="w-4 h-4 rounded-full bg-white bg-opacity-20 ring-2 ring-slate-700 ml-3 my-3" />
        <div className="flex flex-col justify-center items-center space-y-4 mt-[40px]">
          <img
            src={avatar}
            alt="avatar"
            className="w-16 h-16 object-cover ring-1 ring-green-500 rounded-full shadow-md"
          />
          <span className="font-heading">@{username}</span>
        </div>
      </figure>
    </section>
  );
}

export default PhonePreview