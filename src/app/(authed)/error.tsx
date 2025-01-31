"use client";

import { PageError } from "@frontend/components/pages/page-error";

export default ({ error, reset }: { error: Error; reset: () => void }) => {
  return <PageError error={error} />;
};
