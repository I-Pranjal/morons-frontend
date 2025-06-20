import LearningCards from "../components/Dashboard/LearningCards "
import Navbar from "../components/Navbar"


function Dashboardpage() {
  return (
    <div className="w-100vw min-h-screen bg-neutral-900 text-white">
        <Navbar/>
      <LearningCards/>
    </div>
  )
}

export default Dashboardpage