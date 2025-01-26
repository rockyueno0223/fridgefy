import { Ingredient } from "@/types/ingredient.type";

type Props = {
  results: Ingredient[];
};

export default function SearchFridgeResults({ results }: Props) {
  // if (results.length === 0) return <div>Ingredient does not exist...</div>;
  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <p>{result.name}</p>
        </div>
      ))}
    </div>
  );
}
