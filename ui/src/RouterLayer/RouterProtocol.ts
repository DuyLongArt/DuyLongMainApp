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
    type: 'redirect' | 'domain' | 'page';
}

// Specific type for redirect routes
interface RedirectRoute extends BaseRoute {
    type: 'redirect';
    host: string;
    path: string;
    title:string;
}

// Specific type for standalone routes
interface DomainRoute extends BaseRoute {
    type: 'domain';
    path: string;
    component: string;
    children: ChildRoute[];
    title?: string;
}

// Specific type for layout routes
interface PageRoute extends BaseRoute {
    type: 'page';
    path: string;
    component: string;

}

// A union type for any possible route object in the array
type Route = RedirectRoute | DomainRoute | PageRoute;

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
function getDomainRoutes(config: RoutesConfig): DomainRoute[] {
    // This is a type guard: it filters the array and tells TypeScript
    // the new array's type is LayoutRoute[]
    return config.routes.filter(
        (route): route is DomainRoute => route.type === 'domain'
    );
}

/**
 * Parses the routes config and extracts all standalone routes.
 * @param config - The parsed JSON object from routes.json
 * @returns An array of StandAloneRoute objects.
 */
function getPageRoutes(config: RoutesConfig): PageRoute[] {
    return config.routes.filter(
        (route): route is PageRoute => route.type === 'page'
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
export const routesJson = RouterConfig as unknown as RoutesConfig;
console.log(routesJson);
export const pageRoutes = getPageRoutes(routesJson);
export const domainRoutes = getDomainRoutes(routesJson);
// const redirectRoutes = getRedirectRoutes(routesJson);

// Now you can safely access properties specific to each type
export const domainPaths = domainRoutes.map(route => route.path);

export const pageList= domainRoutes.map(route=>route.path==="/home" ? route.children.map(element=>element.title) : []).flat();
export const pathList=domainRoutes.map(route=>route.path==="/home" ? route.children.map(element=>element.path) : []).flat();
export const redirectRoutes = getRedirectRoutes(routesJson);

console.log("Domain Paths:", domainPaths);
// Expected Output: [ "/home", "/admin", "/blog" ]

console.log("Page Paths:", pathList);
// Expected Output: [ "/login", "/register" ]

// Expected Output: [ { type: 'redirect', from: '/', to: '/home/index' } ]
console.log("Widget Routes:", pageList);