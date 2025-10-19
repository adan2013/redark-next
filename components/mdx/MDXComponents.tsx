import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

// Import custom MDX components
import { ActionButton } from "./ActionButton";
import { LayoutContainer } from "./LayoutContainer";
import { LayoutColumn } from "./LayoutColumn";
import { Gallery } from "./Gallery";
import { GifViewer } from "./GifViewer";
import { VideoViewer } from "./VideoViewer";
import { ImageDescription } from "./ImageDescription";
import { InfoBlock } from "./InfoBlock";
import { WarningBlock } from "./WarningBlock";
import { Quote } from "./Quote";
import { YouTube } from "./YouTube";
import { DownloadButton } from "./DownloadButton";
import { GoodList } from "./GoodList";
import { BadList } from "./BadList";
import { StarList } from "./StarList";
import { OkList } from "./OkList";
import { AdSense } from "./AdSense";
import { AssemblingPcFooter } from "./AssemblingPcFooter";
import Link from "@/components/Link";

// Custom components mapping for MDX
export const MDXComponents = {
  // Override default HTML elements
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <a
      href={(props.src as string) || ""}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-b-0"
    >
      <Image
        src={props.src || ""}
        alt={props.alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-6 mx-auto max-w-[90%] border-10 border-gray-300"
        {...(props as any)}
      />
    </a>
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <Link href={props.href || ""} className="leading-normal">
      {props.children}
    </Link>
  ),
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
  h5: (props: ComponentPropsWithoutRef<"h5">) => <h5 {...props} />,
  h6: (props: ComponentPropsWithoutRef<"h6">) => <h6 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <div className="my-4 leading-relaxed" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="ml-4" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border-collapse border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-gray-100" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-gray-300 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const isInline = !props.className;

    if (isInline) {
      return (
        <code
          className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-red-600"
          {...props}
        />
      );
    }

    return <code {...props} />;
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-8 border-t-2 border-gray-200" {...props} />
  ),

  ActionButton,
  LayoutContainer,
  LayoutColumn,
  Gallery,
  GifViewer,
  VideoViewer,
  ImageDescription,
  InfoBlock,
  WarningBlock,
  Quote,
  YouTube,
  DownloadButton,
  GoodList,
  BadList,
  StarList,
  OkList,
  AdSense,
  AssemblingPcFooter,
};
