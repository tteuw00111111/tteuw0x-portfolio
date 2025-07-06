import React, { JSX } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export const ContactButton = ({ text }: { text: string }): JSX.Element => {
  return (
    <motion.a
      href="#contato"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="
        flex items-center justify-center gap-3
        py-6 px-8
        rounded-full
        font-poppins font-semibold text-lg text-white
        bg-gradient-to-r from-[#D1001C] to-[#6B000E]
        bg-[length:500%_auto]
        hover:bg-[position:right_center]
        shadow-lg black
        cursor-pointer
        transition-all duration-400 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-75
      "
    >
      <span>{text}</span>
      <FaPaperPlane />
    </motion.a>
  );
};
