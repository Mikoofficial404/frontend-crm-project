import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createRootRoute({
  component: () => {
    const pathname = useLocation({ select: (loc) => loc.pathname });
    const isLoginPage = pathname === "/login";

    return (
      <>
        {isLoginPage ? (
          <Outlet />
        ) : (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        )}

        {import.meta.env.DEV && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          </>
        )}
      </>
    );
  },
});