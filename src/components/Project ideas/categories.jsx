// Categories.jsx
import React from 'react';
import { Globe, BrainCog, Smartphone, GitBranch, Briefcase, Boxes } from 'lucide-react';

const categories = [
  {
    title: 'Web Development',
    description: 'Full-stack applications, APIs, and web platforms.',
    icon: <Globe className="h-5 w-5 text-red-700" />,
    count: 8,
  },
  {
    title: 'AI/ML Projects',
    description: 'Machine learning models, AI tools, and intelligent applications.',
    icon: <BrainCog className="h-5 w-5 text-red-700" />,
    count: 6,
  },
  {
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile app development.',
    icon: <Smartphone className="h-5 w-5 text-red-700" />,
    count: 4,
  },
  {
    title: 'Open Source',
    description: 'Community contributions and open-source projects.',
    icon: <GitBranch className="h-5 w-5 text-red-700" />,
    count: 3,
  },
  {
    title: 'Startup Ideas',
    description: 'MVP-ready concepts and scalable business solutions.',
    icon: <Briefcase className="h-5 w-5 text-red-700" />,
    count: 5,
  },
];

function Categories() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Project Categories</h2>
      <p className="text-sm text-gray-600 mb-6">Explore different types of projects you can build</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {cat.icon}
                <h3 className="text-md font-semibold text-gray-800">{cat.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
            <span className="bg-gray-900 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {cat.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;