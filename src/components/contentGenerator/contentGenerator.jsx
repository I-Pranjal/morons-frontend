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
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              Career Content Generator
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-auto max-w-3xl mx-auto leading-relaxed px-2">
              Transform your job applications with AI-powered cover letters, cold emails, and LinkedIn messages tailored to your target role.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800/50 shadow-2xl">
              <div className="space-y-4 sm:space-y-6">
                {/* Job Description Input */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-base sm:text-lg font-semibold text-amber-300 mb-2 sm:mb-3">
                    Job Description *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <textarea
                      placeholder="Paste the complete job description here..."
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 bg-black/80 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 resize-none text-sm leading-relaxed min-h-[120px] sm:min-h-[140px]"
                      rows={6}
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-base sm:text-lg font-semibold text-amber-300 mb-2 sm:mb-3">
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
                    <Button asChild variant="outline" className={`w-full h-11 sm:h-12 border-2 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                      resumeFile
                        ? "border-amber-300 bg-amber-300/10 text-amber-300 hover:bg-amber-300/20"
                        : "border-gray-700 bg-black/80 text-gray-300 hover:border-amber-300 hover:text-amber-300 hover:bg-amber-300/5"
                    }`}>
                      <label htmlFor="resume-upload" className="cursor-pointer flex items-center justify-center gap-2 sm:gap-3 w-full h-full px-2">
                        {resumeFile ? (
                          <>
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="truncate">Resume Added - {resumeFile.name}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>Upload Resume (PDF, DOC, DOCX)</span>
                          </>
                        )}
                      </label>
                    </Button>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-2 sm:pt-4">
                  <Button
                    onClick={generateContent}
                    disabled={isGenerating || !jd.trim()}
                    className="w-full h-11 sm:h-12 bg-amber-300 hover:bg-amber-400 text-black font-bold rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-amber-300/20"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span>Generating Content...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
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
          <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 sm:gap-6 px-6 sm:px-10 py-4 sm:py-6 bg-gray-900/80 rounded-2xl sm:rounded-3xl border border-gray-800/50 backdrop-blur-sm">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-white font-semibold text-sm sm:text-lg">Generating your personalized career content...</span>
              </div>
            </div>
          </section>
        )}

        {/* Output Section */}
        {generatedContent && !isGenerating && (
          <section id="output-section" className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div className="max-w-full mx-auto">
              <div className="text-center mb-8 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Your Generated Content</h2>
                <p className="text-lg sm:text-xl text-gray-300 px-2">Copy and customize these templates for your job applications</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-none">
                {/* Cover Letter */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full flex-shrink-0"></div>
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 flex-shrink-0" />
                    <span className="font-bold text-white text-base sm:text-lg">Cover Letter</span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="bg-black/80 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["Cover Letter"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["Cover Letter"], "Cover Letter")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-10 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Copy Cover Letter
                    </Button>
                  </div>
                </div>

                {/* Cold Email */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full flex-shrink-0"></div>
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 flex-shrink-0" />
                    <span className="font-bold text-white text-base sm:text-lg">Cold Email</span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="bg-black/80 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["Cold Email"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["Cold Email"], "Cold Email")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-10 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Copy Cold Email
                    </Button>
                  </div>
                </div>

                {/* LinkedIn DM */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-300 rounded-full flex-shrink-0"></div>
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 flex-shrink-0" />
                    <span className="font-bold text-white text-base sm:text-lg">LinkedIn DM</span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="bg-black/80 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto border border-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                        {generatedContent["DM Message"]}
                      </pre>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedContent["DM Message"], "LinkedIn DM")}
                      className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-10 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-lg hover:shadow-amber-300/20"
                    >
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
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