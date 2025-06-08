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


        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
