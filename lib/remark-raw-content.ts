import { visit } from "unist-util-visit";

const remarkRawContent = () => {
  return (tree: any) => {
    visit(tree, "mdxJsxFlowElement", (node: any, index, parent) => {
      const rawContentComponents = [
        "Gallery",
        "GifViewer",
        "GoodList",
        "ImageDescription",
        "ActionButton",
        "BadList",
        "StarList",
        "OkList",
      ];

      if (rawContentComponents.includes(node.name)) {
        const rawContent = extractRawText(node);

        if (rawContent) {
          node.children = [
            {
              type: "text",
              value: rawContent,
            },
          ];
        }
      }
    });
  };
};

function extractRawText(node: any): string {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "mdxJsxTextElement" && node.name === "br") {
    return "\n";
  }

  if (node.type === "list") {
    const listItems = node.children || [];
    return listItems.map((item: any) => extractRawText(item)).join("");
  }

  if (node.type === "listItem") {
    const text = node.children
      ? node.children.map((child: any) => extractRawTextInList(child)).join("")
      : "";
    return "- " + text.trim() + "\n";
  }

  if (node.type === "paragraph") {
    const text = node.children
      ? node.children.map(extractRawText).join("")
      : "";
    return text + "\n";
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractRawText).join("");
  }

  if (node.type === "image") {
    return `![${node.alt || ""}](${node.url || ""})`;
  }

  return "";
}

function extractRawTextInList(node: any): string {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "paragraph") {
    return node.children
      ? node.children.map(extractRawTextInList).join("")
      : "";
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractRawTextInList).join("");
  }

  return "";
}

export default remarkRawContent;
