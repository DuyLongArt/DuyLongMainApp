// --- Type Definitions for routes.json ---
import RouterConfig from "./Router.json";
// This interface describes a child route within a layout
interface ChildRoute {
    path: string;
    component: string;
    title?: string;
    isIndex?: boolean;
    isDynamic?: boolean;
}

// A base interface that all top-level route objects will extend
interface BaseRoute {
    type: 'redirect' | 'standalone' | 'layout';
}

// Specific type for redirect routes
interface RedirectRoute extends BaseRoute {
    type: 'redirect';
    from: string;
    to: string;
}

// Specific type for standalone routes
interface StandAloneRoute extends BaseRoute {
    type: 'standalone';
    path: string;
    component: string;
    title?: string;
}

// Specific type for layout routes
interface LayoutRoute extends BaseRoute {
    type: 'layout';
    path: string;
    component: string;
    children: ChildRoute[];
}

// A union type for any possible route object in the array
type Route = RedirectRoute | StandAloneRoute | LayoutRoute;

// The root structure of the JSON file
interface RoutesConfig {
    routes: Route[];
    error: {
        path: string;
        component: string;
        title?: string;
    };
}


// --- Data Extraction Functions ---

/**
 * Parses the routes config and extracts all layout routes.
 * @param config - The parsed JSON object from routes.json
 * @returns An array of LayoutRoute objects.
 */
function getLayoutRoutes(config: RoutesConfig): LayoutRoute[] {
    // This is a type guard: it filters the array and tells TypeScript
    // the new array's type is LayoutRoute[]
    return config.routes.filter(
        (route): route is LayoutRoute => route.type === 'layout'
    );
}

/**
 * Parses the routes config and extracts all standalone routes.
 * @param config - The parsed JSON object from routes.json
 * @returns An array of StandAloneRoute objects.
 */
function getStandAloneRoutes(config: RoutesConfig): StandAloneRoute[] {
    return config.routes.filter(
        (route): route is StandAloneRoute => route.type === 'standalone'
    );
}

/**
 * Parses the routes config and extracts all redirect routes.
 * @param config - The parsed JSON object from routes.json
 * @returns An array of RedirectRoute objects.
 */
function getRedirectRoutes(config: RoutesConfig): RedirectRoute[] {
    return config.routes.filter(
        (route): route is RedirectRoute => route.type === 'redirect'
    );
}


// --- Example Usage ---

// Assume 'routesJson' is the JSON content from your Canvas file
const routesJson = RouterConfig as unknown as RoutesConfig;
const layoutRoutes = getLayoutRoutes(routesJson);
const standAloneRoutes = getStandAloneRoutes(routesJson);
const redirectRoutes = getRedirectRoutes(routesJson);

// Now you can safely access properties specific to each type
const layoutPaths = layoutRoutes.map(route => route.path);
const standAlonePaths = standAloneRoutes.map(route => route.path);
export const navigatorList= layoutRoutes.map(route=>route.path==="/home" ? route.children.map(child => child.title) : []).flat();
export const pathList=layoutRoutes.map(route=>route.path==="/home" ? route.children.map(child => child.path) : []).flat();
console.log("Layout Paths:", layoutPaths);
// Expected Output: [ "/home", "/admin", "/blog" ]

console.log("Standalone Paths:", standAlonePaths);
// Expected Output: [ "/login", "/register" ]

console.log("Redirect Routes:", redirectRoutes);
// Expected Output: [ { type: 'redirect', from: '/', to: '/home/index' } ]
console.log("Widget Routes:", navigatorList);