import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAuthenticatedRoute = createRouteMatcher([
  "/gossip/new(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isAuthenticatedRoute(req)) await auth.protect();
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
