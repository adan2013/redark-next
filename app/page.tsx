import { getPaginatedPosts } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";
import { Metadata } from "next";
import { commonPageMetadata } from "@/lib/seo";
import { ActionButton } from "@/components/mdx/ActionButton";

export const metadata: Metadata = {
  ...commonPageMetadata.home,
};

export default function Home() {
  const { posts, totalPages } = getPaginatedPosts(1, 10);
  const hasMorePages = totalPages > 1;

  return (
    <div>
      <h1>Nowe wpisy</h1>
      <div className="my-8">
        <PostGrid posts={posts} />
      </div>
      {hasMorePages && <ActionButton to="/blog/2">Pokaż więcej</ActionButton>}
    </div>
  );
}
