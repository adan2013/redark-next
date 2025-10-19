import Link from "@/components/Link";
import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...commonPageMetadata.series,
};

export default function Serie() {
  return (
    <div>
      <h1>Serie</h1>

      <h2>Główne serie</h2>
      <ul>
        <li>
          <Link href="/category/skladanie-pc">Składanie PC</Link> – seria
          zawierająca poradniki dotyczące procesu składania własnego komputera,
          a także wszelkie informacje objaśniające jego budowę oraz działanie
        </li>
        <li>
          <Link href="/category/podzespoly-i-urzadzenia">
            Podzespoły i urządzenia
          </Link>{" "}
          – seria zawiera objaśnienia parametrów podzespołów komputerowych oraz
          artykuły pomagające w wyborze pozostałych urządzeń (nie tylko do
          komputera)
        </li>
        <li>
          <Link href="/category/kompendium-wiedzy">KOMPendium wiedzy</Link> –
          seria zawierająca artykuły przekazujące podstawową wiedzę na temat
          komputerów i innych urządzeń komputerowych
        </li>
      </ul>

      <h2>Serie poboczne</h2>
      <ul>
        <li>
          <Link href="/category/diy">DIY</Link> – projekty DIY mojego autorstwa
        </li>
        <li>
          <Link href="/category/recenzje">Recenzje</Link> – seria zawierająca
          wszelkie recenzje produktów, które posiadam lub testowałem
        </li>
        <li>
          <Link href="/category/newsy">Newsy</Link> – zawiera wszystkie artykuły
          dotyczące aktualnych nowin ze świata IT
        </li>
      </ul>
    </div>
  );
}
