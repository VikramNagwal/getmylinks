import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.get("http://localhost:8080/api/v1/auth/logout", {
				withCredentials: true,
			});
			toast({
				title: "we'll miss you 🥲",
			});
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
