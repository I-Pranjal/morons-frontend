import { useState } from 'react';
import { User, Phone, School, Ticket, Mic, ChevronRight, ChevronLeft } from 'lucide-react';
import { Upload, File, TicketCheck, LucideGlobe2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Main component
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [finalInt, setFinalInt] = useState(null);
  const [formData, setFormData] = useState({
    step1: {
      name: '',
      mobileNo: '',
      collegeName: '',
      graduationYear: ''
    },
    step2: {
      resume: null,
      notInResume: '',
      careerGoal: '',
      approach: ''
    }
  });

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
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* <Toaster position="top-center" toastOptions={{
        style: {
          background: '#323232',
          color: '#fff',
          fontWeight: 'bold'
        },
        success: {
          iconTheme: {
            primary: '#ffc107',
            secondary: '#000'
          }
        }
      }} /> */}
      
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
              setFinalInt={setFinalInt} 
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
              finalInt={finalInt} 
              onNext={handleSubmit}
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

// Step One Component
function StepOne({ onNext, setFinalInt, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobileNo, collegeName, graduationYear } = formData;

    if (!name || !mobileNo || !collegeName || !graduationYear) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Mock submission and get response
      const response = Math.floor(Math.random() * 10000);
      setFinalInt(response);
      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full mx-auto"
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-900 mb-6 text-center">
        Authentication - Step 1
      </h1>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="name">Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your full name"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="mobileNo">Mobile number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your mobile number"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* College Name */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="collegeName">College name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <School className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your college name"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="graduationYear">Graduation year</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your graduation year"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-yellow-400 text-white font-bold py-3 px-8 sm:px-12 rounded-lg flex items-center hover:bg-yellow-500 transition-colors shadow-md"
          >
            Next <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

// Step Two Component
function StepTwo({ onBack, finalInt, onNext, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resume: file
      });
      toast.success('Resume uploaded successfully!');
    }
  };

  const validateForm = () => {
    const { resume, notInResume, careerGoal, approach } = formData;

    if (!resume) {
      toast.error('Resume is required.');
      return false;
    }
    if (!notInResume.trim()) {
      toast.error("What's not in resume is required.");
      return false;
    }
    if (!careerGoal.trim()) {
      toast.error('Career goal is required.');
      return false;
    }
    if (!approach.trim()) {
      toast.error('Approach is required.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toast.loading('Uploading resume...', { id: 'upload' });
      
      // Mock upload
      setTimeout(() => {
        toast.dismiss('upload');
        const submission = {
          resumeURL: 'mock-url-for-demo',
          whatsNotInResume: formData.notInResume,
          whatDoYouWantToBe: formData.careerGoal,
          approachTowardsIt: formData.approach,
          randomInteger: Number(finalInt || 1234),
        };

        console.log('Submission data:', submission);
        onNext();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload resume.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full mx-auto"
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-6 text-center">
        Authentication - Step 2
      </h1>

      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block font-medium mb-2 text-gray-500">Upload your resume</label>
          <div className="flex w-full">
            <span className="w-full p-3 border-2 border-r-0 border-gray-300 rounded-l-lg bg-white text-gray-500 truncate">
              {formData.resume ? formData.resume.name : "No file selected"}
            </span>
            <label htmlFor="resume" className="bg-yellow-400 text-white p-3 rounded-r-lg cursor-pointer flex items-center hover:bg-yellow-500 transition-colors">
              <Upload className="w-5 h-5" /><span className="ml-2">Upload</span>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* Text Fields */}
        {[
          { id: 'notInResume', icon: <File />, placeholder: "What's not in resume?" },
          { id: 'careerGoal', icon: <TicketCheck />, placeholder: 'What do you want to be?' },
          { id: 'approach', icon: <LucideGlobe2 />, placeholder: 'Describe your approach' }
        ].map(({ id, icon, placeholder }) => (
          <div key={id}>
            <label className="block font-medium mb-2 text-gray-500" htmlFor={id}>{placeholder}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="text-yellow-500">{icon}</div>
              </div>
              <input
                type="text"
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                placeholder={placeholder}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-yellow-400 hover:text-red-500 font-medium flex items-center transition-colors"
          >
            <ChevronLeft className="mr-2 w-5 h-5" /> Go back
          </button>
          <button
            type="submit"
            className="bg-yellow-400 text-white font-bold py-3 px-8 sm:px-12 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}