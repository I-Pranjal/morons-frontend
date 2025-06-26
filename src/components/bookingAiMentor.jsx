import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    if (user?.randomInteger) {
      setFormData(prev => ({
        step1: { ...prev.step1, randomInteger: user.randomInteger },
        step2: { ...prev.step2, randomInteger: user.randomInteger }
      }));
    }
  }, []);

  const handleStepTransition = (nextStep, successMessage) => {
    setIsTransitioning(true);
    if (successMessage) {
      toast.success(successMessage);
    }
    setTimeout(() => {
      setCurrentStep(nextStep);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 300);
  };

  const handleNext = () => {
    handleStepTransition(2, 'Step 1 completed successfully!');
  };

  const handleBack = () => {
    handleStepTransition(1, '');
  };

  const handleSubmit = () => {
    toast.success('Form submitted successfully!', {
      duration: 4000,
      icon: '🎉'
    });
    navigate('/v8/userpreference');
  };

  const progressPercentage = (currentStep / 2) * 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content Container */}
      <div className="px-4 lg:px-8 py-18">
        <div className="w-full max-w-md mx-auto">
          {/* Form Container */}
          <div className={`
            bg-white rounded-lg shadow-2xl border border-gray-200
            transform transition-all duration-300 ease-out
            drop-shadow-xl shadow-black/20
            ${isTransitioning
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
            }
          `}>
            {currentStep === 1 && (
              <StepOne
                onNext={handleNext}
                formData={formData.step1}
                setFormData={(data) => setFormData(prev => ({ ...prev, step1: data }))}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                onBack={handleBack}
                onNext={handleSubmit}
                formData={formData.step2}
                setFormData={(data) => setFormData(prev => ({ ...prev, step2: data }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}