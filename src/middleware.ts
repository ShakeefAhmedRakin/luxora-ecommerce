import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
      Private routes are defined here. If a route is not defined here, it is public.
      Private routes are checked for authentication before rendering the page.
     */
    "/dashboard/:path*",
  ],
};
