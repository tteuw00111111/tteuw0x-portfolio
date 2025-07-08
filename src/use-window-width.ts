"use client";

import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Set the initial width
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};
