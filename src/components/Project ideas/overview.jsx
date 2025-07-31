import React, { useState } from 'react';
import { Sparkles, Target, Bot, ArrowRight, Zap, Lightbulb } from 'lucide-react';

function Overview() {
  const [prompt, setPrompt] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [techPreferences, setTechPreferences] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  const handleGenerate = async () => {
    // if (!prompt.trim()) return;
    setIsGenerating(true);

    const payload = {
      job_description: prompt,
      skill_level: skillLevel,
      preferred_technologies: techPreferences
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch('https://genios-agentic-server.onrender.com/project/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setGeneratedIdeas(data);
    } catch (err) {
      console.error('Error generating ideas:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Left Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI-Powered Project Ideas</h2>
              <p className="text-gray-600">
                Describe your interests and get personalized project suggestions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter the level of projects nad techstacks you know
              </label>
              {/* <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-28 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="E.g., Real-time app using Node.js, Docker, or scalable backend"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">{prompt.length}/500</div> */}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Technologies (comma-separated)
              </label>
              <input
                value={techPreferences}
                onChange={(e) => setTechPreferences(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Node.js, MongoDB, Kafka"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                techPreferences.length > 0 && !isGenerating
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Project Ideas
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Smart Recommendations</h2>
            <p className="text-gray-600">AI-powered suggestions to improve your project portfolio</p>
          </div>
        </div>

        <div className="space-y-4">
          {generatedIdeas.map((idea, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all group">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100">
                  <Lightbulb className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{idea.description}</p>
                  <ul className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {idea.tech_stack?.map((tech, i) => (
                      <li key={i} className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {generatedIdeas.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center">No suggestions yet. Fill the form and click Generate.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
