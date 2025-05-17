import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; 

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

    const uploadResume = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `/moronss/resume/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};

    return {
        isSubmitting,
        error,
        SubmitFormTwo,
        uploadResume
    };
};

export default useSubmitFormTwo;