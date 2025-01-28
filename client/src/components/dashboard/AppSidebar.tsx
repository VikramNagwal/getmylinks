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
import {
	Settings,
	Link,
	BarChart2,
	User,
} from "lucide-react";


const data = {
			items: [
				{
					title: "Short links",
					url: "/short-links",
					icon: <Link />,
				},
				{
					title: "Analytics",
					url: "/:url/analytics",
					icon: <BarChart2 />,
				},
				{
					title: "Settings",
					url: "/settings",
					icon: <Settings />,
				},
				{
					title: "Profile",
					url: "/profile",
					icon: <User />,
				},
			],
		}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
            <SidebarMenu className="mx-auto" key={item.url}>
              <SidebarMenuItem key={item.title} className="px-2">
                <a href={item.url} key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-[#3FCF8E] p-5 border font-sans`}
					key={item.title}
                  >
                    {item.icon}{" "}{item.title}
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
