import React, { useState, useRef, useEffect } from 'react';
import {
  Mic, Send, Plus, BookOpen, Briefcase, MessageCircle, X, ChevronDown, ChevronUp
} from 'lucide-react';

export function ModifiedInputArea({
  inputValue,
  setInputValue,
  handleSendMessage,
  isListening,
  toggleListening,
  activeMicAnimation,
  onFilesUploaded,
  activeFeature,
  setActiveFeature,
  isSidebarOpen, 
  selectedFiles,
  setSelectedFiles,
}) {
const canSend = inputValue.trim() || selectedFiles.length > 0;
  const [dragOver, setDragOver] = useState(false);
  const [showMobileFeatures, setShowMobileFeatures] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(true);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const mobileFeatureRef = useRef(null);

  const placeholders = {
    "Resume Analysis": "Upload your resume for analysis...",
    "Job Hunting": "Tell me what job you're looking for...",
    "Mock Interview": "Let's prepare for your interview...",
  };

  // Handle clicks outside the mobile feature menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileFeatureRef.current && !mobileFeatureRef.current.contains(event.target) && 
          showMobileFeatures && !event.target.closest('button[data-feature-toggle="true"]')) {
        setShowMobileFeatures(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileFeatures]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleFeatureClick = (feature) => {
    const newFeature = activeFeature === feature ? null : feature;
    setActiveFeature(newFeature);
    setInputValue(newFeature ? placeholders[newFeature] : "");
    setShowMobileFeatures(false);

    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    setShowFilePreview(true);
    if (onFilesUploaded) onFilesUploaded(files);
    setShowMobileFeatures(false);
  };

  const handleFileUpload = () => fileInputRef.current?.click();

  const handleFileRemove = (idx) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    if (selectedFiles.length === 1) {
      setShowFilePreview(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setSelectedFiles((prev) => [...prev, ...droppedFiles]);
      setShowFilePreview(true);
      if (onFilesUploaded) onFilesUploaded(droppedFiles);
    }
  };

  const handleLocalSendMessage = () => {
    if (inputValue.trim() || selectedFiles.length > 0) {
      handleSendMessage();
      // Clear the selected files completely, not just hide them
      setSelectedFiles([]);
      setShowFilePreview(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleLocalSendMessage();
    }
  };

  const toggleFilePreview = () => {
    setShowFilePreview(!showFilePreview);
  };

  const toggleMobileFeatures = () => {
    setShowMobileFeatures(!showMobileFeatures);
  };

  const FeatureButton = ({ id, label, Icon }) => (
    <button
      onClick={() => handleFeatureClick(id)}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm flex-shrink-0 ${
        activeFeature === id
          ? 'bg-gray-200 text-black'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon size={14} />
      <span>{label}</span>
    </button>
  );

  // Determine the container width based on sidebar state (for animation)
  const containerStyle = {
    transition: 'all 0.3s ease',
    width: '100%'
  };

  return (
    <div
      className="p-4 relative"
      style={containerStyle}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDrop={handleDrop}
      onDragLeave={() => setDragOver(false)}
    >
      {/* Mobile Feature Popover - Positioned ABOVE the   area */}
      {isMobile && showMobileFeatures && (
        <div 
          ref={mobileFeatureRef}
          className="absolute left-0 right-0 bottom-full mb-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-wrap gap-2 z-10 animate-fadeIn"
        >
          <button
            onClick={handleFileUpload}
            className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm"
          >
            <Plus size={14} />
            <span>Files</span>
          </button>
          <FeatureButton id="Resume Analysis" label="Resume Analysis" Icon={BookOpen} />
          <FeatureButton id="Job Hunting" label="Job Hunter" Icon={Briefcase} />
          <FeatureButton id="Mock Interview" label="Mock Interview" Icon={MessageCircle} />
        </div>
      )}
      
      {/* File Preview with Collapse Toggle */}
      {selectedFiles.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div 
              className="flex items-center text-sm text-gray-600 cursor-pointer" 
              onClick={toggleFilePreview}
            >
              <span className="mr-1">Files ({selectedFiles.length})</span>
              {showFilePreview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
          
          {showFilePreview && (
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="relative group w-20 h-20 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 p-1"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-full h-full rounded"
                    />
                  ) : (
                    <div className="text-xs text-gray-700 text-center truncate">
                      {file.name}
                    </div>
                  )}
                  <button
                    onClick={() => handleFileRemove(idx)}
                    className="absolute top-1 right-1 text-white bg-gray-700 bg-opacity-70 rounded-full p-1 hover:bg-opacity-90 transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Input Container */}
      <div
        className={`relative rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ${dragOver ? 'ring-2 ring-gray-400' : ''}`}
      >
        <div className="flex items-center px-3 py-2">
          {/* Mobile Plus Button */}
          {isMobile && (
            <button
              data-feature-toggle="true"
              onClick={toggleMobileFeatures}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          )}

          {/* Input - Height Reduced Here */}
          <div className="flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[activeFeature] || "Ask anything..."}
              className="w-full py-2 px-2 focus:outline-none bg-transparent text-base"
            />
          </div>

          {/* Desktop Features - Make this responsive to sidebar state */}
          {!isMobile && (
            <div className={`flex items-center gap-2 py-1 flex-shrink-0 mr-2 transition-all duration-300 ${!isSidebarOpen ? 'flex-wrap md:flex-nowrap' : ''}`}>
              <button
                onClick={handleFileUpload}
                className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm"
              >
                <Plus size={14} />
                <span>Files</span>
              </button>
              <FeatureButton id="Resume Analysis" label="Resume Analysis" Icon={BookOpen} />
              <FeatureButton id="Job Hunting" label="Job Hunter" Icon={Briefcase} />
              <FeatureButton id="Mock Interview" label="Mock Interview" Icon={MessageCircle} />
            </div>
          )}

          {/* Mic + Send */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition ${
                isListening ? 'bg-gray-200 text-black' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Mic size={20} className={activeMicAnimation ? 'animate-pulse' : ''} />
            </button>
            <button
              disabled={!canSend}
              onClick={handleLocalSendMessage}
              className="p-2 rounded-full transition bg-black text-white hover:bg-gray-800"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
      />

      {/* Active Feature Tag */}
      {activeFeature && (
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs text-yellow-800">
            {activeFeature === 'Resume Analysis' && <BookOpen size={12} className="mr-1" />}
            {activeFeature === 'Job Hunting' && <Briefcase size={12} className="mr-1" />}
            {activeFeature === 'Mock Interview' && <MessageCircle size={12} className="mr-1" />}
            {activeFeature}
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