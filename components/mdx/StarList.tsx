import { ReactNode } from "react";

interface StarListProps {
  children: ReactNode;
}

const StarIcon = () => (
  <svg
    className="inline-block h-4 w-4 mr-2.5"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1L10.163 5.38197L15 6.13607L11.5 9.54918L12.326 14.364L8 12.118L3.674 14.364L4.5 9.54918L1 6.13607L5.837 5.38197L8 1Z"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
    />
  </svg>
);

export function StarList({ children }: StarListProps) {
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
          <StarIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
