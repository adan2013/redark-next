"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "./Link";
import { siteConfig } from "@/lib/config";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Navigation() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={anton.className}>
      {/* Desktop Navigation */}
      <nav className="w-full min-h-12 hidden md:block">
        <div className="list-none p-0 m-0 w-full h-full bg-gray-200 border-b-3 border-red-600 flex flex-wrap">
          {siteConfig.mainMenu.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              variant="none"
              nextLinkClassName="w-full"
              className="flex-auto relative float-left border-t border-l border-gray-300 first:border-l-0 group bg-gray-200 text-xl text-black block h-full leading-12 text-center transition-all duration-500 hover:text-white hover:bg-red-600 min-w-24"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`w-full min-h-12 md:hidden ${
          menuIsOpen ? "block" : "hidden"
        }`}
      >
        <ul className="list-none p-0 m-0 w-full bg-gray-200 border-b-2 border-red-600 absolute top-[60px] left-0 h-auto max-h-[calc(80vh-60px)] overflow-y-auto">
          {siteConfig.mainMenu.map((item) => (
            <li
              key={item.text}
              className="relative w-full h-auto border-l-0 bg-gray-200"
            >
              <Link
                href={item.link}
                variant="none"
                nextLinkClassName="w-full"
                className="block h-full leading-12 px-6 text-left text-black bg-gray-200 no-underline transition-all duration-500 hover:text-white hover:bg-red-600"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden absolute top-0 right-0 bg-red-600 text-white w-[60px] h-[60px] flex items-center justify-center cursor-pointer border-l-2 border-gray-500"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
    </div>
  );
}
