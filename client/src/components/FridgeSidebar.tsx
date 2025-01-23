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

export const FridgeSidebar = () => {
  return (
      <Sidebar side="right"
      className="z-10 mt-24"
    >
      <div className=" bg-green-200 bottom-[30px] rounded-md">
        <SidebarTrigger className="absolute left-0 top-4 -translate-x-full rotate-180" />
      </div>
        <SidebarHeader />
        <SidebarContent className="p-4">
          <SidebarGroupLabel className="text-xl">Fridge</SidebarGroupLabel>
          <SidebarGroupContent>
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
