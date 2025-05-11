import { useState, useEffect, useRef } from 'react';
import { Menu, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Sidebar from '../components/Sidebar';
import { ModifiedInputArea } from '../components/ModifiedInputArea';
import JarvisCircleAnimations from '../components/JarvisCircleAnimation';
import VoiceCommandOverlay from '../components/VoiceCommand';
import useChatSession from '../hooks/useChatSession';
import MessageBubble from '../components/MessageBubble';  
import ProfileSection from '../components/ProfileSection';
import { fetchAudio } from '../audiothings/TextToSpeech';


export default function JarvisUI() {
  const [activeFeature, setActiveFeature] = useState('');
  const { sendMessage, messages } = useChatSession();
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [activeMicAnimation, setActiveMicAnimation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Inject keyframe animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInFromTop {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-slideInFromTop {
        animation-name: slideInFromTop;
        animation-timing-function: ease-out;
        animation-fill-mode: both;
      }

      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation-name: spin-slow;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation-name: fadeIn;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
      }

      @media (max-width: 768px) {
        .mobile-sidebar-open {
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFilesUploaded = (files) => {
    console.log("Files uploaded:");
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    const filesToProcess = [...selectedFiles]; // Create a copy of the files to process
    
    // Clear the selected files immediately at the start of processing
    setSelectedFiles([]);
    
    // Handle file uploads
    if (filesToProcess.length > 0) {
      for (const file of filesToProcess) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('File upload failed');

          const result = await response.json();

          const newUserMessage = {
            person: 'assistant',
            content: result?.analysis || "The file was processed but no text was returned",
          };

          await sendMessage(newUserMessage);
        } catch (error) {
          console.error('File upload error:', error);
          await sendMessage({
            person: 'assistant',
            content: `Error uploading ${file.name}: ${error.message}`
          });
        }
      }
    }

    // Handle text input
    if (inputValue.trim()) {
      const newUserMessage = {
        person: 'user',
        content: inputValue,
        chatType: activeFeature || 'Resume Analysis',
      };
      // console.log("Sending message:", newUserMessage);
      await sendMessage(newUserMessage);
      setInputValue('');

      const newJarvisMessage = {
        person: 'assistant',
        content: "I'm still learning, but I'm here to help!",
        chatType: activeFeature || 'Resume Analysis',
      };
      await sendMessage(newJarvisMessage);
      await fetchAudio(newJarvisMessage.content); 
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    setActiveMicAnimation(!activeMicAnimation);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setActiveMicAnimation(false);
      }, 5000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden relative">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}`}>
        <header
          className="fixed top-0 z-30 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-b border-gray-300 bg-white transition-all duration-300"
          style={{
            left: isMobile ? '0' : (isSidebarOpen ? '16rem' : '0'),
            right: '0',
            width: isMobile ? '100%' : (isSidebarOpen ? 'calc(100% - 16rem)' : '100%')
          }}
        >
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSidebar}
              className="text-black hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} />
            </button>
            <img src={logo} alt="Logo" className="h-8 md:h-10" />
            <button
              onClick={handleHomeClick}
              className="text-black hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 ml-2"
              aria-label="Home"
            >
              <Home size={22} />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <ProfileSection />
          </div>
        </header>

        <div className="flex flex-col flex-1 pt-16 md:pt-20">
          <main className="flex-1 relative overflow-hidden">
            <JarvisCircleAnimations />
            <div className="absolute inset-0 overflow-y-auto px-3 md:px-4 py-4 z-10">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <h1
                    className="text-xl md:text-2xl font-light mb-2 text-black opacity-0 animate-fadeIn"
                    style={{
                      animationDuration: '1s',
                      animationDelay: '0.2s',
                      animationFillMode: 'forwards',
                    }}
                  >
                    How can I assist you today?
                  </h1>
                  <p
                    className="text-black text-xs md:text-sm opacity-0 animate-fadeIn"
                    style={{
                      animationDuration: '1s',
                      animationDelay: '0.5s',
                      animationFillMode: 'forwards',
                    }}
                  >
                    Voice or text, I'm ready to help
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-20">
                  {messages
                    .filter((msg) =>  msg.chatType === (activeFeature || "Resume Analysis") )
                    .map((msg, idx) => (
                      <MessageBubble key={idx} message={msg} />
                    ))}
                  <div ref={messageEndRef} />
                </div>
              )}
            </div>
          </main>

          <div className="px-3 md:px-4 py-3">
            <ModifiedInputArea
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              isListening={isListening}
              toggleListening={toggleListening}
              activeMicAnimation={activeMicAnimation}
              onFilesUploaded={handleFilesUploaded}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </div>
        </div>
      </div>

      {isListening && <VoiceCommandOverlay />}
    </div>
  );
}