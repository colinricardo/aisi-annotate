import { SignIn } from "@clerk/nextjs";
import { ROUTE_LAUNCH } from "@frontend/config/routes";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="sr-only">Sign In</h1>
      <SignIn
        forceRedirectUrl={ROUTE_LAUNCH}
        fallbackRedirectUrl={ROUTE_LAUNCH}
        signUpForceRedirectUrl={ROUTE_LAUNCH}
        signUpFallbackRedirectUrl={ROUTE_LAUNCH}
      />
    </div>
  );
};
