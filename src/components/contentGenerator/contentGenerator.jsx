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

    try {
      const response = await fetch(`${backendURL}/api/resumemaker/generate-content`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedContent(data);
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setTimeout(() => {
        document.getElementById("output-section")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const copyToClipboard = async (content, type) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: `${type} copied!`,
        description: "Content has been copied to your clipboard.",
      })
    } catch {
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
      <div className="pt-16 sm:pt-20">
        {/* Hero Section - More Compact */}
        <section className="container mx-auto px-3 sm:px-6 py-3 sm:py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-white leading-tight">
              Career Content Generator
            </h1>
            <p className="text-sm sm:text-lg text-gray-300 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-1 sm:px-2">
              Transform your job applications with AI-powered cover letters, cold emails, and LinkedIn messages tailored to your target role.
            </p>
          </div>
        </section>

        {/* Main Layout - Side by Side for Desktop, Stacked for Mobile */}
        <div className="container mx-auto px-3 sm:px-6 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Input Section - Left Side */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-800/50 shadow-2xl sticky top-20">
                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                  {/* Job Description Input */}
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    <label className="block text-xs sm:text-sm lg:text-base font-semibold text-amber-300 mb-1">
                      Job Description *
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <textarea
                        placeholder="Paste the complete job description here..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                        className="w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2 sm:py-2.5 bg-black/80 border border-gray-700 rounded-md sm:rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 resize-none text-xs sm:text-sm leading-relaxed min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    <label className="block text-xs sm:text-sm lg:text-base font-semibold text-amber-300 mb-1">
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
                      <Button asChild variant="outline" className={`w-full h-9 sm:h-10 lg:h-11 border-2 rounded-md sm:rounded-lg font-semibold transition-all duration-300 text-xs ${
                        resumeFile
                          ? "border-amber-300 bg-amber-300/10 text-amber-300 hover:bg-amber-300/20"
                          : "border-gray-700 bg-black/80 text-gray-300 hover:border-amber-300 hover:text-amber-300 hover:bg-amber-300/5"
                      }`}>
                        <label htmlFor="resume-upload" className="cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 w-full h-full px-2">
                          {resumeFile ? (
                            <>
                              <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate text-xs sm:text-sm">Resume Added - {resumeFile.name}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="text-xs sm:text-sm">Upload Resume (PDF, DOC, DOCX)</span>
                            </>
                          )}
                        </label>
                      </Button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="pt-1 sm:pt-2">
                    <Button
                      onClick={generateContent}
                      disabled={isGenerating || !jd.trim()}
                      className="w-full h-9 sm:h-10 lg:h-11 bg-amber-300 hover:bg-amber-400 text-black font-bold rounded-md sm:rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                          <span>Generating Content...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Generate Career Content</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section - Right Side */}
            <div className="order-1 lg:order-2" id="output-section">
              {/* Loading Animation */}
              {isGenerating && (
                <div className="flex justify-center items-center min-h-[200px] sm:min-h-[300px]">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/80 rounded-lg sm:rounded-xl border border-gray-800/50 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm">Generating content...</span>
                  </div>
                </div>
              )}

              {/* Generated Content */}
              {generatedContent && !isGenerating && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-center lg:text-left mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">Your Generated Content</h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-300">Copy and customize these templates for your job applications</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Cover Letter */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-800/50 overflow-hidden shadow-xl">
                      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-800/50 bg-gray-800/30">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full flex-shrink-0"></div>
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 flex-shrink-0" />
                        <span className="font-bold text-white text-xs sm:text-sm">Cover Letter</span>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="bg-black/80 rounded-md sm:rounded-lg p-2.5 sm:p-3 mb-2.5 sm:mb-3 max-h-36 sm:max-h-48 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                          <pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono leading-relaxed">
                            {generatedContent["Cover Letter"]}
                          </pre>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(generatedContent["Cover Letter"], "Cover Letter")}
                          className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-8 sm:h-9 rounded-md sm:rounded-lg transition-all duration-300 text-xs shadow-lg hover:shadow-amber-300/20"
                        >
                          <Copy className="w-3 h-3 mr-1.5 sm:mr-2" />
                          Copy Cover Letter
                        </Button>
                      </div>
                    </div>

                    {/* Cold Email */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-800/50 overflow-hidden shadow-xl">
                      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-800/50 bg-gray-800/30">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full flex-shrink-0"></div>
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 flex-shrink-0" />
                        <span className="font-bold text-white text-xs sm:text-sm">Cold Email</span>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="bg-black/80 rounded-md sm:rounded-lg p-2.5 sm:p-3 mb-2.5 sm:mb-3 max-h-36 sm:max-h-48 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                          <pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono leading-relaxed">
                            {generatedContent["Cold Email"]}
                          </pre>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(generatedContent["Cold Email"], "Cold Email")}
                          className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-8 sm:h-9 rounded-md sm:rounded-lg transition-all duration-300 text-xs shadow-lg hover:shadow-amber-300/20"
                        >
                          <Copy className="w-3 h-3 mr-1.5 sm:mr-2" />
                          Copy Cold Email
                        </Button>
                      </div>
                    </div>

                    {/* LinkedIn DM */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-800/50 overflow-hidden shadow-xl">
                      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-800/50 bg-gray-800/30">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full flex-shrink-0"></div>
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 flex-shrink-0" />
                        <span className="font-bold text-white text-xs sm:text-sm">LinkedIn DM</span>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="bg-black/80 rounded-md sm:rounded-lg p-2.5 sm:p-3 mb-2.5 sm:mb-3 max-h-36 sm:max-h-48 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                          <pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono leading-relaxed">
                            {generatedContent["DM Message"]}
                          </pre>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(generatedContent["DM Message"], "LinkedIn DM")}
                          className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-8 sm:h-9 rounded-md sm:rounded-lg transition-all duration-300 text-xs shadow-lg hover:shadow-amber-300/20"
                        >
                          <Copy className="w-3 h-3 mr-1.5 sm:mr-2" />
                          Copy LinkedIn DM
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!generatedContent && !isGenerating && (
                <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Ready to Generate</h3>
                  <p className="text-gray-400 text-xs sm:text-sm px-2">Enter a job description and click generate to create your career content</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}