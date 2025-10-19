import { getPaginatedPosts } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";
import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...commonPageMetadata.home,
};

export default function Home() {
  const { posts, totalPages } = getPaginatedPosts(1, 10);
  const hasMorePages = totalPages > 1;

  return (
    <div>
      <h1>Nowe wpisy</h1>
      <div className="mt-8">
        <PostGrid posts={posts} />

        {hasMorePages && (
          <div className="flex justify-center mt-8">
            <Link
              href="/blog/2"
              className="inline-block px-8 py-4 bg-[#d40000] text-white font-bold hover:bg-[#b30000] transition-colors shadow-md hover:shadow-lg"
            >
              Pokaż więcej
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
