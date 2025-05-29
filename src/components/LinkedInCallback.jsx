import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 

const LinkedInCallback = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
useEffect(() => {
  const token = new URLSearchParams(window.location.search).get("token");
  if (token) {
    const newuser = jwtDecode(token);
    setUser(newuser);
    console.log("User data from LinkedIn:", newuser);
    localStorage.setItem("user", JSON.stringify(newuser));
    navigate("/dashboard");
    setLoading(false);
  } else {
    setLoading(false);
  }
}, []);


  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-amber-500 border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 text-amber-600 text-lg font-medium">Signing you in...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {user ? (
        <pre className="bg-gray-100 p-4 rounded-md">User found </pre>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
};

export default LinkedInCallback;
