import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Plus, BookOpen, Briefcase, MessageCircle, X } from 'lucide-react';

export function ModifiedInputArea({
  inputValue,
  setInputValue,
  handleSendMessage,
  isListening,
  toggleListening,
  activeMicAnimation
}) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showMobileFeatures, setShowMobileFeatures] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const placeholders = {
    resumeAnalysis: "Upload your resume for analysis...",
    jobHunter: "Tell me what job you're looking for...",
    mockInterview: "Let's prepare for your interview...",
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(activeFeature === feature ? null : feature);
    setInputValue(activeFeature === feature ? '' : placeholders[feature] || '');
    setShowMobileFeatures(false);
    
    // Focus the input field after a short delay to allow state updates
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setSelectedFiles(prev => [...prev, ...files]);
    setInputValue(`I've uploaded ${files.length} file(s). Please analyze them.`);
    setShowMobileFeatures(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileRemove = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setSelectedFiles(prev => [...prev, ...droppedFiles]);
      setInputValue(`I've uploaded ${droppedFiles.length} file(s). Please analyze them.`);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (isMobile) {
      setShowMobileFeatures(false);
    }
  };

  return (
    <div
      className="p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={() => setDragOver(false)}
    >
      {/* Uploaded File Previews */}
      {selectedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative group w-28 h-28 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 p-2"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                <div className="text-xs text-gray-700 text-center p-2 truncate">
                  {file.name}
                </div>
              )}
              <button
                onClick={() => handleFileRemove(idx)}
                className="absolute top-1 right-1 text-white bg-gray-700 bg-opacity-70 rounded-full p-1 hover:bg-opacity-90 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area Container */}
      <div 
        ref={inputContainerRef}
        className={`relative rounded-xl border border-gray-200 bg-white shadow-sm ${dragOver ? 'ring-2 ring-gray-400' : ''}`}
      >
        {/* Input Content - Responsive Layout */}
        <div className="flex items-center px-3 py-2">
          {/* Left side - Plus button (mobile only) */}
          {isMobile && (
            <button 
              onClick={() => setShowMobileFeatures(!showMobileFeatures)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          )}
          
          {/* Input field - Always visible */}
          <div className="flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={handleInputFocus}
              placeholder={placeholders[activeFeature] || "Ask anything..."}
              className="w-full py-3 px-2 focus:outline-none bg-transparent text-base"
            />
          </div>
          
          {/* Desktop Features Toolbar - on right side before mic */}
          {!isMobile && (
            <div className="flex items-center gap-2 py-1 flex-shrink-0 mr-2">
              <button
                onClick={handleFileUpload}
                className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm flex-shrink-0"
              >
                <Plus size={14} />
                <span>Files</span>
              </button>
              <button
                onClick={() => handleFeatureClick('resumeAnalysis')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm flex-shrink-0 ${
                  activeFeature === 'resumeAnalysis' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BookOpen size={14} />
                <span>Resume Analysis</span>
              </button>
              <button
                onClick={() => handleFeatureClick('jobHunter')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm flex-shrink-0 ${
                  activeFeature === 'jobHunter' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Briefcase size={14} />
                <span>Job Hunter</span>
              </button>
              <button
                onClick={() => handleFeatureClick('mockInterview')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm flex-shrink-0 ${
                  activeFeature === 'mockInterview' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <MessageCircle size={14} />
                <span>Mock Interview</span>
              </button>
            </div>
          )}
          
          {/* Right side actions */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Mic button */}
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition ${
                isListening ? 'bg-gray-200 text-black' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Mic size={20} className={activeMicAnimation ? 'animate-pulse' : ''} />
            </button>
            
            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`p-2 rounded-full transition ${
                inputValue.trim() ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Feature popup - only shows on mobile */}
        {isMobile && showMobileFeatures && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-wrap gap-2 z-10 animate-fadeIn">
            <button
              onClick={handleFileUpload}
              className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm"
            >
              <Plus size={14} />
              <span>Files</span>
            </button>
            <button
              onClick={() => handleFeatureClick('resumeAnalysis')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm ${
                activeFeature === 'resumeAnalysis' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BookOpen size={14} />
              <span>Resume Analysis</span>
            </button>
            <button
              onClick={() => handleFeatureClick('jobHunter')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm ${
                activeFeature === 'jobHunter' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Briefcase size={14} />
              <span>Job Hunter</span>
            </button>
            <button
              onClick={() => handleFeatureClick('mockInterview')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm ${
                activeFeature === 'mockInterview' ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageCircle size={14} />
              <span>Mock Interview</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      
      {/* Current active feature indicator */}
      {activeFeature && (
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs text-yellow-800">
            {activeFeature === 'resumeAnalysis' && <BookOpen size={12} className="mr-1" />}
            {activeFeature === 'jobHunter' && <Briefcase size={12} className="mr-1" />}
            {activeFeature === 'mockInterview' && <MessageCircle size={12} className="mr-1" />}
            {activeFeature === 'resumeAnalysis' && 'Resume Analysis Mode'}
            {activeFeature === 'jobHunter' && 'Job Hunter Mode'}
            {activeFeature === 'mockInterview' && 'Mock Interview Mode'}
            <button 
              onClick={() => {
                setActiveFeature(null);
                setInputValue('');
              }}
              className="ml-1 text-yellow-700 hover:text-yellow-900"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}