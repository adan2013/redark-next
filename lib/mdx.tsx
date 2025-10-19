import { compileMDX } from "next-mdx-remote/rsc";
import { ReactNode } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkRawContent from "./remark-raw-content";

// Import custom MDX components
import { MDXComponents } from "@/components/mdx/MDXComponents";

export interface MDXCompileResult {
  content: ReactNode;
  frontmatter: Record<string, any>;
}

/**
 * Compiles MDX content with custom components and plugins
 * @param source - Raw MDX string content
 * @param components - Optional custom components to override defaults
 * @returns Compiled MDX content and frontmatter
 */
export async function compileMDXContent(
  source: string,
  components?: Record<string, React.ComponentType<any>>
): Promise<MDXCompileResult> {
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          // Preserve raw string content for specific components
          remarkRawContent,
          // GitHub Flavored Markdown support (tables, strikethrough, etc.)
          remarkGfm,
        ],
        rehypePlugins: [
          // Syntax highlighting for code blocks
          rehypeHighlight,
          // Add IDs to headings
          rehypeSlug,
        ],
      },
    },
    components: {
      ...MDXComponents,
      ...components, // Allow overriding default components
    },
  });

  return {
    content,
    frontmatter,
  };
}

/**
 * Processes image paths in MDX content to handle relative paths
 * @param content - MDX content string
 * @param year - Post year for resolving relative image paths
 * @returns Processed MDX content with resolved image paths
 */
export function processImagePaths(content: string, year: string): string {
  // Replace relative image paths with absolute paths
  // Example: ./images/102.jpg -> /posts/2021/images/102.jpg
  return (
    content
      .replace(/!\[([^\]]*)\]\(\.\/images\//g, `![$1](/posts/${year}/images/`)
      .replace(/!\[([^\]]*)\]\(images\//g, `![$1](/posts/${year}/images/`)
      // Also handle JSX Image components
      .replace(/src="\.\/images\//g, `src="/posts/${year}/images/`)
      .replace(/src="images\//g, `src="/posts/${year}/images/`)
      // Handle img tags
      .replace(/src='\.\/images\//g, `src='/posts/${year}/images/`)
      .replace(/src='images\//g, `src='/posts/${year}/images/`)
  );
}
