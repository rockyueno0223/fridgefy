import { SearchIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

interface SearchProps {
  onSearch: (query: string) => void;
}

// const ingredients = async (value) => {
//   const res = await fetch(API_URL);
//   if (!res.ok) {
//     throw new Error("Unable to fech ingredients");
//   }
//   const data = await res.json();
//   return data;s
// };

export default function SearchFridge({ onSearch }: SearchProps) {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const getIngredientsByQuery = async (query: string) => {
      const res = await fetch(
        `http://localhost:3400/api/v1/ingredients/search?q=${query}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    };
    getIngredientsByQuery(input);
  }, [input]);

  const handleChange = (query: string) => {
    setInput(query);
  };

  console.log(input);

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
    </div>
  );
}
