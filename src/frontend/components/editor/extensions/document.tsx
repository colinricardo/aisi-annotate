import Document from "@tiptap/extension-document";

// ensure a title block cause it's cool
export const CustomDocument = Document.extend({
  content: "title block*",
});
