import { useEffect, useState } from "react";
//understand how the hook works
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
