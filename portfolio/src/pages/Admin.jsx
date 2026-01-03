import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Briefcase, Layers, PenTool, Settings } from 'lucide-react';

const Admin = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const modules = [
        {
            title: 'User Management',
            icon: <Users size={24} />,
            desc: 'Manage admins & permissions',
            role: 'SUPER_ADMIN',
            path: '/admin/users'
        },
        {
            title: 'About Us',
            icon: <FileText size={24} />,
            desc: 'Edit company vision & stats',
            path: '/admin/about',
            permission: 'ABOUT_UPDATE'
        },
        {
            title: 'Careers',
            icon: <Briefcase size={24} />,
            desc: 'Post & manage jobs',
            path: '/admin/careers',
            permission: 'CAREER_CREATE'
        },
        {
            title: 'Projects',
            icon: <Layers size={24} />,
            desc: 'Update portfolio case studies',
            path: '/admin/projects',
            permission: 'PROJECT_UPDATE'
        },
        {
            title: 'Services',
            icon: <PenTool size={24} />,
            desc: 'Manage service offerings',
            path: '/admin/services',
            permission: 'SERVICE_UPDATE'
        },
        {
            title: 'Team Management',
            icon: <Users size={24} />,
            desc: 'Manage Engineers & Leadership',
            path: '/admin/team',
            permission: 'TEAM_UPDATE'
        },
        {
            title: 'Global Settings',
            icon: <Settings size={24} />,
            desc: 'Contact Info & Socials',
            path: '/admin/settings',
            permission: 'SETTINGS_UPDATE'
        }
    ];

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Founder Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome back. Manage your digital presence from here.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod, i) => {
                    if (mod.role && user.role !== mod.role) return null;
                    if (mod.permission && user.role !== 'SUPER_ADMIN' && !user.permissions?.includes(mod.permission)) return null;

                    return (
                        <div
                            key={i}
                            onClick={() => mod.path ? navigate(mod.path) : mod.action()}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                                {mod.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-1">{mod.title}</h3>
                            <p className="text-sm text-gray-500">{mod.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Admin;
