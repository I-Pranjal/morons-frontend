// Categories.jsx
import React from 'react';
import { Globe, BrainCog, Smartphone, GitBranch, Briefcase, Boxes, ArrowRight, TrendingUp } from 'lucide-react';

const categories = [
	{
		title: 'Web Development',
		description: 'Full-stack applications, APIs, and web platforms.',
		icon: <Globe className="h-6 w-6 text-blue-600" />,
		count: 8,
		trend: '+25%',
		color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
		textColor: 'text-blue-600',
	},
	{
		title: 'AI/ML Projects',
		description: 'Machine learning models, AI tools, and intelligent applications.',
		icon: <BrainCog className="h-6 w-6 text-purple-600" />,
		count: 6,
		trend: '+40%',
		color: 'bg-purple-50 border-purple-200 hover:border-purple-300',
		textColor: 'text-purple-600',
	},
	{
		title: 'Mobile Applications',
		description: 'Native and cross-platform mobile app development.',
		icon: <Smartphone className="h-6 w-6 text-green-600" />,
		count: 4,
		trend: '+15%',
		color: 'bg-green-50 border-green-200 hover:border-green-300',
		textColor: 'text-green-600',
	},
	{
		title: 'Open Source',
		description: 'Community contributions and open-source projects.',
		icon: <GitBranch className="h-6 w-6 text-orange-600" />,
		count: 3,
		trend: '+30%',
		color: 'bg-orange-50 border-orange-200 hover:border-orange-300',
		textColor: 'text-orange-600',
	},
	{
		title: 'Startup Ideas',
		description: 'MVP-ready concepts and scalable business solutions.',
		icon: <Briefcase className="h-6 w-6 text-red-600" />,
		count: 5,
		trend: '+20%',
		color: 'bg-red-50 border-red-200 hover:border-red-300',
		textColor: 'text-red-600',
	},
	{
		title: 'DevOps & Tools',
		description: 'Development tools, automation, and infrastructure.',
		icon: <Boxes className="h-6 w-6 text-indigo-600" />,
		count: 2,
		trend: '+35%',
		color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
		textColor: 'text-indigo-600',
	},
];

function Categories() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="text-center lg:text-left">
				<h2 className="text-3xl font-bold text-gray-900 mb-3">Project Categories</h2>
				<p className="text-lg text-gray-600">
					Explore different types of projects you can build to enhance your portfolio
				</p>
			</div>

			{/* Categories Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{categories.map((category, idx) => (
					<div
						key={idx}
						className={`${category.color} border-2 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer group`}
					>
						<div className="flex items-start justify-between mb-4">
							<div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
								{category.icon}
							</div>
							<div className="text-right">
								<div className="flex items-center gap-2 mb-1">
									<span className="bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
										{category.count}
									</span>
									<div className="flex items-center gap-1 text-green-600">
										<TrendingUp className="h-3 w-3" />
										<span className="text-xs font-semibold">{category.trend}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
								{category.title}
							</h3>
							<p className="text-gray-700 leading-relaxed text-sm">
								{category.description}
							</p>
						</div>

						<div className="flex items-center justify-between mt-6 pt-4 border-t border-white/50">
							<span className="text-sm font-medium text-gray-600">
								{category.count} project{category.count !== 1 ? 's' : ''} available
							</span>
							<div
								className={`flex items-center gap-1 ${category.textColor} font-medium text-sm group-hover:gap-2 transition-all`}
							>
								<span>Explore</span>
								<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Stats Summary */}
			<div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="text-3xl font-bold text-gray-900 mb-2">28</div>
						<div className="text-gray-600">Total Project Ideas</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-green-600 mb-2">+27%</div>
						<div className="text-gray-600">Growth This Month</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600 mb-2">6</div>
						<div className="text-gray-600">Active Categories</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Categories;