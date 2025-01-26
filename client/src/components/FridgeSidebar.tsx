import { useState } from "react";
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
const fridgeItems = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Eggs" },
  { id: 3, name: "Cheese" },
];

type IIngredient = {
  id: string;
  name: string;
};
export const FridgeSidebar = () => {
  const [result, setResult] = useState<string[]>([]);

  const handleSearch = (query: string): void => {
    const searchTerm = query.toLowerCase();
    setResult(searchTerm);
  };

  return (
    <Sidebar side="left" className="z-10 mt-24">
      <SidebarTrigger className="absolute right-0 top-4 translate-x-full" />
      <SidebarHeader />
      <SidebarContent className="p-4">
        <SidebarGroupLabel className="text-xl">Fridge</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="mb-6">
            <SearchFridge onSearch={handleSearch} />
            {/* <SearchFridgeResults results={result}> */}
          </div>
          <ul className="space-y-2">
            {fridgeItems.map((item) => (
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
