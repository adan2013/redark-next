import { getPaginatedPostsByTag, getAllTags, getPostsByTag } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import slugify from "slugify";
import postConfig from "@/lib/post-config.json";
import { generatePageTitle, generatePageDescription } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ tag: string; page?: string[] }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const params: { tag: string; page?: string[] }[] = [];

  for (const tag of tags) {
    const tagSlug = slugify(tag, { lower: true });
    const { totalPages } = getPaginatedPostsByTag(tagSlug, 1, 10);
    params.push({ tag: tagSlug }); // For first page
    for (let i = 2; i <= totalPages; i++) {
      params.push({ tag: tagSlug, page: [String(i)] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag, page: pageParam } = await params;
  const pageNum = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: "Tag not found",
    };
  }

  const tagName = postConfig.tags.find(
    (t) => slugify(t, { lower: true }) === tag
  );

  if (pageNum === 1) {
    return {
      title: generatePageTitle(`#${tagName}`),
      description: generatePageDescription(
        `Artykuły z tagiem ${tagName} na Redark.pl`
      ),
    };
  }

  return {
    title: generatePageTitle(`#${tagName} - Strona ${pageNum}`),
    description: generatePageDescription(
      `Artykuły z tagiem ${tagName} - strona ${pageNum}`
    ),
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag, page: pageParam } = await params;
  const page = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage, hasNextPage, hasPreviousPage } =
    getPaginatedPostsByTag(tag, page, 10);

  if (posts.length === 0 || page > totalPages) {
    notFound();
  }

  const tagName = postConfig.tags.find(
    (t) => slugify(t, { lower: true }) === tag
  );

  return (
    <div>
      <header className="mb-8">
        <h1>
          Tag: {tagName}
          {currentPage > 1 && ` - Strona ${currentPage}`}
        </h1>
      </header>

      <div className="mb-8">
        <PostGrid posts={posts} />
      </div>

      {/* Pagination */}
      <div className="mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          getPageUrl={(pageNum) =>
            pageNum === 1 ? `/tag/${tag}` : `/tag/${tag}/${pageNum}`
          }
        />
      </div>
    </div>
  );
}
