import { cn } from "@frontend/lib/utils";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ className }: { className?: string }) => (
  <Loader2 className={cn("w-4 h-4 mr-2 animate-spin", className)} />
);
