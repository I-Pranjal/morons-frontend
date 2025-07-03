import React from 'react';

export const WaitlistSection = () => {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the waitlist. Let Mr. Elite start building your system.</h2>
      <p className="text-gray-600 mb-10 max-w-xl mx-auto">
        GeniOS is currently onboarding select early users who understand the future of career intelligence.
      </p>
      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <input type="email" placeholder="Enter your email" className="p-3 border border-gray-300 rounded" />
        <textarea placeholder="What's your career ambition? (optional)" className="p-3 border border-gray-300 rounded" rows="3" />
        <button className="bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800">
          🎯 Join Waitlist
        </button>
      </form>
    </section>
  );
};