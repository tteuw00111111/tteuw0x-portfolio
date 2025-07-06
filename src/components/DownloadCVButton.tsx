import React, { JSX } from "react";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

export const DownloadCVButton = ({ text }: { text: string }): JSX.Element => {
  return (
    <motion.a
      href="/path/to/your/curriculum.pdf"
      download
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        flex items-center justify-between
        w-full max-w-[300px] h-[110px]
        px-8
        rounded-2xl
        font-poppins font-semibold text-[#d0ccc6] text-3xl
        tracking-[-0.08em]
        bg-gradient-to-r from-[#831024] to-[#7B0217]
        shadow-[0px_2px_2px_#00000040]
        cursor-pointer
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-[#d0ccc6] focus:ring-opacity-50
      "
    >
      <span>{text}</span>
      <FaDownload className="text-2xl" />
    </motion.a>
  );
};
