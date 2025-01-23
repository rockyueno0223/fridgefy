import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';



export const SearchInput = () => {
    return (
        <div className="flex w-full max-w-sm items-center border border-gray-300 rounded-lg px-2.5 py-1.5">
            <Search className="h-4 w-4 mr-2.5" />
            <Input type="search" placeholder={"Search..."} className="w-full focus:border-0 focus:ring-0" />
        </div>
    )
}
