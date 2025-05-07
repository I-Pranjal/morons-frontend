import { useState } from "react";
import axios from "axios";

const useSubmitFormOne = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [randomInteger, setRandomInteger] = useState(null);

    const submitForm = async (formDetails) => {
        setLoading(true);
        setError(null);
        setRandomInteger(null);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(
                "https://moronss-backend.onrender.com/api/forms/formone",
                formDetails,
            );
            if (response.status === 200 || response.status === 201) {
                return response.data.data;
            }
            return null;
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { submitForm, loading, error, randomInteger };
};

export default useSubmitFormOne;