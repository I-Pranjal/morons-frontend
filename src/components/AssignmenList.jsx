import React from 'react';
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './footer';

const sampleAssessments = [
  {
    id: '1',
    loginId: 'stu101',
    title: 'Algebra & Trigonometry',
    subject: 'Mathematics',
    questions: 25,
    submissionDate: '20 June 2025',
    status: 'Completed',
  },
  {
    id: '2',
    loginId: 'stu102',
    title: 'Physics Fundamentals',
    subject: 'Science',
    questions: 30,
    submissionDate: '18 June 2025',
    status: 'Pending',
  },
  {
    id: '3',
    loginId: 'stu103',
    title: 'Literature Analysis',
    subject: 'English',
    questions: 20,
    submissionDate: '19 June 2025',
    status: 'In Progress',
  },
  {
    id: '4',
    loginId: 'stu104',
    title: 'World War History',
    subject: 'History',
    questions: 35,
    submissionDate: '17 June 2025',
    status: 'Completed',
  },
];

const CircularProgress = ({ percentage, size = 80, strokeWidth = 8, color = "#22c55e" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-neutral-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

const StudentAssessmentList = () => {
  const completedCount = sampleAssessments.filter(a => a.status === 'Completed').length;
  const inProgressCount = sampleAssessments.filter(a => a.status === 'In Progress').length;
  const pendingCount = sampleAssessments.filter(a => a.status === 'Pending').length;
  const overallPercentage = (completedCount / sampleAssessments.length) * 100;

  return (
    <div className="bg-neutral-900 shadow-2xl p-8 text-white  transition-all duration-500 border border-neutral-800 backdrop-blur-sm pt-24">
    <Navbar/>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 lg:mx-24">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-white mb-2">
            Student Assessments
          </h2>
          <p className="text-neutral-400 text-sm">Track your assessment progress</p>
        </div>
      </div>

      {/* Google Step Count Style Stats - At Top */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 lg:mx-24">
        {/* Completed Stats Card */}
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <CircularProgress 
              percentage={(completedCount / sampleAssessments.length) * 100} 
              color="#22c55e"
              size={90}
            />
            <div className="mt-4">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-300 text-sm font-medium">Completed</span>
              </div>
              <div className="text-green-400 font-bold text-2xl mb-1">{completedCount}</div>
              <div className="text-neutral-400 text-xs">out of {sampleAssessments.length} assessments</div>
            </div>
          </div>
        </div>

        {/* In Progress Stats Card */}
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border border-yellow-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-900/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <CircularProgress 
              percentage={(inProgressCount / sampleAssessments.length) * 100} 
              color="#eab308"
              size={90}
            />
            <div className="mt-4">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-yellow-300 text-sm font-medium">In Progress</span>
              </div>
              <div className="text-yellow-400 font-bold text-2xl mb-1">{inProgressCount}</div>
              <div className="text-neutral-400 text-xs">currently working on</div>
            </div>
          </div>
        </div>

        {/* Pending Stats Card */}
        <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <CircularProgress 
              percentage={(pendingCount / sampleAssessments.length) * 100} 
              color="#ef4444"
              size={90}
            />
            <div className="mt-4">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-300 text-sm font-medium">Pending</span>
              </div>
              <div className="text-red-400 font-bold text-2xl mb-1">{pendingCount}</div>
              <div className="text-neutral-400 text-xs">need attention</div>
            </div>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <CircularProgress 
              percentage={overallPercentage} 
              color="#3b82f6"
              size={90}
            />
            <div className="mt-4">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-300 text-sm font-medium">Overall Progress</span>
              </div>
              <div className="text-blue-400 font-bold text-2xl mb-1">{Math.round(overallPercentage)}%</div>
              <div className="text-neutral-400 text-xs">completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Table */}
      <div className="overflow-x-auto bg-neutral-800/50 rounded-xl border border-neutral-700 lg:mx-24">
        <table className="w-full">
          <thead className="bg-neutral-800/80">
            <tr className="text-left text-neutral-300 border-b border-neutral-600">
              <th className="pb-4 pt-4 px-6 text-sm font-semibold uppercase tracking-wide">Assessment Title</th>
              <th className="pb-4 pt-4 px-6 text-sm font-semibold uppercase tracking-wide text-center">Questions</th>
              <th className="pb-4 pt-4 px-6 text-sm font-semibold uppercase tracking-wide text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {sampleAssessments.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-neutral-700/50 transition-all duration-300 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.4s ease-out forwards'
                }}
              >
                <td className="py-2 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <div className="size-8 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center border border-neutral-600">
                        <span className="text-xl">
                          {item.subject === 'Mathematics' ? '📊' : 
                           item.subject === 'Science' ? '🔬' : 
                           item.subject === 'English' ? '📚' : 
                           item.subject === 'History' ? '🏛️' : '📖'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-md group-hover:text-neutral-300 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-sm">{item.subject}</p>
                    </div>
                  </div>
                </td>
                
                <td className="size-2 text-center">
                  <div className="inline-flex items-center justify-center size-8 bg-neutral-700/50 rounded-full border-2 border-neutral-600">
                    <span className="text-white font-bold text-sm">{item.questions}</span>
                  </div>
                </td>
                
                <td className="py-3 px-6 text-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 ${
                        item.status === 'Completed'
                          ? 'bg-green-900/80 text-green-300 border border-green-600/30 shadow-green-900/20'
                          : item.status === 'In Progress'
                          ? 'bg-yellow-800/80 text-yellow-200 border border-yellow-500/30 shadow-yellow-800/20'
                          : 'bg-red-900/80 text-red-300 border border-red-600/30 shadow-red-900/20'
                      }`}
                    >
                      {item.status === 'Completed' && <CheckCircle className="w-4 h-4 mr-2" />}
                      {item.status === 'In Progress' && <Clock className="w-4 h-4 mr-2" />}
                      {item.status === 'Pending' && <AlertCircle className="w-4 h-4 mr-2" />}
                      {item.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800/50 lg:mx-24">
        <div className="flex items-center space-x-4 text-sm text-neutral-400">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <span>•</span>
          <span>Total Assessments: {sampleAssessments.length}</span>
        </div>
        <button className="text-neutral-400 hover:text-white text-sm font-medium hover:underline transition-colors duration-200">
          View Full Report →
        </button>
      </div>
      <Footer/>
      

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StudentAssessmentList;