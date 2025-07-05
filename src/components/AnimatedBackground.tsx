"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export const AnimatedBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,

    offset: ["start start", "end 50%"],
  });

  const angle = useTransform(scrollYProgress, [0, 1], [45, 135]);

  const backgroundImage = useMotionTemplate`linear-gradient(${angle}deg, #000000, #1E1E1E)`;

  return (
    <motion.div ref={mainRef} style={{ backgroundImage }}>
      {children}
    </motion.div>
  );
};
