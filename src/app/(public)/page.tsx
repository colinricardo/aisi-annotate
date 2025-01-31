import { LayoutLanding } from "@frontend/components/layouts/layout-landing";
import { Button } from "@frontend/components/ui/button";
import Link from "next/link";

export default () => {
  return (
    <LayoutLanding>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-6 text-7xl font-extrabold text-center text-foreground">
          Welcome to AISI Annotate
        </h1>

        <p className="text-2xl text-muted-foreground mb-12">
          Easily annotate your documents!
        </p>

        <Link href="/sign-in">
          <Button
            aria-label="Get Started"
            size="lg"
            className="text-xl px-8 py-6"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </LayoutLanding>
  );
};
