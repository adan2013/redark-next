import { visit } from "unist-util-visit";

/**
 * Remark plugin to preserve raw string content for specific MDX components
 * This prevents MDX from processing markdown inside these components
 */
const remarkRawContent = () => {
  return (tree: any) => {
    visit(tree, "mdxJsxFlowElement", (node: any, index, parent) => {
      // List of components that should receive raw string content
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
        // Extract raw text content from children
        const rawContent = extractRawText(node);

        if (rawContent) {
          // Replace children with a single text node containing raw content
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

/**
 * Recursively extract raw text from node and its children
 */
function extractRawText(node: any): string {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "mdxJsxTextElement" && node.name === "br") {
    return "\n";
  }

  // Handle list nodes - preserve markdown list syntax
  if (node.type === "list") {
    const listItems = node.children || [];
    return listItems.map((item: any) => extractRawText(item)).join("");
  }

  // Handle list item nodes - add "- " prefix
  if (node.type === "listItem") {
    const text = node.children
      ? node.children.map((child: any) => extractRawTextInList(child)).join("")
      : "";
    return "- " + text.trim() + "\n";
  }

  // Preserve newlines for paragraph nodes
  if (node.type === "paragraph") {
    const text = node.children
      ? node.children.map(extractRawText).join("")
      : "";
    return text + "\n";
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractRawText).join("");
  }

  // For image syntax, reconstruct the markdown
  if (node.type === "image") {
    return `![${node.alt || ""}](${node.url || ""})`;
  }

  return "";
}

/**
 * Extract raw text within list items (without adding extra newlines for paragraphs)
 */
function extractRawTextInList(node: any): string {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "paragraph") {
    // Inside lists, don't add newlines after paragraphs
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
