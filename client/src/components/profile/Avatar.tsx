import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const UserAvatar = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <Avatar className="flex-shrink-0 mr-4">
      <AvatarImage
        className="w-10 h-10 rounded-full object-cover"
        src={avatarUrl}
        loading="lazy"
        alt="Avatar"
      />
      <AvatarFallback>Av</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
