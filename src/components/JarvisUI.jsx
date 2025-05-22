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
import { useUser } from '../context/userContext';
import ChatSessions from '../components/History'; // <-- Ensure this is imported

export default function JarvisUI() {
  const [activeFeature, setActiveFeature] = useState('Resume Analysis');
  const [selectedDate, setSelectedDate] = useState(null); // <-- NEW STATE FOR DATE FILTER
  const { sendResumeMessage, submitInterviewFile,  messages, askInterviewQuestion, getGeminiResponse } = useChatSession();
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [activeMicAnimation, setActiveMicAnimation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messageContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInFromTop {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
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
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilesUploaded = (files) => {
    setSelectedFiles((prev) => {
      const allFiles = [...prev, ...files];
      const uniqueFiles = Array.from(new Map(allFiles.map(file => [file.name + file.size, file])).values());
      return uniqueFiles;
});

  };

  const handleSendMessage = async () => {
    if(!user){ alert("Login to send a message"); return; }
   if (!inputValue.trim() && (!selectedFiles || selectedFiles.length === 0)) return;

    const filesToProcess = [...selectedFiles];


    if (filesToProcess.length > 0) {
      if(activeFeature === 'Mock Interview') {
        for (const file of filesToProcess) {
          try {
            await submitInterviewFile(file);
          } catch (error) {
            console.error('File upload error:', error);
            await sendResumeMessage({ person: 'assistant', content: `Error uploading ${file.name}: ${error.message}` });
          }
        }
      } else {
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
            const newUserMessage = { person: 'assistant', content: result?.analysis || "The file was processed but no text was returned" ,  chatType: 'Resume Analysis' };
            await sendResumeMessage(newUserMessage);
          } catch (error) {
            console.error('File upload error:', error);
            await sendResumeMessage({ person: 'assistant', content: `Error uploading ${file.name}: ${error.message}` });
          }
        }

      }
          setSelectedFiles([]);
    } else {
      if (inputValue.trim()) {
        if(activeFeature === 'Mock Interview') {
          askInterviewQuestion(inputValue);
          setInputValue('');
        } else if(activeFeature === 'Job Hunting') {
          getGeminiResponse(inputValue);
          setInputValue('');
        } else {
          const newUserMessage = {
            person: 'user',
            content: inputValue,
            chatType: activeFeature || 'Resume Analysis',
          };
          await sendResumeMessage(newUserMessage);
          setInputValue('');
          const newJarvisMessage = {
            person: 'assistant',
            content: "I'm still learning, but I'm here to help!",
            chatType: activeFeature || 'Resume Analysis',
          };
          await sendResumeMessage(newJarvisMessage);
        }
      }
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

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden relative">
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-20" onClick={toggleSidebar} aria-hidden="true" />
      )}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} user={user} activeFeature={activeFeature} onDateClick={setSelectedDate}/>

      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-16'}`}>
        <header className="fixed top-0 z-30 px-3 md:px-4 py-2 flex justify-between items-center border-b border-gray-200 bg-white transition-all duration-300 w-full"
          style={{ left: isMobile ? '0' : (isSidebarOpen ? '16rem' : '4rem'), right: '0', width: isMobile ? '100%' : (isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 4rem)') }}>
          <div className="flex items-center space-x-1">
            <button onClick={toggleSidebar} className="text-black hover:bg-gray-100 p-1.5 rounded-full transition-colors duration-200" aria-label="Toggle sidebar">
              <Menu size={18} />
            </button>
            <a href="/" className="flex items-center"> <img src={logo} alt="Logo" className="h-6 md:h-7" /> </a>
          </div>
          <div className="flex items-center"> <ProfileSection /> </div>
        </header>

        <div className="flex flex-col flex-1 pt-12 md:pt-14">
          <main className="flex-1 relative overflow-hidden w-full">
            <JarvisCircleAnimations />
            <div ref={messageContainerRef} className="absolute inset-0 overflow-y-auto px-2 md:px-4 py-3 z-10 pb-20 w-full" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'thin' }}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-lg md:text-xl font-light mb-2 text-black opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    {user ? 'How can I assist you today?' : 'You need to login to use this feature'}
                  </h1>
                  <p className="text-black text-xs md:text-sm opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    {user ? "Voice or text, I'm ready to help" : (
                      <button className='text-black bg-amber-300 px-4 py-2 rounded-2xl border-black border hover:bg-amber-400 font-semibold' onClick={() => navigate('/login')}>
                        Login 
                      </button>
                    )}
                  </p>
                </div>
              ) : (
                // ------------------------------------------------------------------------------------------------------------------------------
<div className="space-y-3 pb-20">
  {messages
    .filter((msg) => {
      const isCorrectChatType = msg.chatType === (activeFeature || "Resume Analysis");

      const msgDate = msg.createdAt?.split("T")[0];

      // Convert selectedDate to ISO format (YYYY-MM-DD) if it's present
      const normalizedSelectedDate = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : null;

      const isCorrectDate = !selectedDate || msgDate === normalizedSelectedDate;

      return isCorrectChatType && isCorrectDate;
    })
    .map((msg, idx) => (
      <MessageBubble key={idx} message={msg} />
    ))
  }
  <div ref={messageEndRef} />
</div>

                  // ------------------------------------------------------------------------------------------------------------------------------
              )}
            </div>
          </main>

          <div className="fixed bottom-0 bg-white z-20 transition-all duration-300" style={{ left: isMobile ? '0' : (isSidebarOpen ? '16rem' : '4rem'), right: '0', width: isMobile ? '100%' : (isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 4rem)') }}>
            <div className="w-full px-2 md:px-4 py-2">
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
                isSidebarOpen={isSidebarOpen}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </div>
          </div>
        </div>
      </div>

      {isListening && <VoiceCommandOverlay />}
    </div>
  );
}
