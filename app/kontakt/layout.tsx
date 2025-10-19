import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...commonPageMetadata.contact,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
