import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const toggleChat = () => setOpen(!open);

  return (
    <>
      {/* Floating Chatbot Icon Button */}
      {!open && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-teal-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 transition z-50"
        >
          🤖
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Mr. Elite</p>
                <p className="text-xs text-gray-500">AI Execution Mentor</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-500">
            <p>Ask me to generate, plan, suggest, or review anything...</p>
            <p className="mt-1">I can help with resumes, roadmaps, practice problems, and more!</p>
          </div>

          {/* Input */}
          <div className="border-t px-4 py-3 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask me to generate, plan, suggest, or review anything..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
