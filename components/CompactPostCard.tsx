import Link from "next/link";
import Image from "next/image";
import { formatPolishDate } from "@/lib/utils";

interface CompactPostCardProps {
  slug: string;
  title: string;
  date: string;
  image?: string;
}

export default function CompactPostCard({
  slug,
  title,
  date,
  image,
}: CompactPostCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="block hover:bg-gray-200 rounded p-2 transition-colors"
    >
      <div className="flex gap-3">
        {image && (
          <div className="w-20 relative flex-shrink-0">
            <Image
              src={image}
              alt={title}
              width={800}
              height={370}
              className="object-cover rounded aspect-[800/370]"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold line-clamp-3 mb-1">
            {title}
          </span>
          <p className="text-xs text-gray-500">{formatPolishDate(date)}</p>
        </div>
      </div>
    </Link>
  );
}
