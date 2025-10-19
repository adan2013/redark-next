import Image from "next/image";
import { ReactNode } from "react";
import { GifViewer } from "./GifViewer";

interface GalleryProps {
  children: ReactNode;
  width?: string;
}

interface ImageData {
  alt: string;
  link: string;
}

export function Gallery({ children, width }: GalleryProps) {
  const childrenString = String(children);
  const rawData = childrenString.split("!");
  rawData.shift(); // Remove first empty element

  const computedData: ImageData[] = rawData.map((img) => {
    const altStart = img.indexOf("[");
    const altEnd = img.indexOf("]");
    const linkStart = img.indexOf("(");
    const linkEnd = img.indexOf(")");
    const link = img.substring(linkStart + 1, linkEnd);

    // Ensure path starts with single slash
    const normalizedLink = link.startsWith("/") ? link : `/${link}`;

    return {
      alt: img.substring(altStart + 1, altEnd),
      link: normalizedLink,
    };
  });

  const maxInRow = width ? parseInt(width) : 99;

  const chunk = <T,>(arrayObject: T[], size: number): T[][] => {
    return ([] as T[][]).concat.apply(
      [],
      arrayObject.map((_, i) => {
        return i % size ? [] : [arrayObject.slice(i, i + size)];
      })
    );
  };

  const rowsWithImages = chunk(computedData, maxInRow);

  return (
    <div>
      {rowsWithImages.map((row, rowId) => (
        <div key={rowId} className="flex items-center">
          {row.map((img) => {
            const isGif = img.link.toLowerCase().indexOf(".gif") >= 0;

            return (
              <div
                key={img.link}
                className="m-2 flex-1 max-md:w-full max-md:mx-auto max-md:text-center max-md:max-w-[50vw]"
              >
                {isGif ? (
                  <GifViewer>{`![${img.alt}](${img.link})`}</GifViewer>
                ) : (
                  <a
                    href={img.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b-0"
                  >
                    <Image
                      src={img.link}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded border-[3px] border-gray-200 max-md:border-[5px]"
                    />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
