import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Play, FileText, Lightbulb, Target, Code, BookOpen, Brain, ClipboardCheck, Wrench } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ModuleStep = () => {
  const [activeSection, setActiveSection] = useState('code-examples');
  const {state} = useLocation();
  const [moduleData, setModuleData] = useState({
    "_id": {
      "$oid": "684c599f64698ff9ffbc71de"
    },
    "topic": "REST APIs",
    "role": "Backend Developer",
    "lab_id": "rest_apis-675fae54",
    "title": "REST APIs Fundamentals",
    "introduction": "REST APIs is an essential concept in the Backend Developer toolkit. It enables developers to create scalable, stateless web services that follow standard HTTP protocols. Understanding REST principles is crucial for building modern web applications and microservices architectures.",
    "application": "REST APIs is commonly used in real-world scenarios related to backend developer work including web service integration, mobile app backends, microservices communication, and third-party service integrations. Companies like Netflix, Twitter, and Amazon extensively use REST APIs for their platform architectures.",
    "explanation": "The core idea behind REST APIs involves following six architectural constraints: Client-Server architecture, Statelessness, Cacheability, Uniform Interface, Layered System, and Code on Demand. REST uses standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs.",
    "case_study": "In a real-world backend developer project, REST APIs helps by enabling a social media platform to handle millions of requests efficiently. The API endpoints manage user authentication, post creation, timeline feeds, and real-time notifications while maintaining scalability and performance across distributed systems.",
    "code_example": "# Example REST API implementation using Flask\nfrom flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\n@app.route('/api/users', methods=['GET'])\ndef get_users():\n    return jsonify({'users': ['Alice', 'Bob', 'Charlie']})\n\n@app.route('/api/users', methods=['POST'])\ndef create_user():\n    user_data = request.json\n    return jsonify({'message': 'User created', 'user': user_data})\n\nif __name__ == '__main__':\n    app.run(debug=True)",
    "key_takeaways": [
      "REST APIs follow stateless client-server architecture principles",
      "HTTP methods map to CRUD operations for resource management",
      "Proper status codes and error handling are essential for API design",
      "Importance in Backend Developer context for scalable system design",
      "Typical use case in development for microservices communication"
    ],
    "thinking_challenge": "What is a potential limitation or edge case of using REST APIs when dealing with complex, nested data relationships that require multiple round trips to fetch related resources?",
    "assessment": [
      "Implement a custom version of REST APIs with authentication middleware",
      "Apply REST APIs to solve a practical e-commerce inventory management scenario",
      "Design and document a complete REST API for a blog platform"
    ],
    "mini_project": "Build a mini project involving REST APIs in the context of Backend Developer: Create a Task Management API with user authentication, CRUD operations for tasks, priority levels, and due date filtering capabilities."
  });

  const [progress, setProgress] = useState(56);
  const [currentStep, setCurrentStep] = useState(5);
  const totalSteps = 9;

  const sections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen, completed: true },
    { id: 'applications', label: 'Applications', icon: Target, completed: true },
    { id: 'explanation', label: 'Explanation', icon: FileText, completed: true },
    { id: 'case-studies', label: 'Case Studies', icon: Lightbulb, completed: true },
    { id: 'code-examples', label: 'Code Examples', icon: Code, completed: true },
    { id: 'key-takeaways', label: 'Key Takeaways', icon: CheckCircle, completed: true },
    { id: 'thinking-challenge', label: 'Thinking Challenge', icon: Brain, completed: false, active: activeSection === 'thinking-challenge' },
    { id: 'assessment', label: 'Assessment', icon: ClipboardCheck, completed: false, active: activeSection === 'assessment' },
    { id: 'mini-project', label: 'Mini Project', icon: Wrench, completed: false, active: activeSection === 'mini-project' }
  ];

  const [userInput, setUserInput] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const assessmentQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of Git?",
      options: [
        "A. To store files in the cloud.",
        "B. To manage changes to code and collaborate effectively.",
        "C. To compile code.",
        "D. To run tests."
      ],
      correctAnswer: "B"
    },
    {
      id: 2,
      question: "Which command is used to create a new branch in Git?",
      options: [
        "A. git commit",
        "B. git push",
        "C. git branch",
        "D. git merge"
      ],
      correctAnswer: "C"
    },
    {
      id: 3,
      question: "What is a pull request?",
      options: [
        "A. A request to download code from a repository",
        "B. A request to merge changes from one branch to another",
        "C. A request to delete a branch",
        "D. A request to create a new repository"
      ],
      correctAnswer: "B"
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

//   useEffect(() => {
//     console.log(state); 
//     const getLab = async () => {
//         console.log("Get lab is initiated"); 
//         const response = await axios.get(`http://127.0.0.1:8000/get-lab?topic=${state.lab}&role=${state.role}`);
//         console.log(response.data);
//         setModuleData(response.data);
//         console.log("Lab data set successfully");
//         console.log(moduleData);
//     }
//     getLab();
//   }, [state]);


useEffect(() => {
  const getLab = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-lab?topic=${state.lab}&role=${state.role}`);
      setModuleData(response.data.lab);
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  };

  if (state?.lab && state?.role) {
    getLab();
  } else {
    console.error("Invalid state: 'lab' or 'role' is missing");
  }
}, [state]);




  const renderSectionContent = () => {

    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Introduction</h3>
            <p className="text-gray-300">{moduleData.introduction || "Loading..."}</p>
          </div>
        );
      case 'applications':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Applications</h3>
            <p className="text-gray-300 leading-relaxed">{moduleData.application}</p>
          </div>
        );
      case 'explanation':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Explanation</h3>
            <p className="text-gray-300 leading-relaxed">{moduleData.explanation}</p>
          </div>
        );
      case 'case-studies':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Case Studies</h3>
            <p className="text-gray-300 leading-relaxed">{moduleData.case_study}</p>
          </div>
        );
      case 'code-examples':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Code Examples</h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{moduleData.code_example}</code>
              </pre>
            </div>
          </div>
        );
      case 'key-takeaways':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              {moduleData.key_takeaways.map((takeaway, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'thinking-challenge':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Critical Thinking</h3>
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Critical Thinking</h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                {moduleData.thinking_challenge || "Loading..."}
              </p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors">
                Continue →
              </button>
            </div>
          </div>
        );
      case 'assessment':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Assessment</h3>
            {assessmentQuestions.map((question, index) => (
              <div key={question.id} className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4">
                  {question.id}. {question.question}
                </h4>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label 
                      key={optionIndex}
                      className="flex items-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.charAt(0)}
                        checked={selectedAnswers[question.id] === option.charAt(0)}
                        onChange={() => handleAnswerSelect(question.id, option.charAt(0))}
                        className="mr-3 w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 focus:ring-yellow-500"
                      />
                      <span className="text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'mini-project':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Mini Project</h3>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Mini Project</h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                {moduleData.mini_project || "Loading..."}
              </p>
              
              <div className="bg-yellow-800/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">💡</span>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Hint:</h5>
                    <p className="text-gray-300 text-sm">
                      Start with a basic to-do list functionality. Then, add features incrementally, creating branches for each new 
                      feature. Use descriptive commit messages to track your progress. Finally, push your project to a remote 
                      repository like GitHub.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Describe your project approach or paste your solution...
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your project approach or paste your solution..."
                  className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6">
       <Navbar />
      </div>


      {/* Main Content */}
      <div className="px-4 md:px-6 py-8 mt-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">{moduleData.title}</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <span className="text-gray-400">{progress}% Complete</span>
            <span className="text-gray-500 text-sm">Last updated: Jun 8, 01:17 AM</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Section Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${
                  activeSection === section.id
                    ? 'bg-yellow-600 border-yellow-500 text-black' 
                    : section.completed 
                    ? 'bg-green-900/30 border-green-500 text-green-400 hover:bg-green-900/50' 
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                }`}
              > 
                <Icon className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium text-center">{section.label}</div>
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
        <div className="bg-gray-800 rounded-lg border-2 border-yellow-500 p-6">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="bg-yellow-600 p-2 rounded-lg mr-3">
              {sections.find(s => s.id === activeSection)?.icon && 
                React.createElement(sections.find(s => s.id === activeSection).icon, { className: "w-6 h-6 text-black" })
              }
            </div>
            <div>
              <h2 className="text-xl font-bold text-white text-center md:text-left">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <span className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-medium">
                Step {activeSection === 'thinking-challenge' ? 7 : activeSection === 'assessment' ? 8 : activeSection === 'mini-project' ? 9 : currentStep}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleStep;