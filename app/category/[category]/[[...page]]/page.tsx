import {
  getPaginatedPostsByCategory,
  getAllCategories,
  getPostsByCategory,
} from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import slugify from "slugify";
import postConfig from "@/lib/post-config.json";

interface CategoryPageProps {
  params: Promise<{ category: string; page?: string[] }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: { category: string; page?: string[] }[] = [];

  for (const category of categories) {
    const categorySlug = slugify(category, { lower: true });
    const { totalPages } = getPaginatedPostsByCategory(categorySlug, 1, 10);
    params.push({ category: categorySlug }); // For first page
    for (let i = 2; i <= totalPages; i++) {
      params.push({ category: categorySlug, page: [String(i)] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category, page: pageParam } = await params;
  const pageNum = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    return {
      title: "Category not found",
    };
  }

  const categoryName = postConfig.categories.find(
    (c) => slugify(c, { lower: true }) === category
  );

  if (pageNum === 1) {
    return {
      title: `${categoryName} - Redark.pl`,
      description: `Artykuły z kategorii ${categoryName} na Redark.pl`,
    };
  }

  return {
    title: `${categoryName} - Strona ${pageNum} - Redark.pl`,
    description: `Artykuły z kategorii ${categoryName} - strona ${pageNum}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, page: pageParam } = await params;
  const page = pageParam?.[0] ? parseInt(pageParam[0], 10) : 1;

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage, hasNextPage, hasPreviousPage } =
    getPaginatedPostsByCategory(category, page, 10);

  if (posts.length === 0 || page > totalPages) {
    notFound();
  }

  const categoryName = postConfig.categories.find(
    (c) => slugify(c, { lower: true }) === category
  );

  return (
    <div>
      <header className="mb-8">
        <h1>
          Kategoria: {categoryName}
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
            pageNum === 1
              ? `/category/${category}`
              : `/category/${category}/${pageNum}`
          }
        />
      </div>
    </div>
  );
}
