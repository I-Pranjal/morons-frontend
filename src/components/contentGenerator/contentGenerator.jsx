"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import mockContent from "./data"
import { Input } from "@/components/ui/input"
import {
  Plus,
  FileText,
  Mail,
  MessageCircle,
  Copy,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Search,
  Check,
  Loader2,
} from "lucide-react"
import Navbar from "../Navbar"
import Footer from "../footer"

export default function CareerContentGenerator() {
  const [jd, setJd] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setResumeFile(file)
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume will help personalize the generated content.",
      })
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
      })
    }
  }

  const generateContent = async () => {
    if (!jd.trim()) {
      toast({
        title: "Job description required",
        description: "Please paste a job description to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    const formData = new FormData();
    formData.append("jd", jd);
    if (resumeFile) formData.append("resume", resumeFile);

    const response = await fetch(`${backendURL}/api/resumemaker/generate-content`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setIsGenerating(false);

    if (response.ok) {
      setGeneratedContent(data);
    } else {
      alert(data.error || "Something went wrong.");
    }

    setIsGenerating(false)
    // Scroll to output section
    setTimeout(() => {
      document.getElementById("output-section")?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  const copyToClipboard = async (content, type) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: `${type} copied!`,
        description: "Content has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying the text manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Main Content Container */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Career Content Generator
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your job applications with AI-powered cover letters, cold emails, and LinkedIn messages tailored to your target role.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="container mx-auto px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50 shadow-2xl">
              <div className="space-y-6">
                {/* Job Description Input */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-amber-300 mb-3">
                    Job Description *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      placeholder="Paste the complete job description here..."
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-black/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 resize-none min-h-[100px] text-sm leading-relaxed"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-amber-300 mb-3">
                    Resume (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <Button
                      asChild
                      variant="outline"
                      className={`w-full h-12 border-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                        resumeFile
                          ? "border-amber-300 bg-amber-300/10 text-amber-300 hover:bg-amber-300/20"
                          : "border-gray-700 bg-black/80 text-gray-300 hover:border-amber-300 hover:text-amber-300 hover:bg-amber-300/5"
                      }`}
                    >
                      <label htmlFor="resume-upload" className="cursor-pointer flex items-center justify-center gap-3 w-full h-full">
                        {resumeFile ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span>Resume Added - {resumeFile.name}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            <span>Upload Resume (PDF, DOC, DOCX)</span>
                          </>
                        )}
                      </label>
                    </Button>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <Button
                    onClick={generateContent}
                    disabled={isGenerating || !jd.trim()}
                    className="w-full h-12 bg-amber-300 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg hover:shadow-amber-300/20"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating Content...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        <span>Generate Career Content</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading Animation */}
        {isGenerating && (
          <section className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-6 px-10 py-6 bg-gray-900/80 rounded-3xl border border-gray-800/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-white font-semibold text-lg">Generating your personalized career content...</span>
              </div>
            </div>
          </section>
        )}

        {/* Output Section */}
        {generatedContent && !isGenerating && (
          <section id="output-section" className="container mx-auto px-6 py-16">
            <div className="max-w-full mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Your Generated Content</h2>
                <p className="text-xl text-gray-300">Copy and customize these templates for your job applications</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 max-w-none">
                {/* Cover Letter */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-4 h-4 bg-amber-300 rounded-full"></div>
                    <FileText className="w-6 h-6 text-amber-300" />
                    <span className="font-bold text-white text-lg">Cover Letter</span>
                  </div>
                  <div className="p-6">
                    <div className="bg-black/80 rounded-2xl p-5 mb-6 max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["Cover Letter"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["Cover Letter"], "Cover Letter")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-12 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Cover Letter
                    </Button>
                  </div>
                </div>

                {/* Cold Email */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-4 h-4 bg-amber-300 rounded-full"></div>
                    <Mail className="w-6 h-6 text-amber-300" />
                    <span className="font-bold text-white text-lg">Cold Email</span>
                  </div>
                  <div className="p-6">
                    <div className="bg-black/80 rounded-2xl p-5 mb-6 max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["Cold Email"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["Cold Email"], "Cold Email")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-12 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Cold Email
                    </Button>
                  </div>
                </div>

                {/* LinkedIn DM */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-4 h-4 bg-amber-300 rounded-full"></div>
                    <MessageCircle className="w-6 h-6 text-amber-300" />
                    <span className="font-bold text-white text-lg">LinkedIn DM</span>
                  </div>
                  <div className="p-6">
                    <div className="bg-black/80 rounded-2xl p-5 mb-6 max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["DM Message"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["DM Message"], "LinkedIn DM")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-12 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy LinkedIn DM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}