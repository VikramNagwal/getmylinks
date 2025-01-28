import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/Header";
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";


const Dashboard = ({children}: {children: ReactNode}) => {

	return (
		<SidebarProvider className="font-roboto">
			<AppSidebar />
			<SidebarInset>
				<Header />
				{/* childrens renders */}
				<div className="flex flex-1 flex-col gap-4 p-4">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Dashboard;
