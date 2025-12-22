import axios from 'axios';
import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface UserDetails {
    information_id: number | null;
    identity_id: number | null;
    github_url: string;
    website_url: string;
    company: string;
    university: string;
    location: string;
    country: string;
    bio: string;
    occupation: string;
    education_level: string;
    linkedin_url: string;
}

export interface UserProfile {
    id: number | null;

    firstName: string;
    lastName: string;
    friends: number;
    mutual: number;
    profileImageUrl: string;
    alias: string;
}

export interface UserInformation {
    details: UserDetails;
    profiles: UserProfile;
}

interface UserInformationState {
    information: UserInformation;
    updateProfileImageUrl: (url: string) => void;
    updateProfile: () => Promise<void>;
    fetchFromDatabase: () => Promise<void>;
    editProfile: (university: string, location: string) => void;
}

export const useUserProfileStore = create<UserInformationState>((set, get) => ({
    information: {
        details: {
            information_id: null,
            identity_id: null,
            github_url: '',
            website_url: '',
            company: '',
            university: '',
            location: '',
            country: '',
            bio: '',
            occupation: '',
            education_level: '',
            linkedin_url: '',
        },
        profiles: {
            id: null,

            firstName: '',
            lastName: '',
            friends: 208,
            mutual: 5,
            profileImageUrl: 'http://192.168.22.4:9000/duylongwebappobjectdatabase/admin.png',
            alias: '',
        },
    },

    fetchFromDatabase: async () => {
        try {
            const token = Cookies.get('auth_jwt');
            if (!token) return;

            // Fetching from your Spring Boot Endpoint
            const response = await axios.get('http://localhost:22222/backend/person/information', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = response.data;

            set((state) => ({
                information: {
                    ...state.information,
                    profiles: {
                        ...state.information.profiles,
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        profileImageUrl: data.profileImageUrl || state.information.profiles.profileImageUrl,
                        alias: data.alias,
                    },
                    // Mapping additional fields to details if they exist in the response
                }
            }));

            const responseDetails = await axios.get('http://localhost:22222/backend/information/details', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const dataDetails = responseDetails.data;

            console.log("✅ Profile Sync Successful: ", dataDetails);
            set((state) => ({
                information: {
                    profiles: {
                        ...state.information.profiles,

                    },
                    details: {
                        ...state.information.details,
                        identity_id: dataDetails.id,
                        github_url: dataDetails.github_url,
                        website_url: dataDetails.website_url,
                        company: dataDetails.company,
                        university: dataDetails.university,
                        location: dataDetails.location,
                        country: dataDetails.country,
                        bio: dataDetails.bio,
                        occupation: dataDetails.occupation,
                        education_level: dataDetails.education_level,
                        linkedin_url: dataDetails.linkedin_url,
                    }
                }
            }
            ));

            console.log("✅ Profile Sync Successful");
        } catch (error) {
            console.error("❌ Failed to fetch user profile:", error);
        }
    },

    updateProfileImageUrl: (url: string) => set((state) => ({
        // information: {
        //     ...state.information,
        //     profiles: {
        //         ...state.information.profiles,
        //         profileImageUrl: url
        //     }
        // }
        information: {
            ...state.information,
            profiles: {
                ...state.information.profiles,
                profileImageUrl: url
            }
        }
    })),
    editProfile: (editUniversity: string, editLocation: string) => set((state) => ({
        information: {
            ...state.information,
            profiles: {
                ...state.information.profiles,
                details: {
                    ...state.information.details,
                    university: editUniversity,
                    location: editLocation,
                    github_url: state.information.details.github_url,
                    website_url: state.information.details.website_url,
                    company: state.information.details.company,
                    country: state.information.details.country,
                    bio: state.information.details.bio,
                    occupation: state.information.details.occupation,
                    education_level: state.information.details.education_level,
                    linkedin_url: state.information.details.linkedin_url,
                }
            }
        }

    })),


    updateProfile: async () => {
        try {
            const token = Cookies.get('auth_jwt');
            const { details } = get().information; // Get current state

            // This matches your Java @PostMapping("edit")
            // Sending the details object as the @RequestBody
            const response = await axios.post(
                `http://localhost:22222/backend/information/edit?university=${details.university}&location=${details.location}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("✅ Database Update Successful:", response.data);
        } catch (error) {
            console.error("❌ Failed to update profile in database:", error);
        }
    },


}));