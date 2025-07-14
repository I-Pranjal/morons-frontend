import { Calendar, Folder, Eye, Link2, Download, TrendingUp } from 'lucide-react';

const resumes = [
  {
    title: 'ML Engineer Resume v3.0',
    tags: ['Active', 'ATS Optimized'],
    ats: '94%',
    date: '2024-01-15',
    category: 'ML Roles at Big Tech',
  },
  {
    title: 'Full Stack Developer Resume v2.1',
    tags: ['Archived', 'General SDE'],
    ats: '87%',
    date: '2024-01-10',
    category: 'Full Stack Developer',
  },
];

const badgeStyles = {
  Active: 'bg-red-600 text-white',
  Archived: 'bg-gray-900 text-white',
  'ATS Optimized': 'bg-white   text-gray-900',
  'General SDE': 'bg-white   text-gray-900',
};

export default function OverviewTab() {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow mt-4 ">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📝 Recent Resume Versions
        </h2>
        <p className="text-gray-500 text-sm">
          Your latest resume versions across all categories
        </p>
      </div>

      {/* Resume Cards */}
      <div className="space-y-3">
        {resumes.map((resume, index) => (
          <div
            key={index}
            className="p-4 bg-white   rounded-lg flex justify-between items-start hover:shadow-sm transition"
          >
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-1">
                {resume.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {resume.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      badgeStyles[tag] || 'bg-gray-100 text-gray-800'
                    } ${tag === 'ATS Optimized' || tag === 'General SDE' ? ' ' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> ATS: {resume.ats}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {resume.date}
                </span>
                <span className="flex items-center gap-1">
                  <Folder className="w-4 h-4" /> {resume.category}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-1">
              <Eye className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
              <Link2 className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
              <Download className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
