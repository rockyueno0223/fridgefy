import { useAppContext } from "@/context/AppContext";
import { ShoppingCart } from "lucide-react";
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
  const { user, addToCart, removeFromFridge } = useAppContext();

  const handleMoveFromFridgeToCart = async (id: string) => {
    try {
      await removeFromFridge([id]);
      await addToCart([id]);
    } catch (error) {
      console.error(`Cannot add ingredient to Cart-${error}`);
    }
  };

  const handleRemoveFridge = async (id: string) => {
    try {
      await removeFromFridge([id]);
    } catch (error) {
      console.error(`Cannot remove ingredient to Fridge-${error}`);
    }
  };

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
            {user &&
              user?.fridge.length > 0 &&
              user?.fridge.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>{item.name}</span>
                  <button onClick={() => handleMoveFromFridgeToCart(item._id)}>
                    <ShoppingCart />
                  </button>
                  <button onClick={() => handleRemoveFridge(item._id)}>
                    &#215;
                  </button>
                </li>
              ))}
          </ul>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
