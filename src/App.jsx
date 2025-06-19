import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/landingpage'
import BookingAiMenter from './components/bookingAiMentor'
import JarvisUI from './components/JarvisUI';
import './index.css'
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import AboutPage from './pages/aboutpage';
import Dashboard from './pages/dashboard';
import NewDashboard from './pages/newDashboard';
import LinkedInCallback from './components/LinkedInCallback';
import ResumeBuilder from './components/resumebuilder/app/resumebuilder';
import CareerContentGenerator from './components/contentGenerator/contentGenerator';
import LinkedInAnalyzer from './components/linkedInAnalyser/linkedInAnalyser';
import JobComparator from './components/jobRoleComparator/jobRoleComparator';
import ProjectIdeasGenerator from './components/projectIdeaGenerator/projectIdeaGenerator';
import AnalysisResults from './components/portfolioAnalyser/portfolioAnalyser';
import RoleTopicsSubmission from './aimentor/pages/userpreference';
import GenerateLabs from './aimentor/pages/generatedLabs';
import  ModuleStep  from './aimentor/pages/lab';
import ResumeAndPortfoliobuilder from './components/resumeAndPortfolioBuilder/landing';
import  Card  from './components/landing/card';


function App() {
  

  return (
    <>
      <Toaster position="top-right"  />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/booking" element={<BookingAiMenter/>}/>
        <Route path="/jarvis" element={<JarvisUI />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        <Route path="/settings" element={< SettingsPage />} />
        <Route path="/dashboard" element={< NewDashboard />} />
        <Route path="/linkedinCallback" element={< LinkedInCallback />} />
        <Route path="/resumemaker" element={< ResumeBuilder />} />
        <Route path="/contentgenerator" element={< CareerContentGenerator />} />
        <Route path="/v2/linkedinanalyser" element={< LinkedInAnalyzer />} />
        <Route path="/v2/jobrolecomparator" element={< JobComparator />} />
        <Route path="/v2/projectideagenerator" element={< ProjectIdeasGenerator />} />
        <Route path="/v2/portfolioanalyser" element={< AnalysisResults />} />
        <Route path="/v8/userpreference" element={< RoleTopicsSubmission />} />
        <Route path="/v8/generatelabs" element={< GenerateLabs />} />
        <Route path="/v8/lab" element={< ModuleStep />} />
        <Route path="/resumeandportfoliobuilder" element={<ResumeAndPortfoliobuilder/>}/>
        <Route path="/card" element={<Card />} />
        {/* Add more routes as needed */}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
