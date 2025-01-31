import { useEditor } from "@frontend/components/editor/editor-types";
import { Button } from "@frontend/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@frontend/components/ui/tooltip";
import { AnnotationType } from "@shared/types";
import { Building2, MapPin, Tag, User } from "lucide-react";
import { useEffect } from "react";

const getIcon = (type: AnnotationType) => {
  switch (type.id) {
    case "person":
      return User;
    case "organization":
      return Building2;
    case "location":
      return MapPin;
    default:
      return Tag;
  }
};

export const AnnotationSelector = ({
  open,
  onOpenChange,
  annotationTypes,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  annotationTypes: AnnotationType[];
}) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (open && editor) {
      editor.chain().focus().run();
    }
  }, [open, editor]);

  if (!editor) return null;
  if (annotationTypes.length === 0) return null;

  return (
    <div className="flex gap-1 bg-card border rounded-full p-1">
      {annotationTypes.map((type) => {
        const isActive = editor.isActive("annotation", { label: type.id });
        const Icon = getIcon(type);

        return (
          <Tooltip key={type.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  editor.chain().focus().toggleAnnotation(type.id).run();
                  onOpenChange(false);
                }}
                aria-label={`Toggle ${type.label} annotation`}
                aria-pressed={isActive}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>
              <p>{type.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
