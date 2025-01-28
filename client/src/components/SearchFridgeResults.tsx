import { useAppContext } from "@/context/AppContext";
import { IIngredient } from "@/types/ingredient";

type Props = {
  results: IIngredient[];
};

export default function SearchFridgeResults({ results }: Props) {
  const { addToFridge } = useAppContext();

  const handleAddToFridge = async (id: string) => {
    try {
      addToFridge([id]);
    } catch (error) {
      console.error(`Cannot add ingredient to Fridge-${error}`);
    }
  };

  // if ((results.length === 0)) return <div>Ingredient does not exist...</div>;
  return (
    <div>
      {results.map((result) => (
        <li
          key={result._id}
          className="hover:bg-slate-400 hover:cursor-pointer"
        >
          <button onClick={() => addToFridge([result._id])}>
            {result.name}
          </button>
        </li>
      ))}
    </div>
  );
}
