
import React, { useState, useEffect } from 'react';
import { CameraIcon, PencilIcon, PlusIcon, ShieldCheckIcon, LockClosedIcon, XMarkIcon, CheckCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, AcademicCapIcon, ComputerDesktopIcon, HomeIcon, PhotoIcon as PhotographIcon, UsersIcon, ChatBubbleOvalLeftIcon as ChatIcon, BellIcon } from '@heroicons/react/24/outline';
import { useUserProfileStore } from '../../../OrchestraLayer/StateManager/Zustand/userProfileStore';
import { OutdentIcon } from 'lucide-react';
import { AuthenticateFactor } from '../../../OrchestraLayer/StateManager/XState/AuthenticateMachine';
import MinIOUploadComponent from '../../components/MinIOUploadComponent';
import { useActor } from '@xstate/react';
import { EditAdminProfileMachine } from '../../../OrchestraLayer/StateManager/XState/EditAdminProfileMachine';
import { motion, AnimatePresence } from 'framer-motion';
import { useObjectImageEtagStore } from '../../../OrchestraLayer/StateManager/Zustand/objectImageStore';
import editAdminInformationMachine from '../../../OrchestraLayer/StateManager/XState/EditAdminInformation';

const timestamp = Date.now();
// --- CONFIG ---

// const cacheBusterUrl = `${networkUrl}?t=${new Date().getTime()}`;
const PersonProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Posts' | 'About' | 'Photos' | 'Security'>('Posts');
    const user = useUserProfileStore((state) => state.information);
    const userStore = useUserProfileStore();
    const updateProfileImageUrl = useUserProfileStore((state) => state.updateProfileImageUrl);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [mode, setMode] = useState('');
    const [nameFromInput, setNameFromInput] = useState('');
    const actorRef = AuthenticateFactor.useActorRef();
    const [state, send] = useActor(EditAdminProfileMachine);
    const imageObjectStore = useObjectImageEtagStore();


    const [isEdit, setIsEdit] = useState(false);

    const [location, setLocation] = useState('');
    const [university, setUniversity] = useState('');

    const [editAdminInformationState, editAdminInformationSend] = useActor(editAdminInformationMachine);
    // const [company,setCompany] = useState('');
    // const [website,setWebsite] = useState('');
    // const [bio,setBio] = useState('');
    useEffect(() => {
        useUserProfileStore.getState().fetchFromDatabase();
        if (state.matches('success')) {
            if (mode === 'admin') {
                imageObjectStore.incrementAvatarVersion();
            }
            if (mode === 'cover') {
                imageObjectStore.incrementCoverVersion();
            }
        }
    }, [state.value]);


    // These URLs are now "Smart." They only bypass cache when the version increments.
    const ADMIN_IMAGE_URL = `http://192.168.22.4:9000/duylongwebappobjectdatabase/${user.profiles.alias}/admin.png?v=${imageObjectStore.versions.avatarVersion}`;
    const COVER_PHOTO_URL = `http://192.168.22.4:9000/duylongwebappobjectdatabase/${user.profiles.alias}/cover.png?v=${imageObjectStore.versions.coverVersion}`;


    // useEffect(() => {
    //     // Only override if we want to force the admin.png which the user requested
    //     if (user.profiles.profileImageUrl != ADMIN_IMAGE_URL) {
    //         updateProfileImageUrl(ADMIN_IMAGE_URL);
    //     }


    // }, [updateProfileImageUrl]);
    const handleUploadStart = (file: File) => {
        send({ type: 'FILE_SELECTED', file, name: 'profileImage' });
        send({ type: 'UPLOAD_STARTED' });
    };
    const handleUploadBackground = (file: File) => {
        send({ type: 'FILE_SELECTED', file, name: 'profileImage' });
        send({ type: 'UPLOAD_STARTED' });
    };


    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        send({ type: 'RESET' });
    };

    const handleLogout = () => {
        console.log("👋 Initiating logout...");
        actorRef.send({ type: 'LOGOUT' });
    };

    // Sync uploaded URL with Zustand store
    useEffect(() => {
        if (state.matches('success') && state.context.uploadedUrl) {
            updateProfileImageUrl(state.context.uploadedUrl);
            console.log("🔄 Updated store with new profile image URL:", state.context.uploadedUrl);
        }
    }, [state.matches('success'), state.context.uploadedUrl, updateProfileImageUrl]);

    return (
        <div className="bg-[#f0f2f5] min-h-screen pb-20">
            {/* Top Navigation Bar (Mockup from LgLinh) */}
            {/* <header className="sticky top-0 z-30 bg-white shadow-sm border-b px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h2 className="ml-2 font-bold text-lg text-gray-800">Admin Profile</h2>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                    </button>
                </div>
            </header> */}

            <div className="max-w-4xl mx-auto  bg-white shadow-md">

                <div className="relative h-[200px] md:h-[300px]  text-white overflow-hidden">
                    <img src={COVER_PHOTO_URL} alt="Cover" loading="lazy" className="w-full h-full  z-0 object-cover" />
                    <div className="absolute z-10 inset-0 bg-black/20"></div>
                    <button className="absolute bottom-4 
                    border-2 border-indigo-600
                    right-4 bg-white/80 
                    z-20
                     text-white font-bold py-1.5 px-3  rounded-lg flex items-center 
                     shadow-lg text-sm transition-all active:scale-95"
                        onClick={() => {
                            setMode('cover');
                            setIsEditModalOpen(true);
                        }
                        }
                    >
                        <CameraIcon className="h-4 text-white w-4 mr-2" />
                        Edit Cover
                    </button>
                    {/* <h1>Hi</h1> */}

                    {/* 
                    <button
                        // onClick={() => setIsEditModalOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transform transition active:scale-95 text-sm"
                    >
                        <CameraIcon className="h-4 text-white w-4 mr-2" />
                        Edit Cover</button> */}
                </div>

                {/* Profile Header */}
                <div className="px-4 pb-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-[60px] md:-mt-[80px] relative z-10 mb-6">
                        {/* Profile Picture */}
                        <div className="relative group cursor-pointer" onClick={() => {
                            setMode('admin');
                            setIsEditModalOpen(true);

                        }}




                        >
                            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-xl relative ring-1 ring-gray-200 transition-transform group-hover:scale-105">
                                <img src={ADMIN_IMAGE_URL} alt="Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <CameraIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            {/* Online Status */}
                            <div className="absolute bottom-3 right-3 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        {/* Name and Stats */}
                        <div className="mt-4 md:mt-0 md:ml-6 flex-1 text-center md:text-left md:mb-2">
                            <h2 className="text-3xl  text-black font-extrabold ">{user.profiles.firstName}</h2>
                            <p className="text-gray-500 font-semibold mb-2">
                                {user.profiles.friends.toLocaleString()} friends • {user.profiles.mutual} mutual
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-indigo-200">SUPER ADMIN</span>
                                <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-green-200">ACTIVE</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 md:mt-0 flex gap-2 w-full md:w-auto md:mb-2">
                            <button
                                onClick={handleLogout}
                                className="flex-1 md:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transform transition active:scale-95 shadow-md text-sm"
                            >
                                <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transform transition active:scale-95 shadow-md text-sm">
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Story
                            </button>
                            <button
                                // onClick={() => setIsEditModalOpen(true)}
                                onClick={() => {
                                    // setIsEdit(!isEdit);

                                    // userStore.editProfile(university, location);
                                    // userStore.updateProfile();

                                    editAdminInformationSend({ type: "EDIT" });
                                    if (editAdminInformationState.value === "onEdit") {
                                        console.log(location, university);
                                        editAdminInformationSend({ type: "TYPE" });



                                    }
                                    console.log(editAdminInformationState.value);
                                    if (editAdminInformationState.value === "onType") {
                                        console.log("onType");
                                        console.log(location, university);
                                        editAdminInformationSend({ type: "SAVE", location: location, university: university });
                                    }

                                }}
                                className="flex-1 md:flex-none flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transform transition active:scale-95 text-sm"
                            >
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Navigation Tabs */}
                    {/* <nav className="flex overflow-x-auto no-scrollbar pt-1">
                        {['Posts', 'About', 'Photos', 'Security'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`whitespace-nowrap px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === tab
                                    ? 'text-indigo-600 border-indigo-600'
                                    : 'text-gray-500 border-transparent hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav> */}
                    <div className='bg-white p-4 rounded-xl text-blue-600 shadow-sm border border-gray-100'>
                        <p className="text-sm text-indigo-600" >{user.details.bio}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-4xl mx-auto mt-4 px-4 flex flex-col md:flex-row gap-4">
                {/* Left Column - Intro & Details */}
                <div className="w-full md:w-[360px] space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-extrabold mb-4 text-gray-900 text-center md:text-left">Intro</h3>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-700">
                                <AcademicCapIcon className="h-6 w-6 text-gray-400 mr-3" />
                                {(editAdminInformationState.value != "onEdit" && editAdminInformationState.value != "onType") ? <span>Studied at <strong className="text-gray-900">{user.details.university}</strong></span> : <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} />}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <MapPinIcon className="h-6 w-6 text-gray-400 mr-3" />
                                {(editAdminInformationState.value != "onEdit" && editAdminInformationState.value != "onType") ? <span>Lives in <strong className="text-gray-900">{user.details.country}</strong></span> : <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <ComputerDesktopIcon className="h-6 w-6 text-gray-400 mr-3" />
                                <span className="text-xs font-mono text-gray-500">Reg IP: 192.168.22.4</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 rounded-lg transition-colors text-sm">
                            Edit Public Details
                        </button>
                    </div>

                    {/* Quick Admin Access */}
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
                        <div className="flex items-center mb-3">
                            <ShieldCheckIcon className="h-5 w-5 text-indigo-600 mr-2" />
                            <h4 className="font-bold text-indigo-900">Admin Control</h4>
                        </div>
                        <div className="space-y-2">
                            <button className="w-full text-left p-2 rounded-lg hover:bg-white text-white text-sm font-semibold transition-all">
                                View System Logs
                            </button>
                            <button className="w-full text-left p-2 rounded-lg hover:bg-white text-white text-sm font-semibold transition-all">
                                Manage User Permissions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Feed / Tab Content */}
                <div className="flex-1 space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-gray-500 min-h-[300px]">
                        <div className="p-4 bg-gray-50 rounded-full mb-4">
                            <ChatIcon className="h-10 w-10 text-gray-300" />
                        </div>
                        <p className="font-bold text-gray-800">No content available for {activeTab}</p>
                        <p className="text-sm mt-1">This section is currently under development.</p>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Nav (Mobile Style) */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t flex justify-around p-3 z-40 lg:hidden">
                <HomeIcon className="h-7 w-7 text-indigo-600 cursor-pointer" />
                <PhotographIcon className="h-7 w-7 text-gray-400 hover:text-indigo-500 cursor-pointer" />
                <UsersIcon className="h-7 w-7 text-gray-400 hover:text-indigo-500 cursor-pointer" />
                <ChatIcon className="h-7 w-7 text-gray-400 hover:text-indigo-500 cursor-pointer" />
                <BellIcon className="h-7 w-7 text-gray-400 hover:text-indigo-500 cursor-pointer" />
            </footer>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-5 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Change Profile Picture</h2>
                                <button onClick={handleCloseModal} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-all">
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <input
                                className="w-full p-2  z-30 
                                 border-3 border-indigo-400
                                rounded-lg mb-4 text-black"
                                placeholder="Enter name"
                                type="text" value={nameFromInput} onChange={(e) => setNameFromInput(e.target.value)} />

                            <div className="p-6 z-30 border-3 border-indigo-400">
                                <MinIOUploadComponent
                                    onUpload={handleUploadStart}
                                    progress={state.context.progress}
                                    isUploading={state.matches('uploading')}
                                    error={state.context.error}
                                    nameFromInput={nameFromInput}
                                    mode={mode}
                                />

                                {state.matches('success') && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center border border-green-100"
                                    >
                                        <CheckCircleIcon className="w-6 h-6 mr-3" />
                                        <span className="font-semibold">Update successful! Your profile picture has been updated.</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PersonProfilePage;
