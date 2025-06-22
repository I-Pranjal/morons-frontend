import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

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

function AssessmentReport() {
  return (
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
  )
}

export default AssessmentReport
