import AuthButtons from "./AuthButtons"

const Navbar = () => {
  return (
    <nav className="px-4 md:px-6 py-2 mt-2 max-w-[1280px] mx-auto rounded-full border border-separate border-black">
      <div className="flex justify-between items-center px-2 py-1">
        <h1 className="text-lg">say2wall</h1>
        <div>
            <ul className="hidden md:flex space-x-6">
                <li>Who are we?</li>
                <li>How it works</li>
                <li>Resources</li>
            </ul>
        </div>
        <AuthButtons />
      </div>
    </nav>
  );
}

export default Navbar