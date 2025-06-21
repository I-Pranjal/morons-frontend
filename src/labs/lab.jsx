import React, { useEffect, useState} from 'react';
import { Trophy, Play, BookOpen, Code, GitBranch, Globe, Users, Award, Clock, CheckCircle, TrendingUp, Calendar, Briefcase } from 'lucide-react';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useUser} from '../context/userContext';


export default function LearningLabs() {
    const { state } = useLocation();
    const [labs, setLabs] = useState([]); 
    const navigate = useNavigate();
    const { user } = useUser();

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


    useEffect(() => {
        setLabs(state?.recommendations);
    }, [state]);


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
        <div className="min-h-screen bg-neutral-900 text-white">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pt-20 sm:pt-24">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                            {user?.profilePictureUrl ? (
                                <img src={user?.profilePictureUrl} alt="User" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover" />
                            ) : (
                                <span className="text-black font-bold text-lg sm:text-xl">
                                    {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
                            <p className="text-gray-400 text-base sm:text-lg">{userProfile.level} • {userProfile.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-400 mb-6 text-center sm:text-left">Accelerating Professional Growth Through Structured Learning</p>
                </div>

                {/* Main Content - Full Width */}
                <div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="backdrop-blur-md bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                                        <stat.icon size={20} className="text-yellow-400 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                                        <p className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Learning Progress Card */}
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 sm:p-8 border border-white/10 mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                            <h2 className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">Learning Progress</h2>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-sm font-medium backdrop-blur-sm self-center sm:self-auto">
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
                        <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">Begin with foundation labs to establish your learning momentum and unlock advanced pathways.</p>
                    </div>
                    {/* Learning Labs */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">Personalized Learning Labs</h2>
                            <button className="px-4 py-2 border border-white/20 text-gray-300 hover:bg-white/10 rounded-lg font-medium transition-all backdrop-blur-sm self-center sm:self-auto">
                                View All Labs
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {state?.recommendations.map((lab, index ) => (
                                <div key={index} className="backdrop-blur-md bg-white/5 rounded-xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                                                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30 self-center sm:self-start">
                                                    {/* <lab.icon  size={24} className="text-yellow-400" /> */}
                                                    <Code  size={24} className="text-yellow-400" />
                                                </div>
                                                <div className="flex-1 text-center sm:text-left">
                                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                                                        <h3 className="text-lg sm:text-xl font-semibold text-white">{lab}</h3>
                                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                            <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getLevelColor(lab.level || "Foundation")}`}>
                                                                {lab.level || "Foundation"}
                                                            </span>
                                                            <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getStatusColor(lab.status || "Available")}`}>
                                                                {lab.status || "Available"} 
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{lab.description || "Master the fundamentals of programming including data structures, algorithms and object oriented programming principles."}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400 mb-4 sm:ml-16">
                                                <span className="flex items-center justify-center sm:justify-start space-x-1">
                                                    <BookOpen size={16} />
                                                    <span>{lab.modules || "12"} modules</span>
                                                </span>
                                                <span className="flex items-center justify-center sm:justify-start space-x-1">
                                                    <Clock size={16} />
                                                    <span>{lab.estimatedTime || "4-6 weeks"}</span>
                                                </span>
                                            </div>

                                            <div className="sm:ml-16">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-white font-medium">{lab.progress || "8"}/{lab.modules || "12"} modules</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
                                                    <div
                                                        className="bg-yellow-500 h-2 rounded-full"
                                                        style={{ width: `${(lab.progress / lab.modules || "0.75") * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className={`lg:ml-6 px-6 py-3 font-medium rounded-lg transition-all w-full sm:w-auto ${lab.status === 'Available' || lab == "REST APIs"
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                                                    : 'bg-white/10 text-gray-500 cursor-not-allowed backdrop-blur-sm'
                                                }`}
                                          onClick={() => navigate("/v8/lab", { state: { role: state.role, lab } })}
                                            disabled={lab.status === 'Locked' || lab == "REST APIs" ? false : true}
                                        >
                                            {lab.status === 'Available' || lab == "REST APIs" ? 'Start Lab →' : 'Locked'}
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