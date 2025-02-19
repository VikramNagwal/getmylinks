import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
	avatarUrl?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
	return (
		<Avatar className="flex-shrink-0 mr-4 cursor-pointer">
			<AvatarImage
				className="w-10 h-10 rounded-full object-cover"
				src={props.avatarUrl}
				loading="lazy"
				alt="Avatar"
			/>
			<AvatarFallback>Av</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
