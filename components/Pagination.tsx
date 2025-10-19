import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  getPageUrl: (pageNum: number) => string;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  getPageUrl,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center gap-2">
      {hasPreviousPage && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors w-10 h-10 flex items-center justify-center"
        >
          ←
        </Link>
      )}

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          // Show first few pages, current page with context, and last few pages
          const showPage =
            pageNum === 1 ||
            pageNum === totalPages ||
            Math.abs(pageNum - currentPage) <= 2;

          if (!showPage) {
            if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
              return (
                <span key={pageNum} className="px-2 py-1">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <Link
              key={pageNum}
              href={getPageUrl(pageNum)}
              className={cn(
                "px-3 py-2 border rounded transition-colors w-10 h-10 flex items-center justify-center",
                pageNum === currentPage
                  ? "bg-[#d40000] text-white border-black"
                  : "hover:bg-gray-50"
              )}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {hasNextPage && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors w-10 h-10 flex items-center justify-center"
        >
          →
        </Link>
      )}
    </nav>
  );
}
