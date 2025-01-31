import { api } from "@backend/trpc";
import { LiveBlocksWrapper } from "@frontend/components/editor/liveblocks-wrapper";
import { Breadcrumbs } from "@frontend/components/layouts/editor/breadcrumbs";
import { HeaderButtons } from "@frontend/components/layouts/editor/header-buttons";
import { AppSidebar } from "@frontend/components/layouts/shared/app-sidebar";
import { AppSidebarRight } from "@frontend/components/layouts/shared/app-sidebar-right";
import { PageError } from "@frontend/components/pages/page-error";
import { SidebarWrapper } from "@frontend/components/ui/sidebar";

export default async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ documentId: string }>;
}) => {
  try {
    const { documentId } = await params;

    const { document } = await api.document.get({ documentId });

    if (!document) {
      return (
        <PageError
          error={new Error("Document not found")}
          message="Document Not Found"
          subMessage="The document you're looking for doesn't exist or has been removed."
        />
      );
    }

    return (
      <LiveBlocksWrapper document={document}>
        <div className="flex min-h-screen w-full">
          <SidebarWrapper>
            <AppSidebar />
            <div className="flex flex-1 flex-col min-w-0">
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center bg-background">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Breadcrumbs />
                </div>
                <HeaderButtons />
              </header>
              <main className="flex-1 overflow-y-auto bg-background">
                {children}
              </main>
            </div>
            <AppSidebarRight />
          </SidebarWrapper>
        </div>
      </LiveBlocksWrapper>
    );
  } catch (error) {
    return (
      <PageError
        error={error as Error}
        message="Something went wrong"
        subMessage="An error occurred while loading the layout"
      />
    );
  }
};
