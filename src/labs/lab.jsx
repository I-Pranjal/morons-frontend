import React, { useState } from 'react';
import { Trophy, Play, BookOpen, Code, GitBranch, Globe, Users, Award, Clock, CheckCircle, TrendingUp, Calendar, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LearningLabs() {
    const [userProfile] = useState({
        name: 'Alex Johnson',
        level: 'Level 3',
        role: 'Software Engineering Intern',
        avatar: null,
        email: 'alex.johnson@company.com'
    });

    const stats = [
        { label: 'Labs Completed', value: '0/5', icon: CheckCircle },
        { label: 'Modules Done', value: '0/60', icon: BookOpen },
        { label: 'Overall Progress', value: '0%', icon: TrendingUp }
    ];

    const labs = [
        {
            id: 1,
            title: 'Python Fundamentals',
            description: 'Master the fundamentals of Python programming, including data structures, algorithms, and object-oriented programming principles.',
            modules: 12,
            level: 'Foundation',
            progress: 0,
            status: 'Available',
            icon: Code,
            estimatedTime: '4-6 weeks'
        },
        {
            id: 2,
            title: 'Version Control & Collaboration',
            description: 'Learn professional Git workflows, code review processes, and collaborative development practices used in industry.',
            modules: 12,
            level: 'Foundation',
            progress: 0,
            status: 'Available',
            icon: GitBranch,
            estimatedTime: '2-3 weeks'
        },
        {
            id: 3,
            title: 'Full-Stack Web Development',
            description: 'Build modern web applications using React, Node.js, and database technologies with industry best practices.',
            modules: 12,
            level: 'Intermediate',
            progress: 0,
            status: 'Locked',
            icon: Globe,
            estimatedTime: '6-8 weeks'
        },
        {
            id: 4,
            title: 'Technical Interview Mastery',
            description: 'Comprehensive preparation for technical interviews including data structures, algorithms, and system design.',
            modules: 12,
            level: 'Advanced',
            progress: 0,
            status: 'Locked',
            icon: Users,
            estimatedTime: '4-5 weeks'
        }
    ];

    const getLevelColor = (level) => {
        switch (level) {
            case 'Foundation': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'Intermediate': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            case 'Advanced': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'Locked': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 pt-24">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                            {userProfile.avatar ? (
                                <img src={userProfile.avatar} alt="User" className="w-16 h-16 rounded-xl object-cover" />
                            ) : (
                                <span className="text-black font-bold text-xl">
                                    {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome back, {userProfile.name}</h1>
                            <p className="text-gray-400 text-lg">{userProfile.level} • {userProfile.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-400 mb-6">Accelerating Professional Growth Through Structured Learning</p>
                </div>

                {/* Main Content - Full Width */}
                <div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                                        <stat.icon size={24} className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                        <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Learning Progress Card */}
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-8 border border-white/10 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Learning Progress</h2>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                                Just Getting Started
                            </span>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Overall Completion</span>
                                <span className="text-white font-medium">0%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
                                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <p className="text-gray-400">Begin with foundation labs to establish your learning momentum and unlock advanced pathways.</p>
                    </div>

                    {/* Learning Labs */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Personalized Learning Labs</h2>
                            <button className="px-4 py-2 border border-white/20 text-gray-300 hover:bg-white/10 rounded-lg font-medium transition-all backdrop-blur-sm">
                                View All Labs
                            </button>
                        </div>

                        <div className="space-y-6">
                            {labs.map((lab) => (
                                <div key={lab.id} className="backdrop-blur-md bg-white/5 rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                                                    <lab.icon size={24} className="text-yellow-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-white">{lab.title}</h3>
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getLevelColor(lab.level)}`}>
                                                            {lab.level}
                                                        </span>
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getStatusColor(lab.status)}`}>
                                                            {lab.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 leading-relaxed">{lab.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4 ml-16">
                                                <span className="flex items-center space-x-1">
                                                    <BookOpen size={16} />
                                                    <span>{lab.modules} modules</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock size={16} />
                                                    <span>{lab.estimatedTime}</span>
                                                </span>
                                            </div>

                                            <div className="ml-16">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-white font-medium">{lab.progress}/{lab.modules} modules</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
                                                    <div
                                                        className="bg-yellow-500 h-2 rounded-full"
                                                        style={{ width: `${(lab.progress / lab.modules) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className={`ml-6 px-6 py-3 font-medium rounded-lg transition-all ${lab.status === 'Available'
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                                                    : 'bg-white/10 text-gray-500 cursor-not-allowed backdrop-blur-sm'
                                                }`}
                                            disabled={lab.status === 'Locked'}
                                        >
                                            {lab.status === 'Available' ? 'Start Lab →' : 'Locked'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}