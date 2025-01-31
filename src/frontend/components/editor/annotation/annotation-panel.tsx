"use client";

import { Button } from "@frontend/components/ui/button";
import { successToast } from "@frontend/lib/toast";
import { useEditorStore } from "@frontend/stores/editor-store";
import copy from "copy-to-clipboard";
import { Building2, Copy, MapPin, Tag, User2 } from "lucide-react";
import { useEffect, useState } from "react";

type Annotation = {
  start: number;
  end: number;
  label: string;
  text: string;
};

const labelToIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  organization: Building2,
  person: User2,
  location: MapPin,
  misc: Tag,
};

export const AnnotationPanel = () => {
  const editor = useEditorStore((state) => state.editorInstance);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    if (!editor) return;

    // read all annotation marks from doc, capturing text range
    const getAllAnnotations = () => {
      const newAnn: Annotation[] = [];

      editor.state.doc.descendants((node, pos) => {
        // only text nodes can have marks
        if (!node.isText) return;

        const nodeStart = pos;
        const nodeEnd = pos + (node.text?.length ?? 0);

        node.marks.forEach((mark) => {
          if (mark.type.name === "annotation") {
            newAnn.push({
              start: nodeStart,
              end: nodeEnd,
              label: mark.attrs.label,
              text: node.text ?? "",
            });
          }
        });
      });

      setAnnotations(newAnn);
    };

    // compute once initially
    getAllAnnotations();

    // re-compute whenever doc updates
    const updateHandler = () => getAllAnnotations();
    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor]);

  const handleCopy = () => {
    const formattedData = annotations.map((ann) => ({
      start: ann.start,
      end: ann.end,
      text: ann.text,
      label: ann.label,
    }));

    copy(JSON.stringify(formattedData, null, 2));
    successToast("Annotations copied!");
  };

  const handleIndividualCopy = (annotation: Annotation) => {
    const formattedData = {
      start: annotation.start,
      end: annotation.end,
      text: annotation.text,
      label: annotation.label,
    };

    copy(JSON.stringify(formattedData, null, 2));
    successToast("Annotation copied!");
  };

  if (!annotations.length) {
    return (
      <div className="flex items-center justify-center h-full p-2 text-sm text-muted-foreground">
        No annotations yet
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2">
        <div className="text-base font-bold">Annotations</div>

        <Button
          aria-label="Copy all annotations"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2 pb-4">
        <ul className="space-y-1">
          {annotations.map((ann, i) => {
            const Icon = labelToIcon[ann.label] || Tag;

            return (
              <li key={i}>
                <button
                  className="w-full rounded bg-muted px-2 py-1 flex flex-col text-left"
                  onClick={() => handleIndividualCopy(ann)}
                  aria-label={`Copy ${ann.label} annotation: ${ann.text}`}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="ml-2 font-bold">{ann.label}</span>
                  </div>
                  <div className="mt-1">{ann.text}</div>
                  <div className="text-xs mt-1">
                    [start={ann.start}, end={ann.end}]
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
