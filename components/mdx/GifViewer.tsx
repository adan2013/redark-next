import { ReactNode } from "react";

interface GifViewerProps {
  children: ReactNode;
}

export function GifViewer({ children }: GifViewerProps) {
  const childrenString = String(children);
  const altStart = childrenString.indexOf("[");
  const altEnd = childrenString.indexOf("]");
  const linkStart = childrenString.indexOf("(");
  const linkEnd = childrenString.indexOf(")");

  const link = childrenString.substring(linkStart + 1, linkEnd);

  // Ensure path starts with single slash
  const url = link.startsWith("/") ? link : `/${link}`;

  const computedData = {
    alt: childrenString.substring(altStart + 1, altEnd),
    link: url,
  };

  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: "0", marginBottom: "-8px" }}
      >
        <img src={url} alt={computedData.alt} style={{ width: "100%" }} />
      </a>
    </div>
  );
}
