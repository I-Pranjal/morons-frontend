import { useState } from 'react';
import { Upload, Mic, File, TicketCheck, LucideGlobe2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useSubmitFormTwo from '../hooks/useSubmitFormTwo';

export default function StepTwo({ onBack, finalint, onNext }) {
    const { SubmitFormTwo } = useSubmitFormTwo();
    const [stepTwoData, setStepTwoData] = useState({
        resume: null,
        notInResume: '',
        careerGoal: '',
        approach: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStepTwoData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStepTwoData((prev) => ({
                ...prev,
                resume: file
            }));
            toast.success('Resume uploaded!');
        }
    };

    const validateForm = () => {
        const { resume, notInResume, careerGoal, approach } = stepTwoData;

        if (!resume) return toast.error('Resume is required.');
        if (!notInResume.trim()) return toast.error("What's not in resume is required.");
        if (!careerGoal.trim()) return toast.error('Career goal is required.');
        if (!approach.trim()) return toast.error('Approach is required.');

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submission = {
            resumeURL: stepTwoData.resume.name, // Replace with actual uploaded file URL
            whatsNotInResume: stepTwoData.notInResume,
            whatDoYouWantToBe: stepTwoData.careerGoal,
            approachTowardsIt: stepTwoData.approach,
            randomInteger: Number(finalint),
        };

        SubmitFormTwo(submission);
        toast.success('Form submitted!');
        onNext();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full max-w-xl mx-auto"
        >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1B] mb-6 text-center">
                Authentication - Step 2
            </h1>

            <div className="space-y-6">
                {/* Resume Upload */}
                <div>
                    <label className="block font-medium mb-2">Upload your resume</label>
                    <div className="flex w-full">
                        <span className="w-full p-3 border-2 border-r-0 border-gray-300 rounded-l-lg bg-white text-black truncate">
                            {stepTwoData.resume ? stepTwoData.resume.name : "No file selected"}
                        </span>
                        <label htmlFor="resume" className="bg-[#FFCB47] p-3 rounded-r-lg cursor-pointer flex items-center hover:bg-[#e6b73e] transition">
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
                        <label className="block font-medium mb-2" htmlFor={id}>{placeholder}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {icon}
                            </div>
                            <input
                                type="text"
                                id={id}
                                name={id}
                                value={stepTwoData[id]}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 p-3 border-2 border-gray-300 rounded-lg"
                                placeholder={placeholder}
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-[#CB0000] hover:text-black font-medium"
                    >
                        Go back
                    </button>
                    <button
                        type="submit"
                        className="bg-[#FFCB47] text-[#1B1B1B] font-bold py-3 px-8 sm:px-12 rounded-lg hover:bg-[#e6b73e] transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
