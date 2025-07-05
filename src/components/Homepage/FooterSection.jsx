import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';

export default function GeniOSFooter() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
        {/* Left Column - Description */}
        <div className="md:col-span-1">
          <p className="text-gray-300 leading-relaxed">
            Your intelligent career operating system. 
            Accelerate your path to success with AI-powered guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                AI Agents
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Intelligence
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Join Waitlist
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Support</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <a href="mailto:hello@thegenios.com" className="text-gray-300 hover:text-white transition-colors">
                hello@thegenios.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <a href="tel:+918882611248" className="text-gray-300 hover:text-white transition-colors">
                +91-8882611248
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-5 w-5 text-gray-400" />
              <a href="https://thegenios.com" className="text-gray-300 hover:text-white transition-colors">
                thegenios.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border and Copyright */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700">
        <p className="text-center text-gray-400">
          © 2024 GeniOS. All rights reserved. Built with intelligence, designed for success.
        </p>
      </div>
    </footer>
  );
}