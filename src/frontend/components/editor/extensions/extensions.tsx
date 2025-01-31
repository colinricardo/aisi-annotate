import {
  CustomBulletList,
  CustomEnterBulletList,
} from "@frontend/components/editor/extensions/bullet-list";

import { CustomDocument } from "@frontend/components/editor/extensions/document";
import { CustomGapCursor } from "@frontend/components/editor/extensions/gapcursor";
import { CustomHeading } from "@frontend/components/editor/extensions/heading";
import { CustomHighlight } from "@frontend/components/editor/extensions/highlight";
import { CustomMarkdown } from "@frontend/components/editor/extensions/markdown";
import {
  CustomEnterOrderedList,
  CustomOrderedList,
} from "@frontend/components/editor/extensions/ordered-list";
import {
  CustomEnterParagraph,
  CustomParagraph,
} from "@frontend/components/editor/extensions/paragraph";
import { CustomPlaceholder } from "@frontend/components/editor/extensions/placeholder";
import { CustomStarterKit } from "@frontend/components/editor/extensions/starter";
import { CustomText } from "@frontend/components/editor/extensions/text";
import { CustomTextStyle } from "@frontend/components/editor/extensions/text-style";
import { CustomTitle } from "@frontend/components/editor/extensions/title";
import { CustomUnderline } from "@frontend/components/editor/extensions/underline";
import { CustomUniqueId } from "@frontend/components/editor/extensions/unique-id";

export const defaultExtensions = [
  CustomStarterKit,
  CustomDocument,
  CustomTitle,
  CustomPlaceholder,
  CustomParagraph,
  CustomText,
  CustomHeading,
  CustomUnderline,
  CustomBulletList,
  CustomOrderedList,
  CustomMarkdown,
  CustomHighlight,
  CustomTextStyle,
  CustomEnterParagraph,
  CustomEnterOrderedList,
  CustomEnterBulletList,
  CustomGapCursor,
  CustomUniqueId,
];
