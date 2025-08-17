import { Outlet, Route, Routes} from "react-router-dom";
import type { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import {domainRoutes, pageRoutes, routesJson} from "./RouterProtocol.ts";
import { Box } from "@mui/material";
import React from "react";
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage.tsx";

const componentMap: Record<string, React.FC> = {
    // Map of component names to actual React components
    // Example:
    // 'HomePage': HomePageComponent,
    // 'NotFoundPage': NotFoundPageComponent,
    "PersonalPage": React.lazy(() => import("../UILayer/pages/Home/Personal/PersonPage.tsx")),
  "LoginPage": React.lazy(() => import("../UILayer/pages/Login/LoginPage.tsx")),
  "HomePage": React.lazy(() => import("../UILayer/pages/Home/HomePage.tsx")),
  "HomeLayout": React.lazy(() => import("../UILayer/pages/Home/HomeLayout.tsx")),
  "WidgetMainPage": React.lazy(() => import("../UILayer/pages/Home/Widget/WidgetMainPage.tsx")),
  "NotFoundPage": NotFoundPage,
  "BlankPage":()=><Box><h1>This is blank page</h1></Box>,
  "ContactPage": React.lazy(() => import("../UILayer/pages/Home/Contact/ContactPage.tsx")),
};

const AppRouterLayer: React.FC<ChildrenInterface> = ({ children }) => {


  const ErrorComponent = componentMap[routesJson.error.component] || NotFoundPage;
console.log("Domain Routes in react:", domainRoutes);
  return (
      <Box>
        <Routes>
          {/* --- DYNAMICALLY GENERATED ROUTES --- */}

          {/* 1. Generate Redirect Routes */}
          {/*{redirectRoutes.map((route) => (*/}
          {/*    <Route*/}
          {/*        key={route.from}*/}
          {/*        path={route.from}*/}
          {/*        element={<Navigate to={route.to} replace />}*/}
          {/*    />*/}
          {/*))}*/}

          {/* 2. Generate Standalone Page Routes */}
          {pageRoutes.map((route) => {
            const Component = componentMap[route.component] || NotFoundPage;
            return <Route key={route.path} path={route.path} element={<Component />} />;
          })}

          {/* 3. Generate Domain (Layout) Routes with Children */}
          {domainRoutes.map((domainRoute) => {
            console.log("Domain children route", domainRoute);
            const LayoutComponent = componentMap[domainRoute.component] || Outlet;
            return (
                <Route
                    key={domainRoute.path}
                    path={domainRoute.path}
                    element={<LayoutComponent />}
                >
                  {domainRoute.children.map((childRoute) => {

                    const ChildComponent = componentMap[childRoute.component] || NotFoundPage;
                    if (childRoute.isIndex) {
                      return (
                          <Route
                              key={`${domainRoute.path}-index`}
                              index
                              element={<ChildComponent />}
                          />
                      );
                    }
                    return (
                        <Route
                            key={`${domainRoute.path}-${childRoute.path}`}
                            path={childRoute.path}
                            element={<ChildComponent />}
                        />
                    );
                  })}
                </Route>
            );
          })}

          {/* 4. Generate the Error Route */}
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        {children}
      </Box>
  );
};

export default AppRouterLayer;

