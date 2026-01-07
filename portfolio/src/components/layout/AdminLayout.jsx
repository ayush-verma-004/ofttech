import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Users, FileText, Briefcase, Layers, PenTool,
    Settings, LogOut, Menu, X, Home
} from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/admin/users', label: 'User Management', icon: <Users size={20} />, role: 'SUPER_ADMIN' },
        { path: '/admin/about', label: 'About Us', icon: <FileText size={20} />, permission: 'ABOUT_UPDATE' },
        { path: '/admin/careers', label: 'Careers', icon: <Briefcase size={20} />, permission: 'CAREER_CREATE' },
        { path: '/admin/projects', label: 'Projects', icon: <Layers size={20} />, permission: 'PROJECT_UPDATE' },
        { path: '/admin/services', label: 'Services', icon: <PenTool size={20} />, permission: 'SERVICE_UPDATE' },
        { path: '/admin/team', label: 'Team', icon: <Users size={20} />, permission: 'TEAM_UPDATE' },
        { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} />, permission: 'SETTINGS_UPDATE' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-100 gap-3">
                    <img src="/logo.svg" alt="Oft Tech" className="h-8 w-auto" />
                    <span className="text-xl font-bold tracking-tight text-primary">Oft Tech</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        // Role Check
                        if (item.role && user.role !== item.role) return null;

                        // Permission Check
                        // If item has permission req, user must be SUPER_ADMIN OR have that permission
                        if (item.permission && user.role !== 'SUPER_ADMIN' && !user.permissions?.includes(item.permission)) return null;

                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-secondary/10 text-secondary'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                            {user.username?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user.role?.replace('_', ' ').toLowerCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
