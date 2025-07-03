import React from 'react';

export const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <p className="text-gray-400 text-sm">
            Your intelligent career operating system.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Features</li>
            <li>AI Agents</li>
            <li>Intelligence</li>
            <li>Join Waitlist</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Help Center</li>
            <li>Documentation</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>hello@thegenios.com</li>
            <li>+91-8882611248</li>
            <li>thegenios.com</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs mt-8">
        © 2024 GeniOS. All rights reserved.
      </p>
    </footer>
  );
};