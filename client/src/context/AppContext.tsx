import { IUser } from "@/types/user";
import { createContext, useContext } from "react";

type AppContextType = {
  user: IUser | null;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
