import { SignUp } from "@clerk/nextjs";
import { ROUTE_LAUNCH } from "@frontend/config/routes";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="sr-only">Sign Up</h1>
      <SignUp
        forceRedirectUrl={ROUTE_LAUNCH}
        fallbackRedirectUrl={ROUTE_LAUNCH}
        signInForceRedirectUrl={ROUTE_LAUNCH}
        signInFallbackRedirectUrl={ROUTE_LAUNCH}
      />
    </div>
  );
};
