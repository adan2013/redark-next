import fs from "fs";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";

export interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  image: string;
  categories: string[];
  tags: string[];
  relatedPosts: string[];
}

export interface Post extends PostMetadata {
  content: string;
  filePath: string;
  year: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (item.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function resolveImagePath(
  imagePath: string,
  postFilePath: string
): string {
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("./") || imagePath.startsWith("../")) {
    const match = postFilePath.match(/posts[\/\\](\d{4})[\/\\]/);

    if (imagePath.startsWith("./")) {
      if (match) {
        const year = match[1];
        const relativeImagePath = imagePath.slice(2); // Remove "./"
        return `/posts/${year}/${relativeImagePath}`;
      }
    } else if (imagePath.startsWith("../")) {
      // Parent directory: "../2021/images/102.jpg" -> "/posts/2021/images/102.jpg"
      const relativeImagePath = imagePath.slice(3); // Remove "../"
      return `/posts/${relativeImagePath}`;
    }
  }

  return imagePath;
}

export function getPostByFilePath(filePath: string): Post {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const metadata = data as PostMetadata;

  const resolvedImage = metadata.image
    ? resolveImagePath(metadata.image, filePath)
    : metadata.image;

  const yearMatch = filePath.match(/posts[\/\\](\d{4})[\/\\]/);
  const year = yearMatch
    ? yearMatch[1]
    : new Date(metadata.date).getFullYear().toString();

  return {
    ...metadata,
    image: resolvedImage,
    content,
    filePath,
    year,
  };
}

export function getAllPosts(): Post[] {
  const mdxFiles = getAllMdxFiles(postsDirectory);

  const posts = mdxFiles.map((filePath) => getPostByFilePath(filePath));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllPostSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => {
    const postCategorySlugs = post.categories.map((category) =>
      slugify(category, { lower: true })
    );
    return postCategorySlugs.includes(categorySlug);
  });
}

export function getPostsByTag(tagSlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => {
    const postTagSlugs = post.tags.map((tag) => slugify(tag, { lower: true }));
    return postTagSlugs.includes(tagSlug);
  });
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    post.categories.forEach((category) => categories.add(category));
  });

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getPaginatedPosts(
  page: number = 1,
  limit: number = 10
): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function getPaginatedPostsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10
): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const allPosts = getPostsByCategory(category);
  const totalPages = Math.ceil(allPosts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function getPaginatedPostsByTag(
  tag: string,
  page: number = 1,
  limit: number = 10
): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const allPosts = getPostsByTag(tag);
  const totalPages = Math.ceil(allPosts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function getRelatedPosts(currentPost: Post, limit: number = 4): Post[] {
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    const sharedCategories = post.categories.filter((cat) =>
      currentPost.categories.includes(cat)
    );
    score += sharedCategories.length * 3;

    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 2;

    if (currentPost.relatedPosts.includes(post.slug)) {
      score += 5;
    }

    return { post, score };
  });

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
