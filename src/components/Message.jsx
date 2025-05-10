import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

// Enhanced Message Component with improved typing animation
export default function Message({ message, setMessages }) {
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