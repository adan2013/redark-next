import React from "react";
import Link from "next/link";
import Widget from "@/components/Widget";
import postConfig from "@/lib/post-config.json";
import slugify from "slugify";

export default function Categories() {
  const categories = postConfig.categories;

  return (
    <Widget title="Kategorie">
      <div className="flex flex-col gap-1">
        {categories.map((category) => {
          const categorySlug = slugify(category, { lower: true });
          return (
            <Link
              key={category}
              href={`/category/${categorySlug}`}
              className="block hover:bg-gray-200 rounded py-1 px-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                <span className="text-xs text-gray-500">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Widget>
  );
}
