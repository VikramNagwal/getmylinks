import Header from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LinkShortenForm from "@/components/forms/LinkShortenForm";


const Dashboard = () => {
  return (
    <SidebarProvider className="font-roboto">
      <AppSidebar />
      <SidebarInset>
        <Header />
        {/* childrens renders */}
        <div className="flex flex-1 flex-col gap-4 p-4">
			<LinkShortenForm />
		</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
