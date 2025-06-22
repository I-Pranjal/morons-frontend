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
    <div className="space-y-3">
      {/* <h3 className="text-lg font-semibold text-white mb-4">Recent Assessments</h3> */}
      <div className="grid gap-3">
        {sampleAssessments.map((item, index) => (
          <div 
            key={item.id}
            className="bg-neutral-800/50 rounded-lg border border-neutral-700 p-4 hover:bg-neutral-700/50 transition-all duration-300"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInUp 0.4s ease-out forwards'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="size-10 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-lg flex items-center justify-center border border-neutral-600">
                  <span className="text-lg">
                    {item.subject === 'Mathematics' ? '📊' : 
                     item.subject === 'Science' ? '🔬' : 
                     item.subject === 'English' ? '📚' : 
                     item.subject === 'History' ? '🏛️' : '📖'}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-neutral-400 text-xs">{item.subject}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  {/* <div className="size-6 bg-neutral-700/50 rounded-full border border-neutral-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{item.questions}</span>
                  </div> */}
                  <span className="text-xs text-neutral-500 mt-1 block">Q</span>
                </div>
                
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    item.status === 'Completed'
                      ? 'bg-green-900/60 text-green-300 border border-green-600/30'
                      : item.status === 'In Progress'
                      ? 'bg-yellow-800/60 text-yellow-200 border border-yellow-500/30'
                      : 'bg-red-900/60 text-red-300 border border-red-600/30'
                  }`}
                >
                  {item.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {item.status === 'In Progress' && <Clock className="w-3 h-3 mr-1" />}
                  {item.status === 'Pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssessmentReport