import { HeaderButtons } from "@frontend/components/layouts/home/header-buttons";
import { AppSidebar } from "@frontend/components/layouts/shared/app-sidebar";
import { Breadcrumbs } from "@frontend/components/layouts/shared/breadcrumbs";
import { PageError } from "@frontend/components/pages/page-error";
import { SidebarInset, SidebarWrapper } from "@frontend/components/ui/sidebar";

export default async ({ children }: { children: React.ReactNode }) => {
  try {
    return (
      <SidebarWrapper>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Breadcrumbs />
            </div>
            <div className="ml-auto px-3">
              <HeaderButtons />
            </div>
          </header>
          <div className="flex flex-1 flex-col h-screen overflow-y-auto bg-background">
            {children}
          </div>
        </SidebarInset>
      </SidebarWrapper>
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
