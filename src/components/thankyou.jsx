import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const ThankYou = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center w-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Thank You!</h1>
            <p className="text-lg text-gray-600 my-4">
                Your form has been successfully submitted.
            </p>
            <Button
                className="mt-4 bg-[#FFCB47] text-[#1B1B1B] font-bold py-3 px-12 rounded-lg flex items-center hover:bg-[#e6b73e]"
                onClick={handleGoBack}
            >
                Go Back to Home
            </Button>
        </div>
    );
};

export default ThankYou;
