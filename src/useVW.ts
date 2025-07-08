import { useEffect, useState } from "react";
export const useVW = () => {
  const [vw, setVw] = useState<number>(1920);
  useEffect(() => {
    const handler = () => setVw(window.innerWidth);
    handler(); // set on mount
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return vw;
};
