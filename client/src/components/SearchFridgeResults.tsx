import { useAppContext } from "@/context/AppContext";
import { IIngredient } from "@/types/ingredient";

type Props = {
  results: IIngredient[];
  handleSetDefault: () => void;
};

export default function SearchFridgeResults({
  results,
  handleSetDefault,
}: Props) {
  const { addToFridge, checkUniqueCart } = useAppContext();

  const handleAddToFridge = async (id: string) => {
    try {
      checkUniqueCart([id])
      addToFridge([id]);
    } catch (error) {
      console.error(`Cannot add ingredient to Fridge-${error}`);
    }
  };

  // if ((results.length === 0)) return <div>Ingredient does not exist...</div>;
  return (
    <div className="bg-white mt-1 rounded-md shadow-sm">
      {results.map((result) => (
        <li
          key={result._id}
          className="hover:bg-[#a5d2a1] hover:cursor-pointer list-none rounded-md p-1 text-left"
        >
          <button
            onClick={() => {
              handleAddToFridge(result._id);
              handleSetDefault();
            }}
          >
            {result.name}
          </button>
        </li>
      ))}
    </div>
  );
}
