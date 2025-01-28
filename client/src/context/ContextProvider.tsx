import { AppProvider } from "@/context/AppProvider";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AppProvider>{children}</AppProvider>;
};
