import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

export default function App() {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
}
