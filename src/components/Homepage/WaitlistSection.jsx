import React, { useState } from 'react';
import { CheckCircle, Brain, Sparkles } from 'lucide-react';

export const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mock user state - replace with your actual auth logic
  const [user] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (user) return window.location.href = '/dashboard';
    if (!email) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setEmail('');
      setGoal('');
      setSubmitted(true);
      setTimeout(() => setShowAuthModal(true), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    const AuthModal = ({ isOpen, onClose }) =>
    !isOpen ? null : (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl font-bold mb-4">Welcome to GeniOS!</h3>
          <p className="text-gray-600 mb-6">
            You’re on the waitlist. We’ll notify you when your intelligence OS is ready.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Got it!
          </button>
        </div>
      </div>
    );

  if (user) {
    return (
     <section className="py-24 bg-gradient-to-br from-blue-50 via-transparent to-teal-50">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🚀 System Access Granted
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your intelligence OS is ready. Begin your acceleration.
          </p>

          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xl px-16 py-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            🎯 Enter GeniOS
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-blue-50 via-transparent to-teal-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join the waitlist. Let Mr. Elite start building your system.
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            GeniOS is currently onboarding select early users who understand the future of career intelligence.
          </p>

          {submitted ? (
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-transparent to-teal-50 opacity-20 pointer-events-none"></div>
              <div className="p-8 relative z-10 text-center">
                <CheckCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  ✅ You’re in.
                </h3>
                <p className="text-gray-600 mb-6">
                  You’ll hear from Mr. Elite soon.
                </p>
                <div className="inline-flex items-center space-x-3 text-sm text-teal-600 bg-teal-50 rounded-full px-4 py-2">
                  <Brain className="w-4 h-4 animate-pulse" />
                  <span>System initialization in progress...</span>
                  <Sparkles className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl relative overflow-hidden border border-gray-100">
                {/* subtle card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-transparent to-blue-50 opacity-20 pointer-events-none"></div>
                <div className="p-8 relative z-10 space-y-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full text-lg py-6 px-4 bg-gray-50 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
                  />
                  <textarea
                    placeholder="What’s your career ambition? (optional)"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    className="w-full text-lg py-4 px-4 min-h-[100px] bg-gray-50 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-xl py-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Installing Intelligence..." : "🎯 Join Waitlist"}
                  </button>
                  <p className="text-sm text-gray-500">
                    By joining, you agree to receive updates about GeniOS and career intelligence insights.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};