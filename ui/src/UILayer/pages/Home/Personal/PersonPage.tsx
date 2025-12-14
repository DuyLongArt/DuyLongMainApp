import { useState } from 'react';

import {
  Card,
  CardBody,
  Typography,
  Button,
  Chip,
  Progress
} from "@material-tailwind/react";

const PersonalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const user = {
    name: "Duy Long",
    title: "Developer",
    location: "Ha Noi Vietnam",
    // avatar: "../../../../DataLayer/LocalDataLayer/assets/Avatar.png", // Removed for minimalism if not displayed
    bio: "Passionate about creating beautiful, user-centered designs that make a difference. 5+ years crafting digital experiences."
  };

  const stats = [
    { label: "Projects", value: 42, color: "gray" },
    { label: "Clients", value: 38, color: "gray" },
    { label: "Cups of Coffee", value: 847, color: "gray" },
    { label: "Awards", value: 12, color: "gray" }
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
      title: "E-commerce App",
      description: "Redesign of shopping experience",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=80&fit=crop"
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics for B2B platform",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=80&fit=crop"
    },
    {
      title: "Brand Identity",
      description: "Visual identity for startup",
      status: "Review",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=80&fit=crop"
    }
  ];

  const achievements = [
    { title: "Designer of the Year", org: "Design Awards", date: "Jan 2024" },
    { title: "UX Excellence", org: "Tech Summit", date: "Sep 2023" },
    { title: "Innovation Award", org: "Creative Guild", date: "Jun 2023" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white min-h-screen">

        {/* Minimal Header */}
        <div className="pb-12 border-b border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <Typography variant="h2" className="text-gray-900 font-light tracking-tight mb-2">
                {user.name}
              </Typography>
              <Typography className="text-gray-500 font-normal text-lg">
                {user.title} <span className="mx-2 text-gray-300">|</span> {user.location}
              </Typography>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="text"
                className="text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-50"
              >
                Download CV
              </Button>
              <Button
                size="sm"
                className="bg-gray-900 text-white shadow-none hover:bg-gray-800 rounded-sm font-normal"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        {/* Minimal Navigation */}
        <div className="mb-12">
          <div className="flex gap-8 border-b border-gray-100">
            {['overview', 'projects', 'skills', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-wide transition-colors duration-200 ${activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900 font-medium'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <Typography variant="h5" className="text-gray-900 font-normal mb-6">
                    About
                  </Typography>
                  <Typography className="text-gray-500 leading-relaxed font-light text-lg">
                    {user.bio}
                  </Typography>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6 border-t border-gray-100">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <Typography variant="h3" className="text-gray-900 font-light mb-1">
                        {stat.value}
                      </Typography>
                      <Typography className="text-gray-400 text-xs tracking-wider uppercase">
                        {stat.label}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-gray-50 rounded-sm border border-gray-100">
                  <Typography variant="small" className="text-gray-400 uppercase tracking-widest mb-4 font-medium">
                    Status
                  </Typography>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <Typography className="text-gray-700 font-medium">Available for work</Typography>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current Project</span>
                        <span>75%</span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-800 w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentProjects.map((project, index) => (
                <Card key={index} className="bg-transparent shadow-none border border-gray-100 rounded-sm hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <CardBody className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Typography variant="h6" className="text-gray-900 font-medium">
                        {project.title}
                      </Typography>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm ${project.status === 'Completed' ? 'bg-green-50 text-green-700' :
                        project.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-600'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                    <Typography className="text-gray-500 font-light text-sm mb-4">
                      {project.description}
                    </Typography>
                    <a href="#" className="text-gray-900 text-sm font-medium border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                      View Case Study
                    </a>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Typography variant="h5" className="text-gray-900 font-normal mb-8">
                  Expertise
                </Typography>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <Typography className="text-gray-700 font-normal">
                          {skill.name}
                        </Typography>
                        <Typography className="text-gray-400 text-sm">
                          {skill.level}%
                        </Typography>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-sm">
                <Typography variant="h5" className="text-gray-900 font-normal mb-6">
                  Toolkit
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Sketch', 'Adobe CC', 'React', 'HTML/CSS', 'Notion', 'Linear'].map(tool => (
                    <span key={tool} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-sm rounded-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-6 p-6 border border-gray-100 hover:border-gray-200 transition-colors bg-white rounded-sm">
                  <div className="text-2xl text-gray-300">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Typography variant="h6" className="text-gray-900 font-medium">
                      {achievement.title}
                    </Typography>
                    <Typography className="text-gray-500 text-sm">
                      {achievement.org}
                    </Typography>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PersonalDashboard;