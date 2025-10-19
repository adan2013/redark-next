import React from "react";
import Widget from "@/components/Widget";
import CompactPostCard from "@/components/CompactPostCard";
import { getAllPosts } from "@/lib/posts";

export default function NewPosts() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <Widget title="Najnowsze posty">
      <div className="p-1">
        {latestPosts.map((post) => (
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
