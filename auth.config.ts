import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnInvoices = nextUrl.pathname.startsWith("/invoices");
      const isOnCustomers = nextUrl.pathname.startsWith("/customers");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnDashboard || isOnInvoices || isOnCustomers) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (isOnDashboard || isOnLogin)
          return Response.redirect(new URL("/dashboard", nextUrl));
        else if (isOnCustomers)
          return Response.redirect(new URL("/customers", nextUrl));
        else if (isOnInvoices)
          return Response.redirect(new URL("/invoices", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
