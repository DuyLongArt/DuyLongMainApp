import { Outlet, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import type { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import { appRoutes, errorRoute } from "./RouterConfig.tsx";
import type { Route as RouteType, ChildRoute } from "./RouterProtocol.ts";
import { AuthenticateFactor } from "../OrchestraLayer/StateManager/XState/AuthenticateMachine";

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
  const navigate = useNavigate();
  const location = useLocation();
  const authState = AuthenticateFactor.useSelector((state) => state);

  useEffect(() => {
    const isLoginPage = location.pathname.includes("/login");

    // Redirect to login if logged out or auth failed
    if ((authState.matches("onLogout") || authState.matches("onAuthenFailed")) && !isLoginPage) {
      console.log("👋 Detected logout state, redirecting to login...");
      navigate("/login/index");
    }
  }, [authState.value, location.pathname, navigate]);

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

      if ('type' in route && route.type === 'redirect') {

        return (
          <Route
            key={`${route.path}-${index}`}
            path={route.path}
            element={<Navigate to={route.path} replace />} // Logic for external redirect might need customized component if it's external host
          />
        );
      }

      // Handle Pages and Domains (Layouts)
      const hasChildren = route.children && route.children.length > 0;
      // var element = null;
      // // if (route.type === "domain") {
      // //   element = route.component;
      // // }
      // // else if (route.type === "entry" && route.path === "index" || route.type === "page" || route.type === "component") {
      // //   element =
      // //     <>
      // //       {route.component}
      // //       <Outlet />
      // //     </>
      // // }
      // element=route.component;
      // // const element =!(route.type === 'entry')? route.component : <Outlet />;
      var element = route.component;
      return (
        <Route
          key={`${route.path}-${index}`}
          path={route.path}
          element={renderComponent(element)}
        >
          {/* If it has children, we might want a default index route behavior */}
          {hasChildren && (
            <>
              {/* <Outlet /> */}
              <Route
                index
                element={
                  <Navigate
                    to={route.children![0].path}
                    replace
                  />
                }
              />
              {renderRoutesRecursive(route.children!)}
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