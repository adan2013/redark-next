import Widget from "@/components/Widget";
import CompactPostCard from "@/components/CompactPostCard";
import { getAllPosts } from "@/lib/posts";

export default function RandomPosts() {
  const allPosts = getAllPosts();

  // Shuffle array and take first 3
  const shuffledPosts = [...allPosts].sort(() => Math.random() - 0.5);
  const randomPosts = shuffledPosts.slice(0, 3);

  return (
    <Widget title="Losowe posty">
      <div className="p-1">
        {randomPosts.map((post) => (
          <CompactPostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            image={post.image}
          />
        ))}
      </div>
    </Widget>
  );
}
