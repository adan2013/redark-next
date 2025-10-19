import Link from "@/components/Link";
import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...commonPageMetadata.components,
};

const list1 = [
  ["Chłodzenie", "/chlodzenie-komputera"],
  ["Dyski SSD M.2", "/dyski-ssd-m2"],
  ["Karty graficzne", "/karty-graficzne"],
  ["Napędy optyczne", "/napedy-optyczne"],
  ["Nośniki pamięci, dyski HDD i SSD", "/nosniki-pamieci-dyski-hdd-ssd"],
  ["Obudowy", "/obudowy-czesc-1"],
  ["Pamięci RAM", "/pamieci-ram"],
  ["Płyty główne", "/plyty-glowne-czesc-1"],
  ["Procesory", "/procesory"],
  ["Zasilacze", "/zasilacze"],
];

const list2 = [
  ["Drukarki", "/drukarki"],
  ["Głośniki", "/glosniki-komputerowe"],
  ["Klawiatury", "/klawiatury"],
  ["Monitory", "/monitory-czesc-1"],
  ["Myszy", "/myszy-komputerowe-czesc-1"],
  ["Routery domowe", "/jak-wybrac-router-domowy"],
  ["Słuchawki", "/sluchawki"],
];

export default function PodzespolyIUrzadzenia() {
  return (
    <div>
      <h1>Podzespoły i urządzenia</h1>

      <p>
        Poniżej znajduje się alfabetyczna lista wszystkich artykułów dotyczących
        doboru podzespołów i urządzeń. Są one częścią poradnika składania
        komputera typu PC.
      </p>

      <h2>Podzespoły jednostki centralnej</h2>
      <ul>
        {list1.map(([title, href]) => (
          <li key={title}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>

      <h2>Peryferia komputerowe</h2>
      <ul>
        {list2.map(([title, href]) => (
          <li key={title}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <Link href="/category/podzespoly-i-urzadzenia">
          Zobacz wszystkie z kategorii Podzespoły i urządzenia
        </Link>
      </div>
    </div>
  );
}
