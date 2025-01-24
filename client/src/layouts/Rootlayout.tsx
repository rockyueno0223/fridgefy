import { FridgeSidebar } from "@/components/FridgeSidebar";
import { RecipeSidebar } from "@/components/RecipeSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header/Header";

const RootLayout = () => {

  const location = useLocation();
  const isRecipesOrShoppingList =
    location.pathname === "/recipes" || location.pathname === "/shoppinglist";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isRecipesOrShoppingList ? (
        <div className="flex">
          <SidebarProvider>
            <div className="bg-green-200 md:hidden fixed bottom-[30px] rounded-md left-4 z-50">
              <SidebarTrigger />
            </div>
            <FridgeSidebar />
          </SidebarProvider>

          <main className="">
            <Outlet />
          </main>

          <SidebarProvider>
            <div className="bg-green-200 md:hidden fixed bottom-[30px] rounded-md right-4 z-50">
              <SidebarTrigger className="rotate-180" />
            </div>
            {location.pathname === "/recipes" ? (
              <RecipeSidebar />
            ) : (
              // TODO Add items sidebar here
              <>sidebar</>
            )}
          </SidebarProvider>
        </div>
      ) : (
        <main className="">
          <Outlet />
        </main>
      )
      }
    </div>
  );

};

export default RootLayout;