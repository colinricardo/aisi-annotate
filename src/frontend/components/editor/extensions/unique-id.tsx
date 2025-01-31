import { IdPrefix, randomId } from "@shared/utils/ids";
import UniqueID from "@tiptap-pro/extension-unique-id";

type UniqueIdTypes =
  | "heading"
  | "paragraph"
  | "title"
  | "list"
  | "block"
  | "listItem"
  | "bulletListItem"
  | "orderedList"
  | "orderedListItem"
  | "span";

export const CustomUniqueId = UniqueID.configure({
  generateID: () => {
    return randomId({ prefix: IdPrefix.Block });
  },
  types: [
    "heading",
    "paragraph",
    "title",
    "list",
    "block",
    "listItem",
    "bulletListItem",
    "orderedList",
    "orderedListItem",
    "span",
  ] satisfies UniqueIdTypes[],
});
