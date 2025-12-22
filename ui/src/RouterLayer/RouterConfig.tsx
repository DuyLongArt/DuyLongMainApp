import { lazy } from "react";
import type { Route } from "./RouterProtocol";

// Lazy load components
const PersonPage = lazy(() => import("../UILayer/pages/Home/Personal/PersonPage.tsx"));
const EntryPage = lazy(() => import("../UILayer/pages/Public/EntryPage.tsx"));
const LoginIndex = lazy(() => import("../UILayer/pages/Login/LoginIndex.tsx"));
const LoginForm = lazy(() => import("../UILayer/pages/Login/LoginForm.tsx"));
const RegisterPage = lazy(() => import("../UILayer/pages/Register/RegisterPage.tsx")); // Updated import
const HomePage = lazy(() => import("../UILayer/pages/Home/HomePage.tsx"));
const HomeLayout = lazy(() => import("../UILayer/pages/Home/HomeLayout.tsx"));
const WidgetMainPage = lazy(() => import("../UILayer/pages/Home/Widget/WidgetMainPage.tsx"));
const Widget1Page = lazy(() => import("../UILayer/pages/Home/Widget/Widget1Page.tsx"));
const Widget2Page = lazy(() => import("../UILayer/pages/Home/Widget/Widget2Page.tsx"));
const Widget3Page = lazy(() => import("../UILayer/pages/Home/Widget/Widget3Page.tsx"));
const Widget4Page = lazy(() => import("../UILayer/pages/Home/Widget/Widget4Page.tsx"));
const Widget5Page = lazy(() => import("../UILayer/pages/Home/Widget/Widget5Page.tsx"));
const ContactPage = lazy(() => import("../UILayer/pages/Home/Contact/ContactPage.tsx"));
const PersonProfilePage = lazy(() => import("../UILayer/pages/Admin/PersonProfilePage.tsx"));
const IOTPage = lazy(() => import("../UILayer/pages/Home/Contact/IOTPage.tsx"));
const ApproveProcessPage = lazy(() => import("../UILayer/pages/ApproveProcess/ApproveProcessPage.tsx"));
// const AdminLayout = lazy(() => import("../UILayer/pages/Admin/AdminLayout.tsx")); // Assuming exists
// const BlogLayout = lazy(() => import("../UILayer/pages/Blog/BlogLayout.tsx")); // Assuming exists
// const WidgetLayout = lazy(() => import("../UILayer/pages/Home/Widget/WidgetLayout.tsx")); // Assuming exists

// Eager loaded components
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage.tsx";
import OutletLayout from "../UILayer/pages/Home/OutletLayout.tsx";

// Placeholder for BlankPage if it's not exported elsewhere
const BlankPage = () => (
    <div style={{ padding: 20 }}>
        <h1>This is a blank page</h1>
    </div>
);

