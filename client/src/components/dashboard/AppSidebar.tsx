import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Settings, LinkIcon, BarChart2, User } from "lucide-react";
import { AllTabContentProps } from "@/views/dashboard/Dashboard";
import path from "path";
 
const data = {
	items: [
		{ id: 1, title: "Short links", tab: "shortLinks", icon: <LinkIcon /> },
		{
			id: 2,
			title: "Analytics",
			tab: "analytics",
			icon: <BarChart2 />,
			path: () => path.join("/dashboard", "analytics"),
		},
		{
			id: 3,
			title: "Settings",
			tab: "settings",
			icon: <Settings />,
			path: () => path.join("/dashboard", "settings"),
		},
		{
			id: 4,
			title: "Profile",
			tab: "profile",
			icon: <User />,
			Path: () => path.join("/dashboard", "profile"),
		},
	],
};

interface AppSidebarProps {
	setActiveTab: React.Dispatch<React.SetStateAction<keyof AllTabContentProps>>;
}

export function AppSidebar({
	setActiveTab,
	...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<a
					href="/"
					className="logo"
				>
					getmylinks
				</a>
			</SidebarHeader>
			<SidebarContent className="mt-8">
				
				{data.items.map((item) => (
					<SidebarGroupContent key={item.title}>
						<SidebarMenu className="mx-auto" key={item.id}>
							<SidebarMenuItem key={item.title} className="px-2">
								<div
									key={item.title}
									onClick={() =>
										setActiveTab(
											item.tab.toLowerCase() as keyof AllTabContentProps,
										)
									}
								>
									<SidebarMenuButton
										className={`hover:opacity-95 duration-300 ease-in-out p-5 border font-sans`}
										key={item.title}
									>
										{item.icon} {item.title}
									</SidebarMenuButton>
								</div>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
