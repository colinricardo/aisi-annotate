import { Button } from "@frontend/components/ui/button";
import { ROUTE_LANDING } from "@frontend/config/routes";
import Link from "next/link";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center bg-brand">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8">Oops! The page you are looking for does not exist.</p>
      <Link href={ROUTE_LANDING} prefetch>
        <Button aria-label="Go Back Home">Go Back Home</Button>
      </Link>
    </div>
  );
};
