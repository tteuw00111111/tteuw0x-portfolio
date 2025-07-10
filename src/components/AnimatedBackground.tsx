// src/components/AnimatedBackground.tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useIsMobile } from "@/useIsMobile";

export const AnimatedBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mainRef = useRef(null);
  const isMobile = useIsMobile();

  // --- HOOKS ARE CALLED UNCONDITIONALLY ---
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  const angle = useTransform(scrollYProgress, [0, 1], [45, 135]);
  const animatedBackgroundImage = useMotionTemplate`linear-gradient(${angle}deg, #000000, #1E1E1E)`;
  // -----------------------------------------

  return (
    <motion.div
      ref={mainRef}
      // We conditionally use the RESULT of the hooks, not the hooks themselves.
      style={{
        backgroundImage: isMobile
          ? "linear-gradient(90deg, #000000, #1E1E1E)"
          : animatedBackgroundImage,
      }}
    >
      {children}
    </motion.div>
  );
};
