
import React, { useState } from 'react';
import { CameraIcon, PencilIcon, PlusIcon, ShieldCheckIcon, ChartBarIcon, Cog6ToothIcon, NoSymbolIcon, KeyIcon, ClipboardDocumentListIcon, LockClosedIcon, DevicePhoneMobileIcon, ClockIcon } from '@heroicons/react/24/solid';
import { PhotoIcon, ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, MapPinIcon, AcademicCapIcon, ComputerDesktopIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../OrchestraLayer/StateManager/MobX/RootStore';
import type { UserProfile, UserDetails } from '../../../OrchestraLayer/StateManager/MobX/UserProfileStore';
import { DropletOffIcon, OutdentIcon } from 'lucide-react';
import { AuthenticateFactor } from '../../../OrchestraLayer/StateManager/XState/AuthenticateMachine';

// Placeholder Cover Photo
const COVER_PHOTO_URL = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80';

// Mock Admin Data
const ADMIN_DATA = {
    userId: 'USR-882910',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2023-10-27 14:30:00',
    registrationIp: '192.168.1.100',
    reports: 0,
};

// --- COMPONENTS ---

const AdminActionsCard = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border-l-4 border-indigo-600">
        <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
            Admin Actions
        </h3>
        <div className="space-y-2">
            <button className="w-full flex items-center p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition">
                <NoSymbolIcon className="h-5 w-5 mr-3" />
                <span className="font-medium">Suspend User</span>
            </button>
            <button className="w-full flex items-center p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition">
                <KeyIcon className="h-5 w-5 mr-3" />
                <span className="font-medium">Reset Password</span>
            </button>
            <button className="w-full flex items-center p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                <span className="font-medium">Edit Role & Permissions</span>
            </button>
            <button className="w-full flex items-center p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                <span className="font-medium">View Access Logs</span>
            </button>
        </div>
    </div>
);

const AdminNotesCard = () => (
    <div className="bg-yellow-50 p-4 rounded-xl shadow-sm mb-4 border border-yellow-200">
        <h3 className="font-bold text-lg mb-2 text-yellow-800 flex items-center">
            <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
            Admin Notes
        </h3>
        <p className="text-sm text-yellow-900 mb-3 italic">
            "User verified identity via phone call on Oct 20th. Flagged for potential spam in 2022 (resolved)."
        </p>
        <button className="text-xs text-yellow-700 font-bold hover:underline">
            + Add Note
        </button>
    </div>
);

const IntroCard = ({ details }: { details: UserDetails }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
        <h3 className="font-bold text-xl mb-4">Intro</h3>
        <div className="space-y-4">
            {/* System Info for Admins */}
            <div className="p-3 bg-slate-50 rounded-lg text-sm space-y-2 border border-slate-200">
                <div className="flex justify-between">
                    <span className="text-slate-500">User ID</span>
                    <span className="font-mono font-medium text-slate-700">{ADMIN_DATA.userId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Role</span>
                    <span className="font-medium text-indigo-600 px-2 py-0.5 bg-indigo-100 rounded-full text-xs">
                        {ADMIN_DATA.role}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        {ADMIN_DATA.status}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Last Login</span>
                    <span className="font-medium text-slate-700">{ADMIN_DATA.lastLogin.split(' ')[0]}</span>
                </div>
            </div>

            <div className="flex items-center text-gray-700">
                <AcademicCapIcon className="h-6 w-6 text-gray-500 mr-2" />
                <span>Studied at <strong>{details.studies}</strong></span>
            </div>
            <div className="flex items-center text-gray-700">
                <MapPinIcon className="h-6 w-6 text-gray-500 mr-2" />
                <span>Lives in <strong>{details.location}</strong></span>
            </div>
            <div className="flex items-center text-gray-700">
                <ComputerDesktopIcon className="h-6 w-6 text-gray-500 mr-2" />
                <span>Reg IP: <span className='font-mono text-xs'>{ADMIN_DATA.registrationIp}</span></span>
            </div>
        </div>
        <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition">
            Edit Details
        </button>
    </div>
);

const PhotosCard = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">Photos</h3>
            <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">See All Photos</button>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 hover:opacity-90 cursor-pointer">
                    <img
                        src={`https://source.unsplash.com/random/200x200?sig=${i}`}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Photo'; }}
                    />
                </div >
            ))}
        </div >
    </div >
);

// const CreatePostCard = ({ user }: { user: UserProfile }) => (
//     <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
//         <div className="flex items-center border-b pb-4 mb-4">
//             <img src={user.profileImageUrl} alt="User" className="w-10 h-10 rounded-full mr-3 object-cover" />
//             <div className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer text-gray-500">
//                 Write an admin announcement or post...
//             </div>
//         </div>
//         <div className="flex justify-around">
//             <button className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex-1 justify-center">
//                 <PhotoIcon className="h-6 w-6 text-green-500 mr-2" />
//                 <span className="font-medium">Photo/Video</span>
//             </button>
//             <button className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex-1 justify-center">
//                 <ShieldCheckIcon className="h-6 w-6 text-indigo-500 mr-2" />
//                 <span className="font-medium">Official Badge</span>
//             </button>
//         </div>
//     </div>
// );

