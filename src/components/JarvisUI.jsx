import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Send, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Sidebar from '../components/Sidebar'; // Import the enhanced Sidebar component

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
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      {/* Overlay to close sidebar on mobile when clicked outside */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Enhanced Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 h-full transition-all duration-300`}>
        {/* Header */}
        <header className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSidebar} 
              className="text-white hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} />
            </button>
            <img src={logo} alt="Logo" className="h-8 md:h-10" />
            <span className="text-white font-semibold hidden sm:inline">Mr. Elite</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 bg-gray-900 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
              <span className="bg-white h-2 w-2 rounded-full animate-pulse"></span>
              <span className="truncate">Your Personal AI Agent</span>
            </button>
          </div>
        </header>

        {/* Main Content Area with Animated Background */}
        <main className="flex-1 relative overflow-hidden">
          <JarvisCircleAnimations />
          {/* Messages Container */}
          <div className="absolute inset-0 overflow-y-auto px-3 md:px-4 py-4 z-10">
            {messages.length === 0 && !isInitialized ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-xl md:text-2xl font-light mb-2 opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.2s', animationFillMode: 'forwards' }}>How can I assist you today?</h1>
                <p className="text-white text-xs md:text-sm opacity-0 animate-fadeIn" style={{ animationDuration: '1s', animationDelay: '0.5s', animationFillMode: 'forwards' }}>Voice or text, I'm ready to help</p>
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

        {/* Input Area */}
        <div className="p-3 md:p-4 border-t border-gray-800 relative z-20">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Analyze my Resume..."
              className="w-full bg-gray-900 text-white rounded-full pl-4 pr-20 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
              aria-label="Message input"
            />
            <div className="absolute right-2 flex space-x-1">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full ${isListening ? 'bg-white text-black' : 'text-white hover:bg-gray-800'} transition-all duration-300 relative`}
                aria-label="Voice input"
              >
                <Mic size={16} className={activeMicAnimation ? 'animate-pulse' : ''} />
                {activeMicAnimation && <MicPulseAnimation />}
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-full text-white hover:bg-gray-800 transition-all duration-300"
                disabled={inputValue.trim() === ''}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
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
          isJarvis ? 'bg-gray-900' : 'bg-gray-700'
        } ${isJarvis && message.isTyping ? 'border-l-2 border-white' : ''}
        transition-all duration-500
        ${isJarvis ? 'hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}
        ${isFirstMessage ? 'animate-slideInFromTop' : ''}`}
        style={isFirstMessage ? { animationDuration: '0.7s' } : {}}
      >
        {isJarvis && (
          <div className="flex items-center mb-1">
            <MessageSquare size={14} className="text-white mr-2" />
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>
        )}
        <p className="text-xs md:text-sm break-words">
          {isJarvis && message.isTyping ? (
            <span className="text-white">{message.text}</span>
          ) : (
            message.text
          )}
        </p>
        {!isJarvis && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced Mic Pulse Animation
function MicPulseAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute w-full h-full rounded-full bg-white opacity-30 animate-ping"></div>
      <div className="absolute w-10 h-10 rounded-full bg-white opacity-20 animate-ping" style={{ animationDuration: '1.5s' }}></div>
      <div className="absolute w-16 h-16 rounded-full bg-white opacity-10 animate-ping" style={{ animationDuration: '2s' }}></div>
    </div>
  );
}

// Voice Command Overlay
function VoiceCommandOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
      <div className="bg-black bg-opacity-90 p-6 md:p-8 rounded-xl border border-white shadow-lg shadow-white/30 max-w-xs md:max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping" style={{ animationDuration: '1.5s' }}></div>
            <div className="relative bg-gray-800 p-4 rounded-full">
              <Mic size={28} className="text-white" />
            </div>
          </div>
        </div>
        <h3 className="text-center text-lg md:text-xl font-light mb-2">Listening...</h3>
        <p className="text-center text-gray-400 text-xs md:text-sm mb-6">Speak your command clearly</p>
        <div className="flex justify-center mb-4">
          <VoiceWaveVisualization />
        </div>
        <div className="text-center text-xs text-gray-500 flex items-center justify-center mt-4">
          <span>Say "cancel" to exit</span>
        </div>
      </div>
    </div>
  );
}

// More sophisticated voice wave visualization
function VoiceWaveVisualization() {
  return (
    <div className="flex items-center justify-center space-x-1 h-8">
      {Array.from({ length: 16 }).map((_, i) => {
        // Create a wave-like pattern
        const baseHeight = Math.sin((i / 16) * Math.PI * 4) * 0.5 + 0.5;
        const height = 4 + baseHeight * 20;
        return (
          <div
            key={i}
            className="bg-white w-1 rounded-full animate-pulse"
            style={{
              height: `${height}px`,
              animationDelay: `${(i / 16) * 0.8}s`,
              animationDuration: '0.8s'
            }}
          ></div>
        );
      })}
    </div>
  );
}

// Jarvis Circle Animations (Black and White)
function JarvisCircleAnimations() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Outer Rings */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="0.2"
          className="animate-spin-slow"
          style={{ animationDuration: '120s' }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="0.2"
          className="animate-spin-slow"
          style={{ animationDuration: '100s', animationDirection: 'reverse' }}
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="0.3"
          strokeDasharray="0.5 0.5"
          className="animate-spin-slow"
          style={{ animationDuration: '80s' }}
        />
      </svg>

      {/* Middle spinning elements */}
      <svg className="absolute w-2/3 h-2/3" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.4"
          strokeDasharray="1 2"
          className="animate-spin-slow"
          style={{ animationDuration: '60s', animationDirection: 'reverse' }}
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.4"
          className="animate-spin-slow"
          style={{ animationDuration: '40s' }}
        />
        
        {/* Dashes along the circle - Iron Man HUD style */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="23"
            x2="50"
            y2="21"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.3"
            transform={`rotate(${i * 10} 50 50)`}
            className="origin-center"
          />
        ))}
        
        {/* Adding HUD style elements */}
        <path
          d="M50,30 L53,33 L53,34 L51,36 L49,36 L47,34 L47,33 L50,30"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <path
          d="M30,50 L33,53 L34,53 L36,51 L36,49 L34,47 L33,47 L30,50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: '3.5s' }}
        />
        <path
          d="M70,50 L67,53 L66,53 L64,51 L64,49 L66,47 L67,47 L70,50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </svg>

      {/* Inner elements */}
      <svg className="absolute w-1/2 h-1/2" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          className="animate-spin-slow"
          style={{ animationDuration: '30s', animationDirection: 'reverse' }}
        />
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        
        {/* Inner hexagon */}
        <polygon
          points="50,40 55,45 55,55 50,60 45,55 45,45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.3"
          className="animate-spin-slow"
          style={{ animationDuration: '20s' }}
        />
        
        {/* Center point with pulse */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="rgba(255, 255, 255, 0.3)"
          className="animate-pulse"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Small triangular indicators */}
        <polygon
          points="50,35 51,37 49,37"
          fill="rgba(255, 255, 255, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <polygon
          points="50,65 51,63 49,63"
          fill="rgba(255, 255, 255, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: '3.2s' }}
        />
        <polygon
          points="35,50 37,51 37,49"
          fill="rgba(255, 255, 255, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: '3.4s' }}
        />
        <polygon
          points="65,50 63,51 63,49"
          fill="rgba(255, 255, 255, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: '3.6s' }}
        />
      </svg>

      {/* Futuristic scanning lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.2"
          className="animate-scan-horizontal"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.2"
          className="animate-scan-vertical"
        />
      </svg>

      {/* Randomly positioned small dots */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 20 + Math.random() * 60;
          const y = 20 + Math.random() * 60;
          const size = 0.1 + Math.random() * 0.3;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill="rgba(255, 255, 255, 0.4)"
              className="animate-pulse"
              style={{
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          );
        })}
      </svg>

      {/* Add data visualization style elements */}
      <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100">
        {/* Top right data rectangle block */}
        <rect x="70" y="20" width="15" height="8" rx="1" fill="rgba(20, 20, 20, 0.7)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
        <line x1="72" y1="22" x2="83" y2="22" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        <line x1="72" y1="24" x2="78" y2="24" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        <line x1="72" y1="26" x2="81" y2="26" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        
        {/* Bottom left data block */}
        <rect x="15" y="70" width="15" height="8" rx="1" fill="rgba(20, 20, 20, 0.7)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
        <line x1="17" y1="72" x2="28" y2="72" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        <line x1="17" y1="74" x2="23" y2="74" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        <line x1="17" y1="76" x2="26" y2="76" stroke="rgba(180, 180, 180, 0.7)" strokeWidth="0.2" />
        
        {/* Futuristic data panels that appear and disappear */}
        <g className="animate-fadeInOut" style={{ animationDuration: '8s' }}>
          <rect x="10" y="10" width="10" height="5" rx="1" fill="rgba(30, 30, 30, 0.8)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
          <line x1="12" y1="12" x2="18" y2="12" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
          <line x1="12" y1="14" x2="16" y2="14" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
        </g>
        <g className="animate-fadeInOut" style={{ animationDuration: '12s', animationDelay: '4s' }}>
          <rect x="80" y="80" width="10" height="5" rx="1" fill="rgba(30, 30, 30, 0.8)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
          <line x1="82" y1="82" x2="88" y2="82" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
          <line x1="82" y1="84" x2="86" y2="84" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
        </g>
      </svg>
    </div>
  );
}