import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import LinkForm from "@/components/features/forms/LinkShortenForm";
import Header from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import SettingPage from "../settings/Settings";

export interface AllTabContentProps {
	shortlinks: JSX.Element;
	settings: JSX.Element;
}

const Dashboard = () => {
	const [activeTab, setActiveTab] =
		useState<keyof AllTabContentProps>("shortlinks");

	const allTabContent: AllTabContentProps = {
		shortlinks: <LinkForm />,
		settings: <SettingPage />,
	};
	return (
		<SidebarProvider className="font-roboto">
			<AppSidebar setActiveTab={setActiveTab} />
			<SidebarInset>
				<Header />
				{/* childrens renders */}
				<main className="flex flex-1 flex-col gap-4 p-4">
					{allTabContent[activeTab]}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Dashboard;
