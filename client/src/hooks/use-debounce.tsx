import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay = 5000) {
  const [debounce, setDebounced] = useState<string>("");
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debounce;
}
