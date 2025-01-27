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
const CartItems = [
    { id: 1, name: "Milk" },
    { id: 2, name: "Eggs" },
    { id: 3, name: "Cheese" },
];



export const CartSidebar = () => {
    return (
        <Sidebar className="z-10 mt-24" side="right">
            <SidebarHeader />
            <SidebarTrigger className="absolute left-0 top-4 -translate-x-full rotate-180" />
            <SidebarContent className="p-4">
                <SidebarGroupLabel className="text-xl">Cart</SidebarGroupLabel>
                <SidebarGroupContent>
                    <ul className="space-y-2">
                        {CartItems.map((item) => (
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

