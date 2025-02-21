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
import { AllTabContentProps } from "@/pages/Dashboard";

const data = {
	items: [
		{ id: 1, title: "Short links", tab: "shortLinks", icon: <LinkIcon /> },
		{
			id: 2,
			title: "Analytics",
			tab: "analytics",
			icon: <BarChart2 />,
		},
		{
			id: 3,
			title: "Settings",
			tab: "settings",
			icon: <Settings />,
		},
		{
			id: 4,
			title: "Profile",
			tab: "profile",
			icon: <User />,
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
          className="font-Gloock md:text-2xl text-start p-3 text-pretty"
        >
          getmylinks
        </a>
      </SidebarHeader>
      <SidebarContent className="mt-8">
        {/* We create a SidebarGroup for each parent. */}
        {data.items.map((item) => (
          <SidebarGroupContent key={item.title}>
            <SidebarMenu className="mx-auto" key={item.id}>
              <SidebarMenuItem key={item.title} className="px-2">
                <div
                  key={item.title}
                  onClick={() =>
                    setActiveTab(
                      item.tab.toLowerCase() as keyof AllTabContentProps
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
