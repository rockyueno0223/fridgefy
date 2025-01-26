import useDebounce from "@/hooks/use-debounce";
import { IIngredient } from "@/types/ingredient";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import SearchFridgeResults from "./SearchFridgeResults";
import { Input } from "./ui/input";

export default function SearchFridge() {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<IIngredient[]>([]);

  const debouncedInput = useDebounce(input, 1000);

  // useEffect(() => {
  // const getIngredientsByQuery = async (query: string) => {
  //   const res = await fetch(
  //     `http://localhost:3400/api/v1/ingredients/search?q=${query}`
  //   );
  //   const data = await res.json();
  //   const ingredients = data.filter((ingredient: Ingredient) =>
  //     ingredient.name.includes(query)
  //   );
  //   setResults(ingredients);
  // };
  // getIngredientsByQuery(debouncedInput);
  // }, [debouncedInput]);

  const handleChange = (query: string) => {
    setInput(query);
  };

  return (
    <div className="max-w-md mx-auto mb-6 mt-4">
      <div className="flex items-center w-full bg-white border rounded-md">
        <div className="pl-3 text-gray-400">
          <SearchIcon />
        </div>
        <Input
          type="search"
          placeholder="Search ingredients..."
          className="flex-1 border-none focus:ring-0 focus:outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e.target.value);
          }}
        />
      </div>
      <div>
        <SearchFridgeResults results={results} />
      </div>
    </div>
  );
}
