import { FridgeSidebar } from "@/components/FridgeSidebar";
import { RecipeSidebar } from "@/components/RecipeSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />

      <SidebarProvider>
        <RecipeSidebar />
      </SidebarProvider>

      <Outlet />

      <SidebarProvider>
        <FridgeSidebar />
      </SidebarProvider>
    </>
  );
};

export default RootLayout;
