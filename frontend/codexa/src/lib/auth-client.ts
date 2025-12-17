import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "/api/auth", // Relies on the Render Rewrite rule
  fetchOptions: {
    credentials: "include",
  },
});