import { Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import type { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import { appRoutes, errorRoute } from "./RouterConfig.tsx";
import type { Route as RouteType, ChildRoute, RedirectRoute, DomainRoute, PageRoute } from "./RouterProtocol.ts";

// Loading fallback component
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <CircularProgress />
    <Box>Loading page...</Box>
  </Box>
);

const AppRouterLayer: React.FC<ChildrenInterface> = ({ children }) => {
  // Redirection is now handled by SecurityLayer wrapping this component

  // Auth redirection is now handled by SecurityLayer

  const renderComponent = (component: React.ReactNode) => {
    return (
      <Suspense fallback={<PageLoader />}>
        {component}
      </Suspense>
    )
  }

  const renderRoutesRecursive = (routes: (RouteType | ChildRoute)[]) => {

    return routes.map((route, index) => {
      // Handle Redirects
      if (route.type === 'redirect') {
        const redirectRoute = route as RedirectRoute;
        return (
          <Route
            key={`${redirectRoute.path}-${index}`}
            path={redirectRoute.path}
            element={<Navigate to={redirectRoute.path} replace />}
          />
        );
      }

      // Explicitly cast to types that have component and children
      const pageRoute = route as DomainRoute | PageRoute;
      const hasChildren = pageRoute.children && pageRoute.children.length > 0;
      const element = pageRoute.component;

      return (
        <Route
          key={`${pageRoute.path}-${index}`}
          path={pageRoute.path}
          element={renderComponent(element)}
        >
          {hasChildren && (
            <>
              <Route
                index
                element={
                  <Navigate
                    to={pageRoute.children![0].path}
                    replace
                  />
                }
              />
              {renderRoutesRecursive(pageRoute.children!)}
            </>
          )}
        </Route>
      );
    });
  };

  return (
    <Box>
      <Routes>
        {renderRoutesRecursive(appRoutes)}

        {/* Error/404 Route */}
        <Route path={errorRoute?.path} element={renderComponent(errorRoute?.component)} />
      </Routes>
      {children}
    </Box>
  );
};

export default AppRouterLayer;