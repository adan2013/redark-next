import { ReactNode } from "react";

interface GoodListProps {
  children: ReactNode;
}

const GoodIcon = () => (
  <svg
    className="inline-block h-4 w-4 mr-2.5"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#22c55e" />
    <path
      d="M5 8L7 10L11 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function GoodList({ children }: GoodListProps) {
  const childrenString = String(children);
  const items = childrenString.split("- ");
  items.shift(); // Remove first empty element

  return (
    <ul className="list-none py-[5px] px-0 pl-5 m-0">
      {items.map((item, i) => (
        <li key={i} className="mb-1.5">
          <GoodIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
