import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Sidebar from '../components/Sidebar';
import { ModifiedInputArea } from '../components/ModifiedInputArea';
import JarvisCircleAnimations from '../components/JarvisCircleAnimation';
import VoiceCommandOverlay from '../components/VoiceCommand';
import useChatSession from '../hooks/useChatSession';
import MessageBubble from '../components/MessageBubble';  


export default function JarvisUI() {
  const { sendMessage, messages } = useChatSession();
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [activeMicAnimation, setActiveMicAnimation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  const handleFilesUploaded = (files) => {
    console.log("Files uploaded:");
    setSelectedFiles((prev) => [...prev, ...files]);
  };

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  //   if (selectedFile) {
  //     console.log("We have a file to uplaod"); 
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     setSelectedFile(null);

  //     try {
  //       const response = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         throw new Error('File upload failed');
  //       }

  //       const result = await response.json();

  //       const newUserMessage = {
  //         id: Date.now(),
  //         text: `Uploaded file: ${selectedFile.name}`,
  //         sender: 'user',
  //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       };

  //       const newJarvisMessage = {
  //         id: Date.now() + 1,
  //         text: result?.text || "The file was processed but no text was returned.",
  //         sender: 'jarvis',
  //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       };

  //       await sendMessage(newUserMessage.text);
  //       await sendMessage(newJarvisMessage.text);
  //     } catch (error) {
  //       console.error('File upload error:', error);
  //       await sendMessage("Sorry, there was an error uploading the file.");
  //     }

  //     return;
  //   }

  //   const newUserMessage = {
  //     id: Date.now(),
  //     text: inputValue,
  //     sender: 'user',
  //     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //   };

  //   await sendMessage(newUserMessage.text);
  //   setInputValue('');
  // };


  const handleSendMessage = async () => {
    if (!inputValue.trim() && selectedFiles.length === 0) return;
  
    // Handle file uploads first
    if (selectedFiles.length > 0) {
      console.log("We have files to upload");
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        console.log("formData", formData);
        try {
          const response = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) throw new Error('File upload failed');
  
          const result = await response.json();
          // console.log("File upload result:", result);
          // await sendMessage(`Uploaded file: ${file.name}`);
          const newUserMessage = {
            person : 'assistant',
            content: result?.analysis || "The file was processed but no text was returned"
        }
            // After response is received, empty the selected files
          setSelectedFiles([]);
            await sendMessage(newUserMessage);
          }
           catch (error) {
          console.error('File upload error:', error);
          await sendMessage(`Error uploading ${file.name}: ${error.message}`);
        }
      }
  
      // Clear after uploading
      setSelectedFiles([]);
    }
  
    if (inputValue.trim()) {
      const newUserMessage = {
        person : 'user', 
        content: inputValue,
      }
      sendMessage(newUserMessage);
      setInputValue('');

      // For now, when user sends a message, we will say that I am still learning 
      const newJarvisMessage = {
        person : 'assistant',
        content: "I'm still learning, but I'm here to help!",
      }
      await sendMessage(newJarvisMessage);
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
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full transition-all duration-300">
        <header className="fixed top-0 left-0 right-0 z-30 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-b border-gray-300 bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSidebar}
              className="text-black hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} />
            </button>
            <img src={logo} alt="Logo" className="h-8 md:h-10" />
            <span className="text-black font-semibold hidden sm:inline">Mr. Elite</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 bg-yellow-50 border border-yellow-400 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm text-black">
              <span className="bg-yellow-400 h-2 w-2 rounded-full animate-pulse"></span>
              <span className="truncate">Your Personal AI Agent</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col flex-1 pt-16 md:pt-20">
          <main className="flex-1 relative overflow-hidden">
            <JarvisCircleAnimations />
            <div className="absolute inset-0 overflow-y-auto px-3 md:px-4 py-4 z-10">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-xl md:text-2xl font-light mb-2 text-black opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    How can I assist you today?
                  </h1>
                  <p className="text-black text-xs md:text-sm opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    Voice or text, I'm ready to help
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-20">
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
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
/>
          </div>
        </div>
      </div>

      {isListening && <VoiceCommandOverlay />}
    </div>
  );
}

