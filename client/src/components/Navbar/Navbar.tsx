import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import AuthButtons from "./AuthButtons";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated } = useKindeAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="mx-2">
    <div className="px-2 md:px-4 py-2 mt-2 max-w-[1280px] mx-auto rounded-full border border-separate border-black dark:border-white">
      <div className="flex justify-between items-center px-2 py-1">
        <h1 className="text-lg">say2wall</h1>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>Who are we?</li>
            <li>How it works</li>
            <li>Resources</li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 md:hidden shadow-lg">
            <ul className="space-y-4">
              <li>Who are we?</li>
              <li>How it works</li>
              <li>Resources</li>
              <li>
                <AuthButtons isAuthenticated={isAuthenticated} />
              </li>
            </ul>
          </div>
        )}

        {/* Desktop Auth Buttons */}
        <div className="hidden md:block">
          <AuthButtons isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
