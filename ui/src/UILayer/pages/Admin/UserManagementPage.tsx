import React, { useState } from 'react';
import {
    UsersIcon,
    UserPlusIcon,
    ArrowPathIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import {
    CheckBadgeIcon,
    NoSymbolIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_USERS = [
    { id: 'USR-001', name: 'Duy Long', email: 'duylong@example.com', role: 'Super Admin', status: 'Active', lastLogin: '2 mins ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 'USR-002', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Moderator', status: 'Active', lastLogin: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 'USR-003', name: 'John Doe', email: 'john.doe@example.com', role: 'User', status: 'Inactive', lastLogin: '3 days ago', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 'USR-004', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Banned', lastLogin: '1 week ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 'USR-005', name: 'Mike Ross', email: 'mike.ross@example.com', role: 'Admin', status: 'Active', lastLogin: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 'USR-006', name: 'Rachel Zane', email: 'rachel@example.com', role: 'User', status: 'Active', lastLogin: '1 day ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
];

const STATS = [
    { label: 'Total Users', value: '24,592', change: '+12%', icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: '1,245', change: '+5%', icon: ArrowPathIcon, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'New Users', value: '450', change: '+18%', icon: UserPlusIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Banned', value: '12', change: '-2%', icon: NoSymbolIcon, color: 'text-red-600', bg: 'bg-red-50' },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Banned: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[status as keyof typeof styles] || 'bg-gray-100'}`}>
            {status}
        </span>
    );
};

const RoleBadge = ({ role }: { role: string }) => {
    if (role === 'Super Admin' || role === 'Admin') {
        return (
            <span className="flex items-center text-indigo-600 space-x-1">
                <ShieldCheckIcon className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase tracking-wide">{role}</span>
            </span>
        );
    }
    return <span className="text-gray-500 text-sm">{role}</span>;
};

const UserManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage access, roles, and view user insights.</p>
                </div>
                <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center shadow-lg shadow-indigo-200 transition">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add New User
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change} <span className="text-slate-400 font-normal">vs last month</span>
                            </span>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition">
                        <FunnelIcon className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Users Data Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Last Login</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_USERS.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition group">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-white shadow-sm" />
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition cursor-pointer" onClick={() => navigate('/admin/profile')}>{user.name}</p>
                                                <p className="text-slate-500 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={user.status} />
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">
                                        {user.lastLogin}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition">
                                            <button
                                                onClick={() => navigate('/admin/profile')}
                                                className="p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition"
                                                title="View Profile"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-md transition" title="Edit">
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-md transition" title="Suspend">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default UserManagementPage;
