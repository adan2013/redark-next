import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { Anton } from "next/font/google";
import { cn, formatPolishDate } from "@/lib/utils";
import slugify from "slugify";
import { compileMDXContent, processImagePaths } from "@/lib/mdx";
import Disqus from "@/components/Disqus";
import { siteConfig } from "@/lib/config";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

interface PostPageProps {
  params: Promise<{ postSlug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    postSlug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: `${post.title} - Redark.pl`,
    openGraph: {
      title: post.title,
      description: `${post.title} - Redark.pl`,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Post({ params }: PostPageProps) {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    notFound();
  }

  // Process image paths and compile MDX
  const processedContent = processImagePaths(post.content, post.year);
  const { content: mdxContent } = await compileMDXContent(processedContent);

  const relatedPosts = getRelatedPosts(post, 4);

  return (
    <article>
      {/* Post Header */}
      <header className="mb-3">
        <h1>{post.title}</h1>

        <div className={"flex flex-wrap gap-4 text-sm text-gray-600 mb-3"}>
          <time dateTime={post.date} className={cn(anton.className, "text-lg")}>
            {formatPolishDate(post.date)}
          </time>

          <div className="flex gap-2">
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/category/${slugify(category, { lower: true })}`}
                className="bg-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto"
            priority
          />
        )}
      </header>

      {/* Post Content */}
      <div>{mdxContent}</div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3>Tagi:</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${slugify(tag, { lower: true })}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-6 border-t">
          <h3>Powiązane artykuły</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-3">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}

      {/* Disqus Comments */}
      <Disqus
        postSlug={postSlug}
        postTitle={post.title}
        disqusUrl={siteConfig.disqusUrl}
      />
    </article>
  );
}
