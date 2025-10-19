"use client";

import Image from "next/image";
import Link from "./Link";
import Navigation from "./Navigation";

import RedarkLogo from "@/assets/logo-header.png";

export default function Header() {
  return (
    <div className="sticky top-0 z-20 md:static bg-white">
      <header className="border-b-2 border-gray-500 h-[60px] md:border-b-0 md:h-auto">
        <div className="flex items-center h-full p-3 md:p-10">
          <Link href="/" variant="none">
            <Image
              src={RedarkLogo}
              alt="Redark Logo"
              className="block max-h-10 md:max-h-24 w-auto"
              priority
            />
          </Link>
        </div>
      </header>
      <Navigation />
    </div>
  );
}
