import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SettingPage = () => {
	return (
		<div>
			<div className="flex space-x-4 p-2 mb-4">
				<p>settings</p>
				<Separator orientation="vertical" />
			</div>
			<div className="flex flex-col space-y-6 px-4">
				<Label id="username">Username</Label>
				<Label id="email">Email</Label>
				<Label id="password">Password</Label>
				<Label id="theme">Theme</Label>
				<Label id="language">Language</Label>
			</div>
		</div>
	);
};

export default SettingPage;