export const appRoutes: Route[] = [
    {
        type: "redirect",
        host: "192.168.3.1:6699",
        path: "/apps/dashboard/",
        title: "nextcloud",
    },
    {
        type: "domain",
        path: "/login",
        component: <OutletLayout />,
        title: "Login Domain",
        children: [
            {
                path: "form",
                component: <LoginForm />,
                title: "Form",
            },
            {
                type:"entry",
                path: "index",
                component: <LoginIndex />,
                title: "Login",
            },
            {
                path: "register",
                component: <RegisterPage />,
                title: "Register",
            },
        ],
    },
    {
        type: "domain",
        path: "entry",
        component: <OutletLayout />,
        title: "Entry",
        children: [
            {
                type: "entry",
                path: "index",
                component: <EntryPage />,
                title: "Welcome",
            }
        ]
    },
    
    {
        type: "domain",
        path: "home",
        component: <HomeLayout />,
        title: "HOME",
        children: [
            {
            type: "entry",
                path: "index",
                component: <HomePage />,
                title: "Home",
                children: [
                    
                ]
        },
    
    ]
    },
     {
               
            
            
                    type: "domain",
                path: "IOT",
                component: <OutletLayout />,
                title: "IOT",
                children: [
                           {
            type: "component",
                path: "index",
                component: <IOTPage />,
                // title: "IOT",
                children: [
                    
                ]
        },
                ]
            },
            {
                    type: "domain",
                path: "personal",
                component: <HomeLayout />,
                title: "Personal",
                children: [
                    {
                type: "entry",
                path: "index",
                component: <PersonPage />,
                title: "Personal",
                children: [
                    
                ]
                    }
                ]
            },
            {
                    type: "domain",
                path: "widget",
                component: <HomeLayout />,
                title: "Widget",
                children: [
                    {
                            type: "entry",
                path: "index",
                component: <WidgetMainPage />,
                title: "Widget",
                children: [
                    
                ]
                    }
                ]
            },
            {
                    type: "domain",
                path: "contact",
                component: <OutletLayout />,
                title: "Contact",
                children: [
                    {
                            type: "entry",
                path: "index",
                component: <ContactPage />,
                title: "Contact",
                children: [
                    
                ]
                    }
                ]
            },
    {
        type: "domain",
        path: "admin",
        component: <HomeLayout /> ,// Was AdminLayout, effectively Outlet in old map
        title: "Admin",
        children: [
            {
                path: "person-profile",
                component: <PersonProfilePage />,
                title: "Person Profile",
            },
        ],
    },
  
    {
        type: "domain",
        path: "widget",
        component: <HomeLayout />, // Was WidgetLayout, effectively Outlet
        title: "SubWidget",
        children: [
            {
                path: "blank",
                component: <BlankPage />,
                title: "Blank",
            },
            {
                path: "1",
                component: <Widget1Page />,
                title: "Widget 1",
            },
            {
                path: "2",
                component: <Widget2Page />,
                title: "Lab waves",
            },
            {
                path: "3",
                component: <Widget3Page />,
                title: "Retro terminal",
            },
            {
                path: "4",
                component: <Widget4Page />,
                title: "VHS Page",
            },
            {
                path: "5",
                component: <Widget5Page />,
                title: "Yellow City",
            },
        ],
    },
    {
        type: "page",
        path: "process-approval",
        component: <OutletLayout />,
        title: "Process Approval",
        children: [
            {
                path: "index",
                component: <ApproveProcessPage />,
                title: "Process Approval",
            }
        ]
    },
    {
        type: 'error',
        path: '/*',
        component: <NotFoundPage />
    }
];
export const errorRoute = appRoutes.find(r => r.type === 'error');
// Helper to get raw paths/titles for legacy components (like HomeLayout/ResponsiveAppbar)
// const homeRoute = appRoutes.find(r => r.path === '/home' && r.type === 'domain');
// export const pathList = homeRoute?.children?.map(child => child.path) || [];
// export const pageList = homeRoute?.children?.map(child => child.title || child.path) || [];


// export const pathList = appRoutes.map(r=>r.children.find(r=>r.type==="domain")?.path);
// export const pathList =appRoutes.map(r=>r.type);
export const pathList=appRoutes.filter(r=>r.type==="domain" && !r.path.includes("login")

&& !r.path.includes("register")
// && !r.children?.filter(r=>r.path.includes("index"))
&& !r.path.includes("entry")
&& !r.path.includes("admin")
).map(r=>r.path);


export const pageList=appRoutes.filter(r=>r.type==="domain" && !r.path.includes("login")
&& !r.path.includes("register")
&& !r.path.includes("entry")
&& !r.path.includes("admin")
// && !r.children?.filter(r=>r.path.includes("index"))
).map(r=>r.title);

// export const pathList=appRoutes.map(r=>
// {
//     if(r.find(t=>t.type==="domain"))
//         return r.find(r=>r.type==="domain")?.path;
//     else return "";
// });

 
// export const pageList = appRoutes.map(r=>r.children.find(r=>r.type==="domain")?.title);