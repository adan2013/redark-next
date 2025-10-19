"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import AutorImage from "@/assets/autor.jpg";
import Link from "@/components/Link";

const getMailText = () => (
  <Link
    href={[
      "mail",
      "to:",
      "re",
      "da",
      "rk",
      "pl",
      "@",
      "g",
      "ma",
      "il",
      ".",
      "co",
      "m",
    ].join("")}
  >
    {"redarkpl" + "@" + "gmail" + ".com"}
  </Link>
);

export default function Kontakt() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h1>Kontakt</h1>

      <h2>O mnie</h2>

      <div className="flex items-center mb-8 md:flex-row flex-col gap-3">
        <div className="flex-3 leading-relaxed">
          Cześć, nazywam się Daniel Alberski. Interesuję się elektroniką oraz
          programowaniem. Obecnie moją główną pasją jest druk 3D oraz projekty
          DIY. Redark jest miejscem, gdzie mogę rozwijać swoje pasje i dzielić
          się swoją wiedzą z innymi. Publikuję poradniki, testy urządzeń i
          narzędzi, a także dokumentuję własne projekty krok po kroku. Wcześniej
          blog skupiał się na tematyce komputerowej – składaniu, naprawie
          sprzętu oraz recenzjach elektroniki i gier.
        </div>

        <div className="flex-2 max-w-[380px] mb-4 md:mb-0 md:mr-6">
          <Image
            src={AutorImage}
            alt="autor redark.pl"
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      </div>

      <h2>Kontakt i współpraca</h2>

      <p>
        Kontakt możliwy za pomocą poczty elektronicznej lub portali
        społecznościowych podanych poniżej.
      </p>

      <ul className="list-none pt-6 m-0">
        {visible && <li className="mb-2">{getMailText()}</li>}
        {!visible && (
          <li className="mb-2">
            <button
              onClick={() => setVisible(true)}
              className="bg-white border border-red-600 rounded text-red-600 px-2 py-1 cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
            >
              (kliknij tutaj, aby odsłonić adres e-mail)
            </button>
          </li>
        )}
        {siteConfig.social.map((item) => (
          <li key={item.name} className="mb-2">
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
