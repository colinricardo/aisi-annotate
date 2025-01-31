import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@frontend/components/ui/context-menu";
import { Skeleton } from "@frontend/components/ui/skeleton";
import { BASE_URL } from "@frontend/config/config";

import { useSoftDeleteDocument } from "@frontend/lib/mutations";
import { getAgoString } from "@shared/utils/date";

import { Button } from "@frontend/components/ui/button";
import { ROUTE_DOCUMENT } from "@frontend/config/routes";
import { successToast } from "@frontend/lib/toast";
import { cn } from "@frontend/lib/utils";
import { useAppStore } from "@frontend/stores/app-store";
import { DocumentModel } from "@shared/types";
import copy from "copy-to-clipboard";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

export const DocumentCard = ({
  id: documentId,
  title,
  ownerId,
  updatedAt,
  createdAt,
  refetch,
}: DocumentModel & { refetch: () => void }) => {
  const { mutateAsync: deleteDocument } =
    useSoftDeleteDocument("Document deleted");
  const router = useRouter();
  const user = useAppStore((state) => state.user);

  const handleDelete = async () => {
    await deleteDocument({ documentId });
    refetch();
  };

  const getPath = () => {
    return `${ROUTE_DOCUMENT}/${documentId}`;
  };

  const handleEditorClick = () => {
    router.push(getPath());
  };

  const handleCopyLink = () => {
    const shareLink = `${BASE_URL}${getPath()}`;
    copy(shareLink);
    successToast("Link copied!");
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger tabIndex={-1}>
        <Link
          tabIndex={-1}
          prefetch
          href={getPath()}
          className="block w-[300px]"
        >
          <Card className="cursor-pointer h-[160px] w-full">
            <CardHeader className="pb-2">
              <CardTitle
                className={cn(
                  "truncate text-foreground text-lg font-bold",
                  "font-serif"
                )}
              >
                {title.trim() || "Untitled"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm truncate text-muted-foreground">
                Created {getAgoString(createdAt)}
              </div>
            </CardContent>
          </Card>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEditorClick}>Edit</ContextMenuItem>
        <ContextMenuItem onClick={handleCopyLink}>Copy link</ContextMenuItem>
        <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const DocumentCardSkeleton = () => (
  <div className="h-[160px] w-[300px]">
    <Skeleton className="w-full h-full" />
  </div>
);

export const NewDocumentCard = () => {
  const getPath = () => {
    return `${ROUTE_DOCUMENT}/new`;
  };

  return (
    <Card className="h-[160px] w-[300px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full">
        <Link href={getPath()} passHref tabIndex={-1}>
          <Button variant="ghost" aria-label="New document">
            New document
          </Button>
        </Link>
      </div>
    </Card>
  );
};
