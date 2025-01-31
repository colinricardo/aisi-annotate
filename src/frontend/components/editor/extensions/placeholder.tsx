import Placeholder from "@tiptap/extension-placeholder";

export const CustomPlaceholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "title") {
      return "Untitled";
    }

    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    }

    if (node.type.name === "paragraph") {
      return "Select text to add annotations...";
    }

    return "";
  },
  showOnlyWhenEditable: true,
  includeChildren: false,
});
