"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import { IconType } from "react-icons";

const contactData = [
  { icon: FaEnvelope, link: "mailto:tteuw021@proton.me" },
  { icon: FaGithub, link: "https://github.com/tteuw0x" },
  { icon: FaInstagram, link: "https://www.instagram.com/2tteuw/" },
  { icon: FaMapMarkerAlt, link: "https://maps.app.goo.gl/KDZgZNiJV5eJE9xn6" },
];

interface ContactItemProps {
  item: {
    icon: IconType;
    link: string;
  };
  dictionary: {
    title: string;
    value: string;
    button: string;
  };
}

const ContactItem: React.FC<ContactItemProps> = ({ item, dictionary }) => {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <Icon className="text-4xl text-red-700 mb-2" />
      <h3 className="text-3xl font-semibold text-stone-300">
        {dictionary.title}
      </h3>
      <p className="text-xl font-light text-stone-400">{dictionary.value}</p>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2"
      >
        <motion.button
          className="py-3 px-8 bg-gradient-to-r from-red-700 to-rose-950 text-white font-semibold rounded-[30px] shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dictionary.button}
        </motion.button>
      </a>
    </div>
  );
};

type ContactProps = {
  dictionary: {
    title: string;
    subtitle: string;
    items: { title: string; value: string; button: string }[];
  };
};

export const Contact: React.FC<ContactProps> = ({ dictionary }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 0.7], ["100px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.5, 1]);

  return (
    <section id="contato" className="py-24 sm:py-32 px-4" ref={targetRef}>
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center text-center gap-64"
        style={{ y, opacity }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-global-2 leading-tight">
            {dictionary.title}
          </h2>
          <p className="font-poppins font-light text-xl sm:text-2xl text-global-1 mt-2">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative w-full bg-gradient-to-r from-zinc-900/50 to-stone-900/50 rounded-[49px] shadow-[0px_4px_10px_rgba(0,0,0,0.25),inset_0px_0px_8px_rgba(255,255,255,0.05)] pt-28 p-8 sm:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-44 h-44">
              <Image
                src="/images/profile-placeholder.png"
                alt="Profile Picture"
                layout="fill"
                className="rounded-full object-cover border-4 border-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {contactData.map((item, index) => (
              <ContactItem
                key={index}
                item={item}
                dictionary={dictionary.items[index]}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
