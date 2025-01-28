import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-6 mt-4">
      <div className="flex items-center w-full bg-white border rounded-md">
        <div className="pl-3 text-gray-400">
          <SearchIcon className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border-none focus:ring-0 focus:outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Search;
