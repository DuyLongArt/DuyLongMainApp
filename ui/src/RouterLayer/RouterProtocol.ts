import React from "react";

// --- Type Definitions ---

// This interface describes a child route within a layout or page
export interface ChildRoute {
    path: string;
    type?: string;
    component: React.ReactNode;
    title?: string;
    isDynamic?: boolean;
    children?: ChildRoute[];
}

// A base interface that all top-level route objects will extend
interface BaseRoute {
    type: 'redirect' | 'domain' | 'page' | 'error' | 'entry';
}

// Specific type for redirect routes
export interface RedirectRoute extends BaseRoute {
    type: 'redirect';
    host?: string; // Optional host for external redirects
    path: string;
    title?: string;
}

// Specific type for standalone routes or layouts
export interface DomainRoute extends BaseRoute {
    type: 'domain';
    path: string;
    component: React.ReactNode;
    children: ChildRoute[];
    title?: string;
}

// Specific type for simple pages
export interface PageRoute extends BaseRoute {
    type: 'page';
    path: string;
    component: React.ReactNode;
    children?: ChildRoute[];
    title?: string;
}
export interface ErrorRoute extends BaseRoute {
    type: 'error';
    path: string;
    component: React.ReactNode;
    title?: string;
}

// A union type for any possible route object in the array
export type Route = RedirectRoute | DomainRoute | PageRoute | ErrorRoute;