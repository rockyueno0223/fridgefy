import { FridgeSidebar } from "@/components/FridgeSidebar";
import { RecipeSidebar } from "@/components/RecipeSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="">
        <div className="flex">
          <SidebarProvider>
          <div className="bg-green-200 md:hidden fixed bottom-[30px] rounded-md left-4 z-1">
            <SidebarTrigger  />
          </div>          
            <RecipeSidebar />
          </SidebarProvider>
          
          <main className="">
            <Outlet />
          </main>
          <SidebarProvider>
          <div className="bg-green-200 md:hidden fixed bottom-[30px] rounded-md right-4 z-1 rotate-180">
            <SidebarTrigger  />
          </div>      
            <FridgeSidebar />
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;