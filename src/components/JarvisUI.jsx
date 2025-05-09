import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Send, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Sidebar from '../components/Sidebar';
import { ModifiedInputArea } from '../components/ModifiedInputArea'; // Import our new enhanced component
import JarvisCircleAnimations from '../components/JarvisCircleAnimation'; // Import the circle animation component
import VoiceCommandOverlay from '../components/VoiceCommand'; // Import the voice command overlay component


// Main Jarvis UI Component
export default function JarvisUI() {
  // Define CSS keyframes for animations
  useEffect(() => {
    // Add keyframes for slideInFromTop animation to style element
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
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .animate-spin-slow {
        animation-name: spin-slow;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
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
        
        .mobile-content-shifted {
          margin-left: 0;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeMicAnimation, setActiveMicAnimation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile, will open on desktop in useEffect
  const [isMobile, setIsMobile] = useState(false);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Check device width and set sidebar state accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Default open on desktop, closed on mobile
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Initial greeting message with smoother transition
    setTimeout(() => {
      setIsInitialized(true);
      // Add initial message with typing animation
      setTimeout(() => {
        const initialMessage = {
          id: 1,
          text: "",
          fullText: "I'm here to assist you with any task you need. How can I help you today?",
          sender: 'jarvis',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTyping: true,
          currentIndex: 0
        };
        setMessages([initialMessage]);
      }, 400); // Small delay for smoother transition effect
    }, 800);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Add an empty message first for the typing animation
    const responseId = messages.length + 2;
    const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const responseText = "I'm processing your request. How else can I assist you with your project?";

    // First add an empty response that will be animated
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: responseId,
        text: "",
        fullText: responseText,
        sender: 'jarvis',
        timestamp: responseTime,
        isTyping: true,
        currentIndex: 0
      }]);
    }, 500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    setActiveMicAnimation(!activeMicAnimation);
    // Here you would integrate with speech recognition API
    if (!isListening) {
      // Start listening
      setTimeout(() => {
        setIsListening(false);
        setActiveMicAnimation(false);
      }, 5000);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden relative">
      {/* Overlay to close sidebar on mobile when clicked outside */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Enhanced Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full transition-all duration-300">
        {/* Fixed Header */}
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

        {/* Content Container with padding for fixed header */}
        <div className="flex flex-col flex-1 pt-16 md:pt-20">
          {/* Main Content Area with Animated Background */}
          <main className="flex-1 relative overflow-hidden">
            <JarvisCircleAnimations />
            {/* Messages Container */}
            <div className="absolute inset-0 overflow-y-auto px-3 md:px-4 py-4 z-10">
              {messages.length === 0 && !isInitialized ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-xl md:text-2xl font-light mb-2 text-black opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.2s', animationFillMode: 'forwards' }}>How can I assist you today?</h1>
                  <p className="text-black text-xs md:text-sm opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.5s', animationFillMode: 'forwards' }}>Voice or text, I'm ready to help</p>
                </div>
              ) : (
                <div className={`space-y-4 pb-20 transition-opacity duration-500 ${isInitialized && messages.length === 0 ? 'opacity-0' : 'opacity-100'}`}>
                  {messages.map(message => (
                    <Message key={message.id} message={message} setMessages={setMessages} />
                  ))}
                  <div ref={messageEndRef} />
                </div>
              )}
            </div>
          </main>

          {/* Our Enhanced Input Area Component with Integrated Features */}
          <div className="px-3 md:px-4 py-3">
            <ModifiedInputArea 
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              isListening={isListening}
              toggleListening={toggleListening}
              activeMicAnimation={activeMicAnimation}
            />
          </div>
        </div>
      </div>

      {/* Voice command overlay */}
      {isListening && <VoiceCommandOverlay />}
    </div>
  );
}

// Enhanced Message Component with improved typing animation
function Message({ message, setMessages }) {
  const isJarvis = message.sender === 'jarvis';
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isJarvis && message.isTyping && !initialized) {
      setInitialized(true);
      // Improved letter-by-letter typing animation
      let charIndex = 0;
      const typingSpeed = 30; // Base typing speed (milliseconds)
      const randomVariation = 20; // Random variation to make typing feel more natural
      const cursorBlinkSpeed = 530; // Cursor blinking speed
      let cursorVisible = true;

      let cursorInterval = setInterval(() => {
        // Toggle cursor visibility
        cursorVisible = !cursorVisible;
        setMessages(messages => {
          return messages.map(msg => {
            if (msg.id === message.id && msg.isTyping) {
              // Only update cursor for currently typing message
              return {
                ...msg,
                text: msg.fullText.substring(0, msg.currentIndex) + (cursorVisible ? '█' : ''),
              };
            }
            return msg;
          });
        });
      }, cursorBlinkSpeed);

      // Function to type the next character
      const typeNextChar = () => {
        if (charIndex < message.fullText.length) {
          const nextIndex = charIndex + 1;
          // Update the message with the new character
          setMessages(messages => {
            return messages.map(msg => {
              if (msg.id === message.id) {
                return {
                  ...msg,
                  text: msg.fullText.substring(0, nextIndex) + (cursorVisible ? '█' : ''),
                  currentIndex: nextIndex
                };
              }
              return msg;
            });
          });
          charIndex = nextIndex;

          // Calculate delay for next character - natural typing feel
          // Pause longer at punctuation
          const currentChar = message.fullText[charIndex - 1];
          let delay = typingSpeed;
          if (['.', '!', '?'].includes(currentChar)) {
            delay = typingSpeed * 6; // Longer pause at end of sentences
          } else if ([',', ';', ':'].includes(currentChar)) {
            delay = typingSpeed * 3; // Medium pause at commas and other punctuation
          } else {
            // Random variation for normal characters
            delay = typingSpeed + (Math.random() * randomVariation - randomVariation/2);
          }

          setTimeout(typeNextChar, delay);
        } else {
          // Finished typing
          clearInterval(cursorInterval);
          // Remove cursor when done
          setMessages(messages => {
            return messages.map(msg => {
              if (msg.id === message.id) {
                return {
                  ...msg,
                  text: msg.fullText,
                  isTyping: false
                };
              }
              return msg;
            });
          });
        }
      };

      // Start typing after a small initial delay
      setTimeout(typeNextChar, 300);

      return () => {
        clearInterval(cursorInterval);
      };
    }
  }, [isJarvis, message, setMessages, initialized]);

  // Determine if this is the first message (for smooth entry animation)
  const isFirstMessage = message.id === 1;

  return (
    <div className={`flex ${isJarvis ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-3/4 md:max-w-2/3 rounded-lg px-3 py-2 md:px-4 md:py-3 ${
          isJarvis ? 'bg-gray-100 border border-gray-300' : 'bg-yellow-50 border border-yellow-300'
        } ${isJarvis && message.isTyping ? 'border-l-2 border-yellow-400' : ''}
        transition-all duration-500
        ${isJarvis ? 'hover:shadow-[0_0_8px_rgba(0,0,0,0.1)]' : ''}
        ${isFirstMessage ? 'animate-slideInFromTop' : ''}`}
        style={isFirstMessage ? { animationDuration: '0.7s' } : {}}
      >
        {isJarvis && (
          <div className="flex items-center mb-1">
            <MessageSquare size={14} className="text-gray-600 mr-2" />
            <span className="text-xs text-gray-600">{message.timestamp}</span>
          </div>
        )}
        <p className="text-xs md:text-sm break-words text-black">
          {isJarvis && message.isTyping ? (
            <span>{message.text}</span>
          ) : (
            message.text
          )}
        </p>
        {!isJarvis && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-600">{message.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}

