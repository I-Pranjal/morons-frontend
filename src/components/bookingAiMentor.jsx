import { useState } from 'react';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import ThankYou from './thankyou'; // Import the Thank You component
import { toast } from 'react-hot-toast';

export default function BookingAiMenter() {
  const [step, setStep] = useState(2); // Use a single state to track steps (1: StepOne, 2: StepTwo, 3: ThankYou)
  const [finalint, setFinalint] = useState(null); // State to hold the final integer 

  const handleNext = () => {
    setStep((prev) => prev + 1); // Move to the next step
  };

  const handleBack = () => {
    setStep((prev) => prev - 1); // Move to the previous step
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {step === 1 && <StepOne onNext={handleNext} setFinalint={setFinalint} />}
      {step === 2 && <StepTwo onBack={handleBack} onNext={handleNext} finalint={finalint} />}
      {step === 3 && <ThankYou />}
    </div>
  );
}
