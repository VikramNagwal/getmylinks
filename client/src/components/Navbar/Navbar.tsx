import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const {isAuthenticated} = useKindeAuth()
  return (
    <nav className="px-2 md:px-4 py-2 mt-2 max-w-[1280px] mx-auto rounded-full border border-separate border-black dark:border-white">
      <div className="flex justify-between items-center px-2 py-1">
        <h1 className="text-lg">say2wall</h1>
        <div>
          <ul className="hidden md:flex space-x-6">
            <li>Who are we?</li>
            <li>How it works</li>
            <li>Resources</li>
          </ul>
        </div>
        <AuthButtons isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};

export default Navbar;