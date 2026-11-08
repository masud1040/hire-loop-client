import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/Dashboard_sidbar";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full flex-1 p-4 md:p-6 bg-[#050505] min-h-screen">
        <SidebarTrigger className="mb-4 text-white" /> 
        {children}
      </main>
    </SidebarProvider>
  )
};

export default Dashboardlayout;