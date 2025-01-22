import { RecipeSidebar } from "@/components/RecipeSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />

      <SidebarProvider>
        <RecipeSidebar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </>
  );
};

export default RootLayout;
