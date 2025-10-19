import { ReactNode } from "react";

interface OkListProps {
  children: ReactNode;
}

const OkIcon = () => (
  <svg
    className="inline-block h-4 w-4 mr-2.5"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#000000" />
    <path
      d="M5 8L7 10L11 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function OkList({ children }: OkListProps) {
  const childrenString = String(children);
  const items = childrenString
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.substring(2).trim());

  return (
    <ul className="list-none py-[5px] px-0 pl-5 m-0">
      {items.map((item, i) => (
        <li key={i} className="list-none mb-1.5">
          <OkIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
