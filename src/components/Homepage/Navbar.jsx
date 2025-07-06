import React , {useState} from 'react';
import { UserIcon } from 'lucide-react';
import { isObject } from 'framer-motion';
import LoginPage from '@/pages/LoginPage';

function Navbar() {

  return (
    <div className="fixed top-0 w-full z-20 bg-white shadow-sm px-4 sm:px-6 md:px-10 py-2 flex items-center justify-between">
      {/* Logo */}
      <img
        src="/975dc50d-91b9-47e0-b60a-734e8c3f7cf0.png"
        alt="GeniOS"
        className="h-12 md:h-16 object-contain"
      />

      {/* Right Side: Welcome and Button */}
      <div className="flex items-center gap-4 text-gray-600">
        <p className="text-sm sm:text-base">Welcome, <span className="text-gray-700 font-medium">Pranjal</span></p>
        <button className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition" onClick={() => window.location.href = '/login'}>
          <UserIcon className="h-5 w-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-800">Sign in </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
