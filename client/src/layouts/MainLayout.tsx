import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar"


interface AuthProviderProps {
    children: ReactNode;
}

const MainLayout: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>
        <h1>footer</h1>
      </footer>
    </>
  );
};

export default MainLayout