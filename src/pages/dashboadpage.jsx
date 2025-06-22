import LearningCards from "../components/Dashboard/LearningCards "
import DashboardProfileCard from "../components/Dashboard/ProfileCard"
import Navbar from "../components/Navbar"


function Dashboardpage() {
  return (
    <div className="w-100vw min-h-screen bg-neutral-900 text-white">
        <Navbar/>
      <LearningCards/>
      <DashboardProfileCard />
    </div>
  )
}

export default Dashboardpage