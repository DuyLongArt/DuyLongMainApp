import { Outlet, Route, Routes} from "react-router-dom";
import type { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import {domainRoutes, pageRoutes, redirectRoutes, routesJson} from "./RouterProtocol.ts";
import { Box } from "@mui/material";
import React from "react";
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage.tsx";
import { Navigate } from 'react-router-dom';
const componentMap: Record<string, React.FC> = {
    // Map of component names to actual React components
    // Example:
    // 'HomePage': HomePageComponent,
    // 'NotFoundPage': NotFoundPageComponent,
    "PersonalPage": React.lazy(() => import("../UILayer/pages/Home/Personal/PersonPage.tsx")),
  "LoginPage": React.lazy(() => import("../UILayer/pages/Login/LoginForm.tsx")),
  "HomePage": React.lazy(() => import("../UILayer/pages/Home/HomePage.tsx")),
  "HomeLayout": React.lazy(() => import("../UILayer/pages/Home/HomeLayout.tsx")),
  "WidgetMainPage": React.lazy(() => import("../UILayer/pages/Home/Widget/WidgetMainPage.tsx")),
  "NotFoundPage": NotFoundPage,
    "Widget1Page": React.lazy(() => import("../UILayer/pages/Home/Widget/Widget1Page.tsx")),
  "BlankPage":()=><Box><h1>This is blank page</h1></Box>,
  "ContactPage": React.lazy(() => import("../UILayer/pages/Home/Contact/ContactPage.tsx")),
    "LoginForm": React.lazy(() => import("../UILayer/pages/Login/LoginForm.tsx")),
    "Widget2Page": React.lazy(() => import("../UILayer/pages/Home/Widget/Widget2Page.tsx")),
    "Widget3Page": React.lazy(() => import("../UILayer/pages/Home/Widget/Widget3Page.tsx")),
    "Widget4Page": React.lazy(() => import("../UILayer/pages/Home/Widget/Widget4Page.tsx")),
    "Widget5Page": React.lazy(() => import("../UILayer/pages/Home/Widget/Widget5Page.tsx")),


    // "ErrorPage": React.lazy(() => import("../UILayer/pages/Error/ErrorPage.tsx")),
  
};


const AppRouterLayer: React.FC<ChildrenInterface> = ({ children }) => {

  const ErrorComponent = componentMap[routesJson.error.component] || NotFoundPage;
console.log("Domain Routes in react:", domainRoutes);



  return (
      <Box>
        <Routes>




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
                    <Route element={<Navigate to={domainRoute.children[0]?.path || '/not-found'} replace />} index />
                  {domainRoute.children.map((childRoute) => {

                    const ChildComponent = componentMap[childRoute.component] || NotFoundPage;

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