const AnalyticsTabContent = () => (
    <div className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase">Login Streak</p>
                <p className="text-2xl font-bold text-green-600">14 Days</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase">Reports</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase">Support</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center">
                <ClockIcon className="h-5 w-5 text-indigo-500 mr-2" />
                Activity Timeline
            </h4>
            <div className="space-y-6 relative border-l-2 border-gray-100 ml-3">
                {[
                    { action: 'Updated profile picture', time: '2 hours ago', icon: <PhotoIcon className="w-4 h-4 text-white" />, color: 'bg-blue-500' },
                    { action: 'Logged in from Chrome (Windows)', time: '5 hours ago', icon: <DevicePhoneMobileIcon className="w-4 h-4 text-white" />, color: 'bg-green-500' },
                    { action: 'Posted a new status', time: 'Yesterday', icon: <ChatBubbleOvalLeftIcon className="w-4 h-4 text-white" />, color: 'bg-indigo-500' },
                    { action: 'Password changed', time: '1 week ago', icon: <KeyIcon className="w-4 h-4 text-white" />, color: 'bg-yellow-500' },
                ].map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                        <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full ${item.color} flex items-center justify-center shadow`}>
                            {item.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SecurityTabContent = () => (
    <div className="space-y-4">
        {/* Permissions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 mr-2" />
                Permissions & Restrictions
            </h4>
            <div className="space-y-3">
                {[
                    { label: 'Can Create Posts', enabled: true },
                    { label: 'Can Comment', enabled: true },
                    { label: 'Can Live Stream', enabled: false },
                    { label: 'Access to Marketplace', enabled: true },
                ].map((perm, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">{perm.label}</span>
                        <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${perm.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${perm.enabled ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 flex items-center">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-indigo-500 mr-2" />
                    Active Sessions
                </h4>
                <button className="text-xs font-bold text-red-600 hover:text-red-700 uppercase">
                    Revoke All
                </button>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <ComputerDesktopIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">MacBook Pro (Current)</p>
                            <p className="text-xs text-gray-500">Hanoi, Vietnam • Chrome • 192.168.1.100</p>
                        </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">iPhone 14 Pro</p>
                            <p className="text-xs text-gray-500">Hanoi, Vietnam • App • 2 hours ago</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500">
                        <NoSymbolIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);


// --- MAIN PAGE ---

const PersonProfilePage: React.FC = observer(() => {
    const [activeTab, setActiveTab] = useState<'Posts' | 'About' | 'Analytics' | 'Security' | 'Photos'>('Posts');
    const { userProfileStore } = useRootStore();
    const user = userProfileStore.profile;


    const actorRef = AuthenticateFactor.useActorRef();
    // const jwt = useSelector(AuthenticateFactor, (snapshot) => snapshot.context.jwt);

    return (
        <div className="bg-[#f0f2f5] min-h-screen">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto">
                    {/* Cover Photo Section */}
                    <div className="relative h-[300px] md:h-[350px] lg:rounded-b-2xl overflow-hidden bg-slate-900">
                        {/* Admin Overlay Pattern/Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-0"></div>
                        <img src={COVER_PHOTO_URL} alt="Cover" className="w-full h-full object-cover opacity-60" />

                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-mono border border-slate-700 flex items-center shadow-xl">
                            <ShieldCheckIcon className="h-3.5 w-3.5 mr-2 text-indigo-400" />
                            ADMIN VIEW ENABLED
                        </div>

                        <button className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-1.5 px-3 rounded-lg flex items-center z-10 text-sm border border-white/20 transition">
                            <CameraIcon className="h-4 w-4 mr-2" />
                            Edit Cover
                        </button>
                    </div>

                    {/* Profile Header Layout */}
                    <div className="px-4 pb-0 md:px-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-[70px] relative z-10 mb-4">

                            {/* Profile Picture */}
                            <div className="relative">
                                <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full border-4 border-white overflow-hidden bg-white shadow-2xl relative ring-2 ring-slate-100">
                                    <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                    {/* Online Indicator */}
                                    <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Name and Basic Info */}
                            <div className="flex-1 text-center md:text-left md:ml-6 mt-3 md:mt-0 md:mb-2">
                                <div className='flex flex-col md:flex-row items-center md:items-end gap-2'>
                                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">{user.name}</h1>
                                    <div className="flex gap-2 mb-1.5 align-bottom">
                                        <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                                            {ADMIN_DATA.role}
                                        </span>
                                        <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-green-200">
                                            {ADMIN_DATA.status}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-500 font-medium text-sm">
                                    {user.friends.toLocaleString()} friends • {user.mutual} mutual
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 mt-4 md:mb-3">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition shadow-sm text-sm"
                                    onClick={() => {
                                        console.log("logout now");
                                        actorRef.send({ type: 'LOGOUT' });
                                    }}
                                >
                                    <OutdentIcon className="h-4 w-4 mr-1.5" />
                                    Logout
                                </button>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition shadow-sm text-sm">
                                    <PlusIcon className="h-4 w-4 mr-1.5" />
                                    Add Story
                                </button>
                                <button className="bg-slate-100 hover:bg-slate-200 text-white font-bold py-2 px-4 rounded-lg flex items-center transition shadow-sm text-sm">
                                    <PencilIcon className="h-4 w-4 mr-1.5" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Navigation Tabs */}
                        <nav className="flex space-x-1 mt-1">
                            {['Posts', 'About', 'Analytics', 'Security', 'Photos'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-4 font-semibold text-sm transition flex items-center border-b-2 ${activeTab === tab
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-gray-500 border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    {tab === 'Analytics' && <ChartBarIcon className="h-4 w-4 mr-2" />}
                                    {tab === 'Security' && <LockClosedIcon className="h-4 w-4 mr-2" />}
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6 items-start">

                {/* Left Column: Admin Actions, Intro, Photos - STICKY */}
                <div className="w-full   flex-shrink-0 space-y-4 md:sticky md:top-4">
                    <AdminActionsCard />
                    <AdminNotesCard />
                    <IntroCard details={user.details} />
                    {/* <PhotosCard /> */}
                </div>



                {/* Right Column: Content */}


            </div>
        </div>
    );
});

export default PersonProfilePage;
