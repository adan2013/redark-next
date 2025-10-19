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
 * Processes image and video paths in MDX content to handle relative paths
 * @param content - MDX content string
 * @param year - Post year for resolving relative image paths
 * @returns Processed MDX content with resolved image paths
 */
export function processImagePaths(content: string, year: string): string {
  // Replace relative image and video paths with absolute paths
  // Example: ./images/102.jpg -> /posts/2021/images/102.jpg
  // Example: ../2020/images/photo.jpg -> /posts/2020/images/photo.jpg
  // Example: file='images/video.mp4' -> file='posts/2019/images/video.mp4'
  return (
    content
      // Handle cross-year references (../YEAR/images/)
      .replace(
        /!\[([^\]]*)\]\(\.\.\/(\d{4})\/images\//g,
        `![$1](/posts/$2/images/`
      )
      .replace(/src="\.\.\/(\d{4})\/images\//g, `src="/posts/$1/images/`)
      .replace(/src='\.\.\/(\d{4})\/images\//g, `src='/posts/$1/images/`)
      .replace(/file="\.\.\/(\d{4})\/images\//g, `file="/posts/$1/images/`)
      .replace(/file='\.\.\/(\d{4})\/images\//g, `file='/posts/$1/images/`)
      // Handle current year references (./images/ or images/)
      .replace(/!\[([^\]]*)\]\(\.\/images\//g, `![$1](/posts/${year}/images/`)
      .replace(/!\[([^\]]*)\]\(images\//g, `![$1](/posts/${year}/images/`)
      .replace(/src="\.\/images\//g, `src="/posts/${year}/images/`)
      .replace(/src="images\//g, `src="/posts/${year}/images/`)
      .replace(/src='\.\/images\//g, `src='/posts/${year}/images/`)
      .replace(/src='images\//g, `src='/posts/${year}/images/`)
      .replace(/file="\.\/images\//g, `file="/posts/${year}/images/`)
      .replace(/file="images\//g, `file="/posts/${year}/images/`)
      .replace(/file='\.\/images\//g, `file='/posts/${year}/images/`)
      .replace(/file='images\//g, `file='/posts/${year}/images/`)
  );
}
