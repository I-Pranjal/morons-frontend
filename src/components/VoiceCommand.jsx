import React from 'react';
import { Mic } from 'react-feather'; // Assuming you're using 'react-feather' for the microphone icon

function VoiceCommandOverlay() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-40 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-300 shadow-lg shadow-black/10 max-w-xs md:max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '1.5s' }}></div>
            <div className="relative bg-yellow-100 p-4 rounded-full border border-yellow-400">
              <Mic size={28} className="text-black" />
            </div>
          </div>
        </div>
        <h3 className="text-center text-lg md:text-xl font-light mb-2 text-black">Listening...</h3>
        <p className="text-center text-gray-600 text-xs md:text-sm mb-6">Speak your command clearly</p>
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
            className="bg-yellow-400 w-1 rounded-full animate-pulse"
            style={{
              height: `${height}px`,
              animationDelay: `${(i / 16) * 0.8}s`,
              animationDuration: '0.8s',
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default VoiceCommandOverlay;
