import { Ingredient } from "@/types/ingredient.type";

type Props = {
  results: Ingredient[];
};

export default function SearchFridgeResults({ results }: Props) {
  // if ((results.length === 0)) return <div>Ingredient does not exist...</div>;
  return (
    <div>
      {results.map((result) => (
        <div
          key={result.id}
          className="hover:bg-slate-400 hover:cursor-pointer"
        >
          <p>{result.name}</p>
        </div>
      ))}
    </div>
  );
}
