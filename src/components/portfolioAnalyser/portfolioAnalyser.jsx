import React, { useState } from 'react';
import axios from 'axios';
import AnalysisResults from './analysisResult';
import Navbar from '../Navbar'; 
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Globe, Target, ArrowRight } from "lucide-react";

const PortfolioAnalyser = () => {
  const [portfolioURL, setPortfolioURL] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleAnalyse = async () => {
    setShowResult(false);
    setIsLoading(true);
    try {
      setError('');
      console.log('Fetching analysis for:', portfolioURL, 'Target Role:', targetRole);
      const response = await axios.post(
        `${backendURL}/api/v2/analyseportfolio`,
        {
          url: portfolioURL,
          targetRole,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAnalysisData(response.data);
      setTimeout(() => setShowResult(true), 300);
    } catch (err) {
      setError('Failed to fetch analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Import and render navbar */}
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio <span className="text-amber-300">Analyser</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Get AI-powered insights on your portfolio and receive actionable feedback 
            tailored to your target role.
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white font-bold flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-amber-300" />
                Analyse Your Portfolio
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleAnalyse();
                }}
                className="space-y-6"
              >
                {/* Portfolio URL Input */}
                <div className="space-y-2">
                  <label className="block text-gray-300 font-medium">
                    Portfolio URL <span className="text-amber-300">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="url"
                      value={portfolioURL}
                      onChange={(e) => setPortfolioURL(e.target.value)}
                      placeholder="https://your-portfolio.com"
                      className="w-full rounded-lg px-12 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-amber-300 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Target Role Input */}
                <div className="space-y-2">
                  <label className="block text-gray-300 font-medium">
                    Target Role <span className="text-amber-300">*</span>
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Frontend Developer, UX Designer"
                      className="w-full rounded-lg px-12 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-amber-300 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold rounded-lg py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Analysing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Analyse Portfolio
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-center">
                    <p className="text-red-400 font-medium">{error}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 bg-amber-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-white font-semibold mb-2">1. Submit URL</h4>
              <p className="text-gray-400">Provide your portfolio URL and target role</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 bg-amber-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-white font-semibold mb-2">2. AI Analysis</h4>
              <p className="text-gray-400">Our AI analyzes your portfolio comprehensively</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="w-12 h-12 bg-amber-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-white font-semibold mb-2">3. Get Insights</h4>
              <p className="text-gray-400">Receive actionable feedback and improvements</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {analysisData && (
          <div
            className={`transition-all duration-500 ${
              showResult
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <AnalysisResults analysisResult={analysisData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioAnalyser;