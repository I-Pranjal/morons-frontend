import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Upload, File, TicketCheck, LucideGlobe2 } from 'lucide-react';
import toast from 'react-hot-toast';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import { useNavigate } from 'react-router-dom';

// Main component
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    step1: {
      name: '',
      mobileNo: '',
      collegeName: '',
      graduationYear: '',
      randomInteger: ''
    },
    step2: {
      resume: null,
      notInResume: '',
      careerGoal: '',
      approach: '',
      randomInteger: ''
    }
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.randomInteger) {
      setFormData(prev => ({
        step1: { ...prev.step1, randomInteger: user.randomInteger },
        step2: { ...prev.step2, randomInteger: user.randomInteger }
      }));
    }
  }, []);

  const handleNext = () => {
    setIsFlipping(true);
    toast.success('Step 1 completed successfully!');
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => setIsFlipping(false), 500);
    }, 500);
  };

  const handleBack = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentStep(1);
      setTimeout(() => setIsFlipping(false), 500);
    }, 500);
  };

  const handleSubmit = () => {
    toast.success('Form submitted successfully!', {
      duration: 4000,
      icon: '🎉'
    });
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentStep(3);
      setTimeout(() => setIsFlipping(false), 500);
    }, 500);
    navigate('/jarvis');
  };

  const progressPercentage = (currentStep / 2) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-18 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-4">
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-amber-300 text-sm font-medium">
              Step {currentStep} of 2
            </span>
            <span className="text-amber-300 text-sm font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-amber-300 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex items-center justify-between px-1">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-amber-300' : 'text-gray-500'}`}>
            <div className={`rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold ${
              currentStep >= 1 ? 'bg-amber-300 text-black' : 'bg-gray-800 text-gray-400'
            }`}>
              1
            </div>
            <div className="ml-2 font-medium text-xs sm:text-sm">Personal Info</div>
          </div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-amber-300' : 'text-gray-500'}`}>
            <div className={`rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold ${
              currentStep >= 2 ? 'bg-amber-300 text-black' : 'bg-gray-800 text-gray-400'
            }`}>
              2
            </div>
            <div className="ml-2 font-medium text-xs sm:text-sm">Career Info</div>
          </div>
        </div>
      </div>

      {/* Form container with flip animation */}
      <div className="w-full max-w-2xl perspective">
        <div
          className={`relative w-full transition-all duration-500 ${isFlipping ? 'flip-card-flipping' : ''} ${
            currentStep === 1 ? 'flip-card' : 'flip-card-flipped'
          }`}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.5s ease' }}
        >
          {/* Step 1 */}
          <div
            className="absolute w-full backface-hidden flip-card-front"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)', zIndex: currentStep === 1 ? 1 : 0 }}
          >
            <StepOne
              onNext={handleNext}
              formData={formData.step1}
              setFormData={(data) => setFormData(prev => ({ ...prev, step1: data }))}
            />
          </div>

          {/* Step 2 */}
          <div
            className="absolute w-full backface-hidden flip-card-back"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: currentStep === 2 ? 1 : 0 }}
          >
            <StepTwo
              onBack={handleBack}
              onNext={handleSubmit}
              formData={formData.step2}
              setFormData={(data) => setFormData(prev => ({ ...prev, step2: data }))}
            />
          </div>
        </div>
      </div>

      {/* Add CSS for flip animation and reset defaults */}
      <style jsx global>{`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #000;
  }
  .perspective {
    perspective: 1000px;
  }
  .flip-card {
    transform: rotateY(0deg);
  }
  .flip-card-flipped {
    transform: rotateY(180deg);
  }
  .flip-card-flipping {
    pointer-events: none;
  }
  .backface-hidden {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-front, .flip-card-back {
    width: 100%;
    height: 100%;
  }
`}</style>
    </div>
  );
}
