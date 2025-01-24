import { AppSidebar } from "@/components/dashboard/AppSidebar";
import ShortnForm from "@/components/forms/ShortnForm";
import { ModeToggle } from "@/components/Mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

const Dashboard = () => {
	return (
		<SidebarProvider className="font-roboto">
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<ModeToggle />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<ShortnForm />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Dashboard;
