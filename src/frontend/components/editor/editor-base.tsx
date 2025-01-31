import type { EditorProviderProps, JSONContent } from "@tiptap/react";
import { EditorProvider } from "@tiptap/react";
import { Provider, createStore } from "jotai";
import type { FC, ReactNode } from "react";
import { forwardRef } from "react";

export const editorStore = createStore();

export interface EditorProps {
  readonly children: ReactNode;
  readonly className?: string;
}

interface EditorRootProps {
  readonly children: ReactNode;
}

export const EditorRoot: FC<EditorRootProps> = ({ children }) => {
  return <Provider store={editorStore}>{children}</Provider>;
};

export type EditorContentProps = Omit<EditorProviderProps, "content"> & {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly initialContent?: JSONContent;
};

export const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(
  ({ className, children, initialContent, ...rest }, ref) => (
    <div
      ref={ref}
      className={className}
      role="group"
      aria-label="Text editor container"
    >
      <EditorProvider
        {...rest}
        content={initialContent}
        editorProps={{
          ...rest.editorProps,
          attributes: {
            ...rest.editorProps?.attributes,
            role: "textbox",
            "aria-multiline": "true",
            "aria-label": "Text editor content",
            tabindex: "0",
            "aria-readonly": rest.editable === false ? "true" : "false",
          },
        }}
        editorContainerProps={{
          role: "region",
          "aria-label": "Editor wrapper",
        }}
      >
        {children}
      </EditorProvider>
    </div>
  )
);

EditorContent.displayName = "EditorContent";
