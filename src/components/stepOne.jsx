import { useState } from 'react';
import { User, Phone, School, Ticket, Mic, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useSubmitFormOne from '../hooks/useSubmitFormOne';

export default function StepOne({ onNext, setFinalint }) {
    const { submitForm } = useSubmitFormOne();
    const [formData, setFormData] = useState({
        name: '',
        mobileNo: '',
        collegeName: '',
        graduationYear: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const student = JSON.parse(localStorage.getItem('user'));
        e.preventDefault();
        const { name, mobileNo, collegeName, graduationYear } = formData;

        if (!name || !mobileNo || !collegeName || !graduationYear) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const randomInteger = student?.randomInteger;
            const payload = {
                ...formData,
                graduationYear: Number(graduationYear),
            };
            if (randomInteger) {
                payload.randomInteger = randomInteger;
            }
            const response = await submitForm(payload);
            setFinalint(response);
            toast.success('Step 1 completed!');
            onNext();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit the form. Please try again.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full max-w-xl mx-auto"
        >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1B] mb-6 text-center">
                Authentication - Step 1
            </h1>

            <div className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block font-medium mb-2" htmlFor="name">Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg"
                            placeholder="Enter your full name"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                    </div>
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block font-medium mb-2" htmlFor="mobileNo">Mobile number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg"
                            placeholder="Enter your mobile number"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                    </div>
                </div>

                {/* College Name */}
                <div>
                    <label className="block font-medium mb-2" htmlFor="collegeName">College name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <School className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                        <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg"
                            placeholder="Enter your college name"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                    </div>
                </div>

                {/* Graduation Year */}
                <div>
                    <label className="block font-medium mb-2" htmlFor="graduationYear">Graduation year</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                        <input
                            type="number"
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg"
                            placeholder="Enter your graduation year"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-center pt-4">
                    <button
                        type="submit"
                        className="bg-[#FFCB47] text-[#1B1B1B] font-bold py-3 px-8 sm:px-12 rounded-lg flex items-center hover:bg-[#e6b73e] transition"
                    >
                        Next <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </div>
        </form>
    );
}
