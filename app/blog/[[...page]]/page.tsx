import { getPaginatedPosts } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import { generatePageTitle, generatePageDescription } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ page?: string[] }>;
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, 10);
  const params: { page?: string[] }[] = [
    {}, // For first page
  ];
  for (let i = 2; i <= totalPages; i++) {
    params.push({ page: [String(i)] });
  }
  return params;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const pageNum = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;

  if (pageNum === 1) {
    return {
      title: generatePageTitle("Blog"),
      description: generatePageDescription(
        "Wszystkie artykuły na Redark.pl - poradniki, recenzje i projekty DIY"
      ),
    };
  }

  return {
    title: generatePageTitle(`Blog - Strona ${pageNum}`),
    description: generatePageDescription(
      `Wszystkie artykuły na Redark.pl - strona ${pageNum}`
    ),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page: pageParam } = await params;
  const page = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage, hasNextPage, hasPreviousPage } =
    getPaginatedPosts(page, 10);

  if (posts.length === 0 || page > totalPages) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <h1>Wszystkie artykuły</h1>
      </header>
      <div className="lg:col-span-3">
        <div className="mb-8">
          <PostGrid posts={posts} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          getPageUrl={(pageNum) =>
            pageNum === 1 ? "/blog" : `/blog/${pageNum}`
          }
        />
      </div>
    </div>
  );
}
