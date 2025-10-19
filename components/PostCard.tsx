import Link from "next/link";
import Image from "next/image";
import { formatPolishDate } from "@/lib/utils";

export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  categories: string[];
  tags: string[];
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/${post.slug}`} className="block">
        {post.image && (
          <div className="aspect-[800/370] relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-3">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="bg-[#d40000] text-white px-2 py-1 rounded text-xs"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <span className="line-clamp-2 text-lg font-bold my-2">
            {post.title}
          </span>

          <p className="text-gray-600 text-sm">{formatPolishDate(post.date)}</p>
        </div>
      </Link>
    </article>
  );
}
