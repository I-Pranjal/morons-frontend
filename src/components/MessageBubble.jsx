import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { MessageSquare, Info, Code, Clock } from 'lucide-react';

function MessageBubble({ message }) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isJarvis = message.sender === 'assistant' || message.person === 'assistant';
  
  // Debugging helpers
  const [showDebug, setShowDebug] = useState(false);
  const messageType = isJarvis ? 'Assistant' : 'User';
  const messageLength = message.content?.length || 0;
  
  // Format timestamp
  const formattedTime = message.createdAt 
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
  
  // Parse markdown content
  const htmlContent = marked.parse(message.content || ''); 

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex ${isJarvis ? 'justify-start' : 'justify-end'} transition-all duration-300 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        className={`relative max-w-3/4 md:max-w-2/3 rounded-2xl shadow-lg ${
          isJarvis
            ? 'bg-white/90 backdrop-blur-md border border-gray-200'
            : 'bg-black text-white backdrop-blur-md border border-gray-800'
        } transition-all duration-300 hover:shadow-xl`}
        style={{
          fontFamily: "'Poppins', sans-serif",
          transform: 'perspective(1000px) rotateX(0deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Header with icon, time and debug toggle */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-gray-200/20">
          <div className="flex items-center">
            <MessageSquare size={14} className={`${isJarvis ? 'text-gray-700' : 'text-gray-300'} mr-2`} />
            <span className={`text-xs ${isJarvis ? 'text-gray-700' : 'text-gray-300'} font-medium`}>{messageType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className={`${isJarvis ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-xs ${isJarvis ? 'text-gray-500' : 'text-gray-400'}`}>{formattedTime}</span>
            <button 
              onClick={() => setShowDebug(!showDebug)} 
              className={`ml-2 p-1 rounded-full hover:bg-gray-200/20 ${isJarvis ? 'text-gray-500' : 'text-gray-400'}`}
            >
              <Info size={12} />
            </button>
          </div>
        </div>
        
        {/* Message content */}
        <div className="px-4 py-3">
          {isJarvis ? (
            <div
              className="prose prose-sm md:prose break-words max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <p className="text-sm md:text-base break-words text-white">
              {message.content}
            </p>
          )}
        </div>
        
        {/* Debug panel - collapsed by default */}
        {showDebug && (
          <div className={`px-4 py-2 mt-1 text-xs rounded-b-lg ${
            isJarvis ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
          } border-t ${isJarvis ? 'border-gray-200' : 'border-gray-700'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Code size={12} />
              <span className="font-medium">Debug Info</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>Type: {messageType}</div>
              <div>Length: {messageLength} chars</div>
              <div>Chat Type: {message.chatType || 'Default'}</div>
              <div>ID: {message.id?.substring(0, 8) || 'N/A'}</div>
            </div>
          </div>
        )}
        
        {/* Glass reflection effect overlay */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isJarvis 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
            borderRadius: 'inherit',
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
}

// Add Poppins font to the document
const PoppinsFontLoader = () => {
  React.useEffect(() => {
    // Add Poppins font from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return null;
};

// Export the component along with the font loader
const EnhancedMessageBubble = (props) => {
  return (
    <>
      <PoppinsFontLoader />
      <MessageBubble {...props} />
    </>
  );
};

export default EnhancedMessageBubble;