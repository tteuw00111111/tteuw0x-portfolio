"use client";

import { useState, useEffect } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This function will be called once the component mounts on the client
    const checkDevice = () => {
      // Per your requirement, mobile is any screen less than 768px
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load to set the initial state correctly
    checkDevice();

    // Add a listener for window resize events
    window.addEventListener("resize", checkDevice);

    // Cleanup the listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []); // The empty dependency array ensures this effect runs only on mount and unmount

  return { isMobile };
};

export default useResponsive;
