import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const polishMonths = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

export function formatPolishDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = polishMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
