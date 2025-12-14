import { createContext, useContext } from "react";
import { UserProfileStore } from "./UserProfileStore";

export class RootStore {
    userProfileStore: UserProfileStore;

    constructor() {
        this.userProfileStore = new UserProfileStore();
    }
}

let rootStore: RootStore;

export function getRootStore() {
    if (!rootStore) {
        rootStore = new RootStore();
    }
    return rootStore;
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
    const context = useContext(RootStoreContext);
    if (context === null) {
        // Fallback or throw, but for now we can return the singleton if context is missing,
        // though strictly we should use the provider.
        return getRootStore();
    }
    return context;
};
