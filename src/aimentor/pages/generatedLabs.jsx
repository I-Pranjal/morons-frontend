import { Brain, Zap, Code, Trophy, Users, BookOpen, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const GenerateLabs = () => {
  const { state } = useLocation();
    const navigate = useNavigate();
//  const generatedLabs = [
//   {
//     id: 1,
//     lab_name: "Introduction to React",
//     level: 1,
//     estimated_time: 2,
//     description: "Learn the basics of React, including components, state, and props.",
//     modules: ["Components", "State", "Props", "JSX"],
//   },
//   {
//     id: 2,
//     lab_name: "Advanced JavaScript",
//     level: 3,
//     estimated_time: 4,
//     description: "Deep dive into JavaScript concepts like closures, async/await, and prototypes.",
//     modules: ["Closures", "Async/Await", "Prototypes", "Event Loop"],
//   },
//   {
//     id: 3,
//     lab_name: "CSS Animations",
//     level: 2,
//     estimated_time: 3,
//     description: "Master CSS animations to create smooth and interactive user experiences.",
//     modules: ["Keyframes", "Transitions", "Transforms", "Performance"],
//   },
//   {
//     id: 4,
//     lab_name: "Node.js Basics",
//     level: 1,
//     estimated_time: 5,
//     description: "Get started with Node.js and learn how to build server-side applications.",
//     modules: ["Modules", "File System", "HTTP", "Express"],
//   },
//   {
//     id: 5,
//     lab_name: "Database Design",
//     level: 4,
//     estimated_time: 6,
//     description: "Learn how to design efficient and scalable databases for your applications.",
//     modules: ["Normalization", "ER Diagrams", "SQL Basics", "Indexes"],
//   },
// ];

    const generatedLabs = state?.recommendations || [];

  const getLabIcon = (labName) => {
    if (labName.toLowerCase().includes('communication') || labName.toLowerCase().includes('soft')) return <Users className="h-8 w-8" />;
    if (labName.toLowerCase().includes('algorithm') || labName.toLowerCase().includes('coding')) return <Code className="h-8 w-8" />;
    if (labName.toLowerCase().includes('system') || labName.toLowerCase().includes('design')) return <Trophy className="h-8 w-8" />;
    if (labName.toLowerCase().includes('development') || labName.toLowerCase().includes('project')) return <BookOpen className="h-8 w-8" />;
    return <Brain className="h-8 w-8" />;
  };

  const getLabColor = (index) => {
    const colors = [
      "from-amber-400/40 to-neutral-800/40"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900/90 to-black/80 backdrop-blur-lg">
      {/* Header */}
      <header className="border-b border-amber-400/30 bg-neutral-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-amber-400/40 rounded-lg flex items-center justify-center backdrop-blur-md shadow-md">
              <Brain className="h-6 w-6 text-amber-400" />
            </div>
            <span className="text-xl font-bold text-amber-400 drop-shadow-md">The Moronss</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!generatedLabs.length ? (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Ready to Generate Your Labs?</h1>
            <p className="text-xl text-gray-300 mb-8">
              Our AI will create 5 personalized labs based on your profile, interests, and career goals.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {generatedLabs.map((lab, index) => (
              <div 
                key={index} 
                onClick={() => navigate("/v8/lab", { state: { role: state.role, lab } })}
                className={`bg-neutral-800 opacity-90 border border-amber-400/20 p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {/* <div className="text-amber-400">{getLabIcon(lab.lab_name)}</div> */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{lab}</h3>
                    <p className="text-sm text-gray-300">
                      Level {index} • 2h
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-4 text-gray-300">Deep dive into JavaScript concepts like closures, async/await, and prototypes.</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{lab.modules?.length || 12} modules</span>
                  <span>0% complete</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateLabs;
