import React from 'react';
import { marked } from 'marked';
import { MessageSquare } from 'react-feather';

function MessageBubble({ message }) {
    const isJarvis = message.sender === 'assistant';
    const htmlContent = marked.parse(message.content); // `.parse()` is clearer than `.marked()`

    return (
        <div className={`flex ${isJarvis ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`max-w-3/4 md:max-w-2/3 rounded-lg px-3 py-2 md:px-4 md:py-3 ${
                    isJarvis
                        ? 'bg-gray-100 border border-gray-300'
                        : 'bg-yellow-50 border border-yellow-300'
                } transition-all duration-500`}
            >
                {isJarvis && (
                    <div className="flex items-center mb-1">
                        <MessageSquare size={14} className="text-gray-600 mr-2" />
                        <span className="text-xs text-gray-600">{message.timestamp}</span>
                    </div>
                )}

                {isJarvis ? (
                    <div
                        className="prose prose-sm md:prose break-words text-black max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                ) : (
                    <p className="text-xs md:text-sm break-words text-black">
                        {message.content}
                    </p>
                )}
            </div>
        </div>
    );
}

export default MessageBubble;
