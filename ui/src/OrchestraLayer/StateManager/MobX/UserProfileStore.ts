import { makeAutoObservable } from "mobx";

export interface UserDetails {
    studies: string;
    location: string;
}

export interface UserProfile {
    name: string;
    friends: number;
    mutual: number;
    details: UserDetails;
    profileImageUrl: string;
}

export class UserProfileStore {
    profile: UserProfile = {
        name: "DuyLong",
        friends: 208,
        mutual: 5,
        details: {
            studies: "Hanoi University of Science and Technology",
            location: "Hai Duong Province",
        },
        profileImageUrl: "https://via.placeholder.com/150",
    };

    constructor() {
        makeAutoObservable(this);
    }

    updateName(name: string) {
        this.profile.name = name;
    }

    updateLocation(location: string) {
        this.profile.details.location = location;
    }
}
