import { useState } from "react";

const useSubmitFormTwo = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const SubmitFormTwo = async (formData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("https://moronss-backend.onrender.com/api/forms/formtwo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            return; 
        } catch (err) {
            setError(err.message || "An error occurred");
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        error,
        SubmitFormTwo,
    };
};

export default useSubmitFormTwo;