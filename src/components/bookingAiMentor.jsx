import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import { useNavigate } from 'react-router-dom';

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
    navigate('/jarvis');
  };

  const progressPercentage = (currentStep / 2) * 100;
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Career Info' }
  ];

  return (
    <div className="pt-8 min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Progress Section */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mb-8">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-amber-300 text-sm font-medium">
            Step {currentStep} of 2
          </span>
          <span className="text-amber-300 text-sm font-medium">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div
            className="bg-amber-300 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`flex items-center ${
                currentStep >= step.number ? 'text-amber-300' : 'text-gray-500'
              }`}
            >
              <div className={`
                rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold
                ${currentStep >= step.number 
                  ? 'bg-amber-300 text-black' 
                  : 'bg-gray-800 text-gray-400'
                }
              `}>
                {step.number}
              </div>
              <div className="ml-3 font-medium text-sm">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className={`
          transition-all duration-300 ease-in-out
          ${isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}
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
  );
}
