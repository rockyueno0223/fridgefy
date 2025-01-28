import { useAppContext } from "@/context/AppContext";
import { Refrigerator } from "lucide-react";
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
// const CartItems = [
//     { id: 1, name: "Milk" },
//     { id: 2, name: "Eggs" },
//     { id: 3, name: "Cheese" },
// ];

export const CartSidebar = () => {
  const { user, removeFromCart, addToFridge } = useAppContext();

  const handleMoveFromCartToFridge = async (id: string) => {
    try {
      await removeFromCart([id]);
      await addToFridge([id]);
    } catch (error) {
      console.error(`Cannot add ingredient to Fridge-${error}`);
    }
  };

  const handleRemoveCart = async (id: string) => {
    try {
      await removeFromCart([id]);
    } catch (error) {
      console.error(`Cannot remove ingredient to Cart-${error}`);
    }
  };
  return (
    <Sidebar className="z-10 mt-24" side="right">
      <SidebarHeader />
      <SidebarTrigger className="absolute left-0 top-4 -translate-x-full rotate-180" />
      <SidebarContent className="p-4">
        <SidebarGroupLabel className="text-xl">Cart</SidebarGroupLabel>
        <SidebarGroupContent>
          <ul className="space-y-2">
            {user &&
              user.cart.length > 0 &&
              user.cart.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>{item.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMoveFromCartToFridge(item._id)}
                    >
                      <Refrigerator className="w-4 text-gray-500 hover:text-[#a5d2a1]" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-400 transition-colors px-2 text-xl"
                      onClick={() => handleRemoveCart(item._id)}
                    >
                      &#215;
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
