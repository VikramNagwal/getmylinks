import Header from "@/components/features/dashboard/Header";
import { AppSidebar } from "@/components/features/dashboard/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SettingPage from "./Settings";
import { useState } from "react";
import LinkShortenForm from "@/components/features/forms/LinkShortenForm";

export interface AllTabContentProps {
	shortlinks: JSX.Element;
	settings: JSX.Element;
}

const Dashboard = () => {
	const [activeTab, setActiveTab] =
		useState<keyof AllTabContentProps>("shortlinks");

	const allTabContent: AllTabContentProps = {
		shortlinks: <LinkShortenForm />,
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
