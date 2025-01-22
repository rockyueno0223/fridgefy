import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";

// test data
const recipes = [
  { id: 1, name: "Spaghetti" },
  { id: 2, name: "Pizza" },
  { id: 3, name: "Salad" },
];

export const RecipeSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="p-4">
        <SidebarGroupLabel className="text-xl">Recipes</SidebarGroupLabel>
        <SidebarGroupContent>
          <ul className="space-y-2">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="flex justify-between">
                <span>{recipe.name}</span>
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
