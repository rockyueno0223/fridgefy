import { FridgeSidebar } from "@/components/FridgeSidebar";
import { RecipeSidebar } from "@/components/RecipeSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <div className="flex">
          <SidebarProvider>
            <RecipeSidebar />
          </SidebarProvider>
          <main>
            <Outlet />
          </main>
          <SidebarProvider>
            <FridgeSidebar />
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
