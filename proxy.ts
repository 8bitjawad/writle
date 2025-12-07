import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/write(.*)",
  "/dashboard(.*)",
  "/history(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If route is protected and there's no logged-in user → redirect to sign-in
  if (isProtectedRoute(req) && !userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  // Otherwise continue
  return;
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
  ],
};
