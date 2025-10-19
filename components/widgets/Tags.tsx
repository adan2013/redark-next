import React from "react";
import Link from "next/link";
import Widget from "@/components/Widget";
import postConfig from "@/lib/post-config.json";
import slugify from "slugify";

export default function Tags() {
  const tags = postConfig.tags;

  return (
    <Widget title="Tagi">
      <div className="flex flex-wrap gap-2 justify-center items-center p-2">
        {tags.map((tag) => {
          const tagSlug = slugify(tag, { lower: true });

          return (
            <Link
              key={tag}
              href={`/tag/${tagSlug}`}
              className="text-sm text-gray-700 hover:text-red-600 transition-colors duration-200 my-[-3px]"
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </Widget>
  );
}
