import React, { useState } from 'react';
import { User, Settings, Plus, MoreVertical, Star, Heart, Edit, Trash2, UserPlus } from 'lucide-react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const Widget1Page = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showMenu, setShowMenu] = useState(null);

    // Mock avatar data
    const avatars = [
        { id: 1, name: 'Alex Chen', role: 'Ice Master', image: '🧊', status: 'online', favorite: true },
        { id: 2, name: 'Sarah Kim', role: 'Frost Designer', image: '❄️', status: 'away', favorite: false },
        { id: 3, name: 'Mike Johnson', role: 'Crystal Architect', image: '💎', status: 'offline', favorite: true },
        { id: 4, name: 'Emma Wilson', role: 'Ice Sculptor', image: '🔷', status: 'online', favorite: false },
    ];

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const toggleMenu = (avatarId) => {
        setShowMenu(showMenu === avatarId ? null : avatarId);
    };

    return (
        <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <Box className="absolute inset-0 pointer-events-none">
                <Box className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full animate-pulse"></Box>
                <Box className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-cyan-200/25 to-blue-200/15 rounded-full animate-bounce"></Box>
                <Box className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-cyan-300/10 rounded-full animate-ping"></Box>
            </Box>

            <Box className="relative z-10">
                {/* Header */}
                <header className="p-6">
                    <Box className="max-w-7xl mx-auto flex items-center justify-between">
                        <Box className="flex items-center space-x-4">
                            <Box className="text-4xl">❄️</Box>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                                Ice Portal
                            </h1>
                        </Box>

                        <Box className="flex items-center space-x-4">
                            <Button className="p-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg">
                                <Settings className="w-6 h-6 text-blue-600" />
                            </Button>
                            <Button className="p-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg">
                                <User className="w-6 h-6 text-blue-600" />
                            </Button>
                        </Box>
                    </Box>
                </header>

                {/* Welcome Section */}
                <section className="px-6 mb-12">
                    <Box className="max-w-7xl mx-auto">
                        <Box className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl">
                            <Box className="text-center">
                                <h2 className="text-5xl font-light text-blue-800 mb-4 tracking-wide">
                                    Welcome to the Ice Realm
                                </h2>
                                <p className="text-xl text-blue-600/80 max-w-2xl mx-auto">
                                    Manage your frozen kingdom with elegance and precision
                                </p>
                            </Box>
                        </Box>
                    </Box>
                </section>

                {/* Avatar Management Section */}
                <section className="px-6">
                    <Box className="max-w-7xl mx-auto">
                        <Box className="flex items-center mb-8">
                            <User className="w-8 h-8 text-blue-600 mr-3" />
                            <h3 className="text-3xl font-semibold text-blue-800">Avatar Management</h3>
                        </Box>

                        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {avatars.map((avatar, index) => (
                                <Box
                                    key={avatar.id}
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden"
                                    onClick={() => handleAvatarClick(avatar)}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Card Background Glow */}
                                    <Box className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></Box>

                                    <Box className="relative z-10">
                                        {/* Avatar */}
                                        <Box className="flex justify-center mb-4">
                                            <Box className="relative">
                                                <Box className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center text-3xl border-4 border-white/70 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    {avatar.image}
                                                </Box>
                                                {/* Status Indicator */}
                                                <Box className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                                                    avatar.status === 'online' ? 'bg-green-500' :
                                                        avatar.status === 'away' ? 'bg-yellow-500' :
                                                            'bg-gray-400'
                                                }`}></Box>
                                            </Box>
                                        </Box>

                                        {/* Name and Role */}
                                        <h4 className="text-xl font-semibold text-blue-800 text-center mb-1">
                                            {avatar.name}
                                        </h4>
                                        <p className="text-blue-600/70 text-center mb-4 text-sm">
                                            {avatar.role}
                                        </p>

                                        {/* Action Buttons */}
                                        <Box className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors duration-200">
                                                <Edit className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button className={`p-2 rounded-lg transition-colors duration-200 ${
                                                avatar.favorite ? 'bg-pink-500/20 hover:bg-pink-500/30' : 'bg-blue-500/10 hover:bg-blue-500/20'
                                            }`}>
                                                <Heart className={`w-4 h-4 ${avatar.favorite ? 'text-pink-500 fill-current' : 'text-blue-600'}`} />
                                            </Button>
                                            <Button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </section>

                {/* Floating Action Button */}
                <Button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group">
                    <Plus className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-300" />
                </Button>

                {/* Selected Avatar Details Modal */}
                {selectedAvatar && (
                    <Box className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedAvatar(null)}>
                        <Box className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 border border-white/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <Box className="text-center">
                                <Box className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-6 border-4 border-white/70 shadow-lg">
                                    {selectedAvatar.image}
                                </Box>
                                <h3 className="text-3xl font-bold text-blue-800 mb-2">{selectedAvatar.name}</h3>
                                <p className="text-blue-600 mb-6">{selectedAvatar.role}</p>

                                <Box className="flex justify-center space-x-4">
                                    <Button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200">
                                        Edit Profile
                                    </Button>
                                    <Button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200" onClick={() => setSelectedAvatar(null)}>
                                        Close
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Widget1Page;