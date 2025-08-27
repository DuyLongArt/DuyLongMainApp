import React, { useState } from 'react';

import { 
  Card, 
  CardBody, 
  Typography, 
  Button, 
  Avatar, 
  Progress,
  Chip,
  IconButton
} from "@material-tailwind/react";
// import { AvatarImage } from '../../../../DataLayer/LocalDataLayer/assets/Avatar.png';

const PersonalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const user = {
    name: "Duy Long",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    avatar: "../../../../DataLayer/LocalDataLayer/assets/Avatar.png",
    bio: "Passionate about creating beautiful, user-centered designs that make a difference. 5+ years crafting digital experiences."
  };

  const stats = [
    { label: "Projects Completed", value: 42, color: "purple" },
    { label: "Happy Clients", value: 38, color: "pink" },
    { label: "Coffee Cups", value: 847, color: "amber" },
    { label: "Design Awards", value: 12, color: "indigo" }
  ];

  const skills = [
    { name: "UI/UX Design", level: 95 },
    { name: "Figma", level: 90 },
    { name: "React", level: 75 },
    { name: "Typography", level: 88 },
    { name: "User Research", level: 82 }
  ];

  const recentProjects = [
    {
      title: "E-commerce Mobile App",
      description: "Complete redesign of shopping experience",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=80&fit=crop"
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard for B2B platform",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=80&fit=crop"
    },
    {
      title: "Brand Identity System",
      description: "Complete visual identity for startup",
      status: "Review",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=80&fit=crop"
    }
  ];

  const achievements = [
    { title: "Designer of the Year 2024", org: "Design Awards", date: "Jan 2024" },
    { title: "UX Excellence Award", org: "Tech Summit", date: "Sep 2023" },
    { title: "Innovation in Design", org: "Creative Guild", date: "Jun 2023" }
  ];

  return (
       <div className="w-[1300px] mx-auto px-4 py-6">
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
            
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <Avatar
                src={user.avatar}
                alt={user.name}
                size="lg"
                className="ring-4 ring-white/20 shadow-lg"
              /> */}
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  {user.name}
                </Typography>
                <Typography className="text-purple-100">
                  {user.title}
                </Typography>
                <Typography className="text-purple-200 text-sm flex items-center">
                  📍 {user.location}
                </Typography>
              </div>
            </div>
            <div className="hidden md:flex space-x-2">
              <Button 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outlined"
              >
                💼 Hire Me
              </Button>
              <Button 
                size="sm" 
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                📱 Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
          {['overview', 'projects', 'skills', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bio Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <Typography variant="h5" className="text-gray-800 mb-4 font-bold">
                    About Me ✨
                  </Typography>
                  <Typography className="text-gray-600 leading-relaxed mb-6">
                    {user.bio}
                  </Typography>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                        <Typography variant="h4" className={`font-bold text-${stat.color}-600`}>
                          {stat.value}
                        </Typography>
                        <Typography className="text-gray-600 text-sm">
                          {stat.label}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-indigo-600">
                <CardBody className="p-6 text-white">
                  <Typography variant="h6" className="mb-4 font-bold">
                    🚀 Quick Actions
                  </Typography>
                  <div className="space-y-3">
                    <Button 
                      fullWidth 
                      className="bg-white/20 hover:bg-white/30 text-white"
                      variant="outlined"
                    >
                      📋 View Resume
                    </Button>
                    <Button 
                      fullWidth 
                      className="bg-white/20 hover:bg-white/30 text-white"
                      variant="outlined"
                    >
                      🎨 Portfolio
                    </Button>
                    <Button 
                      fullWidth 
                      className="bg-white text-purple-600 hover:bg-gray-100"
                    >
                      💬 Let's Chat
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Current Status */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <Typography variant="h6" className="text-gray-800 mb-4 font-bold">
                    🎯 Current Focus
                  </Typography>
                  <div className="space-y-3">
                    <Chip 
                      value="Available for Projects" 
                      className="bg-green-100 text-green-800 w-full justify-center"
                    />
                    <Typography className="text-gray-600 text-sm">
                      Working on: SaaS Dashboard Design
                    </Typography>
                    <Progress 
                      value={75} 
                      color="purple"
                      className="bg-purple-50"
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Chip 
                      value={project.status}
                      className={`${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}
                    />
                  </div>
                </div>
                <CardBody className="p-6">
                  <Typography variant="h6" className="text-gray-800 mb-2 font-bold">
                    {project.title}
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    {project.description}
                  </Typography>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardBody className="p-6">
                <Typography variant="h5" className="text-gray-800 mb-6 font-bold">
                  💪 Technical Skills
                </Typography>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <Typography className="text-gray-700 font-medium">
                          {skill.name}
                        </Typography>
                        <Typography className="text-purple-600 font-bold">
                          {skill.level}%
                        </Typography>
                      </div>
                      <Progress 
                        value={skill.level} 
                        color="purple"
                        className="bg-purple-50"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-indigo-600">
              <CardBody className="p-6 text-white">
                <Typography variant="h5" className="mb-6 font-bold">
                  🛠️ Tools & Software
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  {['Figma', 'Sketch', 'Adobe CC', 'Framer', 'Principle', 'InVision', 'Miro', 'Notion'].map((tool, index) => (
                    <div key={index} className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors">
                      <Typography className="font-medium">
                        {tool}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Typography variant="h4">🏆</Typography>
                  </div>
                  <Typography variant="h6" className="text-gray-800 mb-2 font-bold">
                    {achievement.title}
                  </Typography>
                  <Typography className="text-gray-600 mb-2">
                    {achievement.org}
                  </Typography>
                  <Chip 
                    value={achievement.date}
                    className="bg-purple-100 text-purple-800"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button
      <div className="fixed bottom-6 right-6">
        <IconButton 
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-xl w-14 h-14"
        >
          <Typography variant="h5">💬</Typography>
        </IconButton>
    //   </div> */}
    </div>
    </div>
  );
};

export default PersonalDashboard;