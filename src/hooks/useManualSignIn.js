import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";


const useManualSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useUser();
    const API_BASE = import.meta.env.VITE_BACKEND_URL;

    const signIn = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            // Replace with your API endpoint
            const response = await axios.post(`${API_BASE}/api/users`, {
                name,
                email,
                password,
            });

            setLoading(false);
            setUser(response.data.user);
            console.log("User signed in:", response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return ; // Return user data or token
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    };

    return { signIn, loading, error };
};

export default useManualSignIn;
