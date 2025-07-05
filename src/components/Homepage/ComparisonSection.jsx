import React from 'react';
import { ArrowRight, X, CheckCircle } from 'lucide-react';

export const ComparisonSection = () => {
const comparisons = [
 {
old: "PDFs, videos, timelines",
new: "Modular AI Agents"
 },
 {
old: "To-do lists and notes",
new: "Autonomously managed career actions"
 },
 {
old: "Motivation tricks",
new: "Adaptive scoring and nudges"
 },
 {
old: "Manual resumes",
new: "AI-generated, role-aligned resumes"
 },
 {
old: "Passive content",
new: "Thinking, planning, evolving system"
 }
 ];

return (
<div className="min-h-screen bg-gray-50 py-12">
<div className="max-w-6xl mx-auto px-6">
{/* Header */}
<div className="text-center mb-16">
<h1 className="text-5xl font-bold text-black mb-4">You Get vs. What You Need</h1>
<p className="text-xl text-gray-600">The difference between tools and systems.</p>
</div>

{/* Column Headers */}
<div className="grid grid-cols-2 gap-8 mb-12">
<div className="text-center">
<h2 className="text-3xl font-bold text-gray-700 mb-2">Current World</h2>
<p className="text-gray-500 text-lg">(What you get everywhere else)</p>
</div>
<div className="text-center">
<h2 className="text-3xl font-bold text-red-600 mb-2">GeniOS World</h2>
<p className="text-gray-500 text-lg">(What you actually need)</p>
</div>
</div>

{/* Comparison Cards */}
<div className="space-y-6">
{comparisons.map((comparison, index) => (
<div 
key={index} 
className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
>
<div className="flex items-center justify-between">
{/* Left side - Current World */}
<div className="flex items-center space-x-4 flex-1">
<X className="w-6 h-6 text-red-500 flex-shrink-0" />
<span className="text-gray-800 text-lg font-medium">{comparison.old}</span>
</div>

{/* Arrow */}
<ArrowRight className="w-8 h-8 text-red-500 mx-8 flex-shrink-0" />

{/* Right side - GeniOS World */}
<div className="flex items-center space-x-4 flex-1">
<CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
<span className="text-gray-900 font-semibold text-lg">{comparison.new}</span>
</div>
</div>
</div>
 ))}
</div>

{/* Bottom CTA */}
<div className="text-center mt-20">
<p className="text-3xl font-bold text-gray-900 mb-8">
 You've tried learning. Now try upgrading.
</p>
<button className="bg-red-400 hover:bg-red-500 text-white text-xl font-semibold px-12 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
 Install Intelligence → Join Waitlist
</button>
</div>
</div>
</div>
 );
};