import { useEffect, useState } from 'react';
import { Mic, ChevronLeft } from 'lucide-react';
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
    },
    step2: {
      resume: null,
      notInResume: '',
      careerGoal: '',
      approach: '', 
    }
  });

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.randomInteger) {
    setFormData(prev => ({
      step1: {
        ...prev.step1,
        randomInteger: user.randomInteger,
      },
      step2: {
        ...prev.step2,
        randomInteger: user.randomInteger,
      }
    }));
  }
}, []);


  const handleNext = () => {
    setIsFlipping(true);
    toast.success('Step 1 completed successfully!');
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
  };

  const handleBack = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentStep(1);
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
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
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
    navigate('/jarvis ');

  };

  return (
    <div className="h-auto flex flex-col items-center justify-center p-6 bg-gray-50">

      
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center w-full max-w-md pl-12">
        <div className="flex items-center w-full max-w-md">
          <div className={`flex-1 flex items-center ${currentStep >= 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className="ml-4 font-medium">Personal Info</div>
          </div>
          <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 flex items-center ${currentStep >= 2 ? 'text-yellow-400' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className="ml-4 font-medium">Career Info</div>
          </div>
        </div>
      </div>

      {/* Form container with flip animation */}
      <div className="w-full max-w-xl perspective">
        <div 
          className={`relative w-full transition-all duration-500 ${
            isFlipping ? 'flip-card-flipping' : ''
          } ${currentStep === 1 ? 'flip-card' : 'flip-card-flipped'}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease',
          }}
        >
          {/* Step 1 */}
          <div 
            className="absolute w-full backface-hidden flip-card-front"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: currentStep === 1 ? 1 : 0
            }}
          >
            <StepOne 
              onNext={handleNext} 
              // setFinalInt={setFinalInt} 
              formData={formData.step1}
              setFormData={(data) => setFormData(prev => ({...prev, step1: data}))}
            />
          </div>

          {/* Step 2 */}
          <div 
            className="absolute w-full backface-hidden flip-card-back"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: currentStep === 2 ? 1 : 0
            }}
          >
            <StepTwo 
              onBack={handleBack} 
              onNext={handleSubmit} 
              // finalInt={finalInt} 
              formData={formData.step2}
              setFormData={(data) => setFormData(prev => ({...prev, step2: data}))}
            />
          </div>
        </div>
      </div>

      {/* Add CSS for flip animation */}
      <style jsx global>{`
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

