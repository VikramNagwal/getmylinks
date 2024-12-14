import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <header>
      <Button variant={"secondary"} className="mx-2">
        Sign Up
      </Button>
      <Button type="button" className="mx-2">
       Login
      </Button>
    </header>
  );
};

export default AuthButtons;
