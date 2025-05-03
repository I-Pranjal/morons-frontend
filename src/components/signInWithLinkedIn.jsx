import React from "react";
import { Button } from './ui/button';


const SignInWithLinkedIn = () => {
    const linkedInLogin = () => {
        const clientId = "866rz0asjacoqy";
        const redirectUri = "https://www.linkedin.com/oauth/v2/authorization"; // React URL
        const state = crypto.randomUUID(); // You can store this in localStorage for CSRF protection

        const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=r_liteprofile%20r_emailaddress&state=${state}`;

        window.location.href = linkedInAuthUrl;
    };

    return (
        <Button 
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 h-10 px-4 rounded-md"
                onClick={linkedInLogin}
              >
                <div className="mr-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </div>
                Sign up with LinkedIn
    </Button>
    );
};

export default SignInWithLinkedIn;