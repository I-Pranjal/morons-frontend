import React, { useState, useRef, useEffect } from 'react';
import {
  Mic, Send, Plus, BookOpen, Briefcase, MessageCircle, X
} from 'lucide-react';

export function ModifiedInputArea({
  inputValue,
  setInputValue,
  handleSendMessage,
  isListening,
  toggleListening,
  activeMicAnimation,
  onFilesUploaded, // optional callback to handle uploaded files externally
}) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showMobileFeatures, setShowMobileFeatures] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  const placeholders = {
    resumeAnalysis: "Upload your resume for analysis...",
    jobHunter: "Tell me what job you're looking for...",
    mockInterview: "Let's prepare for your interview...",
  };

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
    if (onFilesUploaded) onFilesUploaded(files);
    setShowMobileFeatures(false);
  };

  const handleFileUpload = () => fileInputRef.current?.click();

  const handleFileRemove = (idx) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setSelectedFiles((prev) => [...prev, ...droppedFiles]);
      if (onFilesUploaded) onFilesUploaded(droppedFiles);
    }
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

  return (
    <div
      className="p-4"
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDrop={handleDrop}
      onDragLeave={() => setDragOver(false)}
    >
      {/* File Preview */}
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

      {/* Input Container */}
      <div
        className={`relative rounded-xl border border-gray-200 bg-white shadow-sm ${dragOver ? 'ring-2 ring-gray-400' : ''}`}
      >
        <div className="flex items-center px-3 py-2">
          {/* Mobile Plus Button */}
          {isMobile && (
            <button
              onClick={() => setShowMobileFeatures(!showMobileFeatures)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          )}

          {/* Input */}
          <div className="flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={placeholders[activeFeature] || "Ask anything..."}
              className="w-full py-3 px-2 focus:outline-none bg-transparent text-base"
            />
          </div>

          {/* Desktop Features */}
          {!isMobile && (
            <div className="flex items-center gap-2 py-1 flex-shrink-0 mr-2">
              <button
                onClick={handleFileUpload}
                className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm"
              >
                <Plus size={14} />
                <span>Files</span>
              </button>
              <FeatureButton id="resumeAnalysis" label="Resume Analysis" Icon={BookOpen} />
              <FeatureButton id="jobHunter" label="Job Hunter" Icon={Briefcase} />
              <FeatureButton id="mockInterview" label="Mock Interview" Icon={MessageCircle} />
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
              onClick={handleSendMessage}
              // disabled={!inputValue.trim()}
              className={`p-2 rounded-full transition ${
                inputValue.trim() ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Feature Popover */}
        {isMobile && showMobileFeatures && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-wrap gap-2 z-10 animate-fadeIn">
            <button
              onClick={handleFileUpload}
              className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm"
            >
              <Plus size={14} />
              <span>Files</span>
            </button>
            <FeatureButton id="resumeAnalysis" label="Resume Analysis" Icon={BookOpen} />
            <FeatureButton id="jobHunter" label="Job Hunter" Icon={Briefcase} />
            <FeatureButton id="mockInterview" label="Mock Interview" Icon={MessageCircle} />
          </div>
        )}
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
            {activeFeature === 'resumeAnalysis' && <BookOpen size={12} className="mr-1" />}
            {activeFeature === 'jobHunter' && <Briefcase size={12} className="mr-1" />}
            {activeFeature === 'mockInterview' && <MessageCircle size={12} className="mr-1" />}
            {`${activeFeature
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())} Mode`}
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
