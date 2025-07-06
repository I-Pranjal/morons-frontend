import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import  ResumeBuilder  from './components/Resume Builder/app/resumebuilder';
import ProjectAnalyser from './pages/ProjectAnalyser';
import { ChatbotWidget } from './pages/ChatbotWidget';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <>
    <ChatbotWidget />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/projectanalyser" element={<ProjectAnalyser />} />
      <Route path="/login" element={< LoginPage /> } />
    </Routes>
    </>
  );
}
