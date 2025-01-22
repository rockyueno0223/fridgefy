import { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search= ({ onSearch }:SearchProps ) => {
  return (
    <div className="relative max-w-md mx-auto mb-6">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search recipes..."
        className="pl-10 w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;