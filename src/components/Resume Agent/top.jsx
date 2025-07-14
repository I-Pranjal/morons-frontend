import { FileText, Folder, LayoutGrid, Clock, Target } from 'lucide-react';

const stats = [
  {
    icon: <Target className="h-5 w-5 text-red-500" />,
    label: 'ATS Score',
    value: '94/100',
    subtext: 'Excellent optimization',
    bg: 'bg-red-50',
  },
  {
    icon: <Folder className="h-5 w-5 text-green-600" />,
    label: 'Categories',
    value: '3',
    subtext: 'Organized themes',
    bg: 'bg-green-50',
  },
  {
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    label: 'Total Resumes',
    value: '7',
    subtext: 'All versions',
    bg: 'bg-blue-50',
  },
  {
    icon: <LayoutGrid className="h-5 w-5 text-purple-600" />,
    label: 'Templates Used',
    value: '5',
    subtext: 'ML/FAANG focused',
    bg: 'bg-purple-50',
  },
  {
    icon: <Clock className="h-5 w-5 text-orange-500" />,
    label: 'Last Updated',
    value: '2h ago',
    subtext: 'Ready for applications',
    bg: 'bg-orange-50',
  },
];

export const Top = () =>  {
  return (
    <div className="px-6 py-10 bg-white">
        <div className="mb-8 flex flex-col sm:flex-row justify-between">
          <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span>🧠</span> Resume Agent
          </h2>
          <p className="text-gray-500 text-sm mt-1">AI-powered resume agent assistant</p>
          </div>
          <button 
            className="mt-4 sm:mt-0 px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-600 transition w-full sm:w-auto"
            onClick={() => window.location.href = '/resume'}
          >
           Resume Maker
          </button>
        </div>

        {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 ${item.bg} shadow-sm border border-gray-200`}
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <p className="text-sm text-gray-500">{item.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
