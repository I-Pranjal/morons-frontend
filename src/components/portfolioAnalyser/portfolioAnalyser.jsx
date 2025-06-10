import React, { useState } from 'react';
import axios from 'axios';
import AnalysisResults from './analysisResult';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const PortfolioAnalyser = () => {
  const [portfolioURL, setPortfolioURL] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleAnalyse = async () => {
    setShowResult(false);
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
      console.log(response.data);
      setAnalysisData(response.data);
      setTimeout(() => setShowResult(true), 100); // Animation trigger
    } catch (err) {
      setError('Failed to fetch analysis. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-start py-12">
      {/* Header */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-10">
        <div className="bg-[#18181b] rounded-xl shadow-lg w-full px-8 py-6 flex flex-col items-center border border-[#232323]">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Portfolio Analyser</h1>
          <p className="text-gray-400 text-center max-w-xl mb-2">
            Analyse your portfolio for a specific role and get actionable feedback to improve your chances!
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="bg-[#18181b] border-[#232323] shadow-xl w-full max-w-2xl mb-10 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl text-amber-400 font-bold">Analyse Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAnalyse();
            }}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="block text-gray-300 font-medium mb-1">Portfolio URL</label>
              <input
                type="text"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
                placeholder="https://your-portfolio.com"
                className="w-full rounded-lg px-4 py-2 bg-[#121212] border border-[#333] text-white focus:border-amber-400 focus:ring-amber-400/20 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-1">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full rounded-lg px-4 py-2 bg-[#121212] border border-[#333] text-white focus:border-amber-400 focus:ring-amber-400/20 transition"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-xl shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition-all duration-300 py-3"
            >
              Analyse
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {analysisData && (
        <div
          className={`w-full max-w-4xl mt-4 transition-all duration-700 ${
            showResult
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <AnalysisResults analysisResult={analysisData} />
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1);
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(32px) scale(0.98);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
    </div>
  );
};

export default PortfolioAnalyser;