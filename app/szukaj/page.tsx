import Script from "next/script";
import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...commonPageMetadata.search,
};

export default function Szukaj() {
  return (
    <div>
      <h1>Szukaj</h1>

      <Script
        src="https://cse.google.com/cse.js?cx=7d15a51de45c91772"
        strategy="afterInteractive"
      />

      <div className="gcse-search mt-6" />
    </div>
  );
}
