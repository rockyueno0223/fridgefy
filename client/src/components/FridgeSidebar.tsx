import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import SearchFridge from "./SearchFridge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "./ui/sidebar";



// test data
// const fridgeItems = [
//   { id: 1, name: "Milk" },
//   { id: 2, name: "Eggs" },
//   { id: 3, name: "Cheese" },
// ];

export const FridgeSidebar = () => {

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  const { fridge } = context;


  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {

  //       const res = await fetch(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`
  //       );
  //       if (!res.ok) {
  //         throw new Error("Recipes not found");
  //       }
  //       const data = await res.json();

  //     };
  //     fetchRecipes();
  //   }
  // }, [])



  return (
    <Sidebar side="left" className="z-10 mt-24">
      <SidebarTrigger className="absolute right-0 top-4 translate-x-full" />
      <SidebarHeader />
      <SidebarContent className="p-4">
        <SidebarGroupLabel className="text-xl">Fridge</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="mb-6">
            <SearchFridge />
          </div>
          <ul className="space-y-2">
            {fridge.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <button>&#215;</button>
              </li>
            ))}
          </ul>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
