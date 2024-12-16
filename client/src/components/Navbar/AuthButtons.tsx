import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "../ui/button";
import UserProfile from "../Profile/UserProfile";
import Theme from "../../utils/ThemeProvider";


interface AuthButtonsProps {
  isAuthenticated: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({isAuthenticated}) => {
  const { login, register } = useKindeAuth();


  return (
    <header className="flex items-center">
      {!isAuthenticated ? (
        <div>
          <Button
            variant={"secondary"}
            className="mx-2"
            onClick={() => register()}
          >
            Sign Up
          </Button>
          <Button type="button" className="mx-2" onClick={() => login()}>
            Login
          </Button>
        </div>
      ) : 
        <UserProfile />
      }
      <Theme />
    </header>
  );
};

export default AuthButtons;
