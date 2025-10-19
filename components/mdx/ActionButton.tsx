import Link from "next/link";
import { ReactNode } from "react";

interface ActionButtonProps {
  to: string;
  children: ReactNode;
  download?: boolean | string;
}

export function ActionButton({ to, children, download }: ActionButtonProps) {
  const buttonClasses =
    "block mx-auto my-3 px-3 py-2 bg-[#d40000] border-3 border-[#d40000] rounded-lg max-w-[250px] text-center font-bold text-white no-underline transition-all duration-300 hover:bg-white hover:text-[#d40000]";

  const isExternal =
    (to && to.length >= 4 && to.substring(0, 4) === "http") || download;

  if (isExternal) {
    return (
      <a
        href={to}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={to} className={buttonClasses}>
      {children}
    </Link>
  );
}
