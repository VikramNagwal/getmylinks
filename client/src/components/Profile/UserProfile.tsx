import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "../../components/ui/menubar";
import { useToast } from "../../hooks/use-toast";




const UserProfile = () => {
  const { user, logout } = useKindeAuth();
  const { toast } = useToast();

  function handleLogout() {
    logout();
      toast({
          varient: "success",
          title: `Sayonara, ${user?.given_name}`,
          description: `User has been logged out ${Date.now()}`,
        });
  }

  return (
    <div className="ml-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer border-none">
            <Avatar>
              <AvatarImage
                src={user?.picture || undefined}
              />
              <AvatarFallback>{user?.given_name}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Profile 
            </MenubarItem>
            {/* <MenubarSeparator /> */}
            <MenubarItem>Setting</MenubarItem>
            {/* <MenubarSeparator /> */}
            <MenubarItem>Share</MenubarItem>
            {/* <MenubarSeparator /> */}
            <MenubarItem onClick={handleLogout}>logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default UserProfile