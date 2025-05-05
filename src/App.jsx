import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/landingpage'
import BookingAiMenter from './components/bookingAiMentor'
import './index.css'

function App() {
  

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/booking" element={<BookingAiMenter/>}/>
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App