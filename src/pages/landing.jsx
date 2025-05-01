import TestimonialsCarousel from "../components/Testimonials";
import WallOfLove from "../components/walloflove";
import Footer from "../components/footer";
const LandingPage = () => {
    return (
        <div className="bg-gray-900 text-white">
          <TestimonialsCarousel/>
          <WallOfLove/>
          <Footer/>
        </div>
      );
    };
    
export default LandingPage;
