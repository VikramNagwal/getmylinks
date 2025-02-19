import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEmail } from "@/app/context/email-context";
import { userLogout } from "@/app/features/AuthSlicer";

const LogoutButton = () => {
	const { toast } = useToast();
	const { logout, username } = useEmail();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/api/v1/auth/logout`, {
				withCredentials: true,
			});
			console.log(res);
			toast({
				title: "Logout successful",
				description: `Goodbye ${username}`,
			});
			logout();
			dispatch(userLogout());
			return navigate("/");
		} catch (error) {
			return toast({
				title: "Logout failed!!!",
				description: "Something went wrong on our end",
				variant: "destructive",
			});
		}
	};
	return (
		<div>
			<Button onClick={handleLogout} variant="destructive">
				logout
			</Button>
		</div>
	);
};

export default LogoutButton;
