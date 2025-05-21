import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";


const useManualSignIn = () => {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { updateUser } = useUser();
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
            updateUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return ; // Return user data or token
        } catch (err) {
            setLoading(false);
            console.error("Error signing in:", err);
            setError(err.response?.data?.message || err.message);
        }
    };

    return {
    email, 
    setEmail, 
    password, 
    setPassword, 
    name, 
    setName, 
    isLoading, 
    error, 
    setError, 
    signIn };
};

export default useManualSignIn;
