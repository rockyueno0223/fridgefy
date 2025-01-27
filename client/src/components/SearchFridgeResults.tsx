import { AppContext } from "@/context/AppContext";
import { IIngredient } from "@/types/ingredient";
import { useContext } from "react";

type Props = {
  results: IIngredient[];
};

export default function SearchFridgeResults({ results }: Props) {

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  const { addToFridge } = context;


  // if ((results.length === 0)) return <div>Ingredient does not exist...</div>;
  return (
    <div>
      {results.map((result) => (
        <li
          key={result.id}
          className="hover:bg-slate-400 hover:cursor-pointer"
        >
          <button onClick={() => addToFridge(result.id)}>{result.name}</button>
        </li>
      ))}
    </div>
  );
}
