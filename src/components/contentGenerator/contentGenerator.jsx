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

    const formData = new FormData() ; 
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
    <div className="min-h-screen  bg-violet-200">
      <Navbar /> 

      {/* Hero Section */}
      <section className="container mx-0 px-4 py-10 ">
        <div className="max-w-4xl mx-auto mt-6 ">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-neutral-800 mt-20">
            Career Content Generator
          </h2>
        </div>
      </section>

      {/* Input Section - Single Row */}
      <section className={`container mx-auto px-4 py-0
        ${
          !generatedContent ? "min-h-screen" : " "
        }
        `}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-6xl mx-auto space-y-3">
  {/* Input row: Input + Upload */}
  <div className="flex flex-row gap-3 flex-wrap">
    {/* Job Description Input */}
    <div className="flex-1 min-w-[220px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Paste job description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="pl-10 h-10 text-sm sm:text-base border rounded-3xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm w-full "
        />
      </div>
    </div>

    {/* Resume Upload Button */}
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
        className={`h-10 px-4 border-2 transition-all duration-200 w-full sm:w-auto text-sm rounded-md shadow-sm
          ${
            resumeFile
              ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100"
              : "border-gray-300 bg-amber-200 hover:border-blue-500 hover:bg-amber-300"
          }`}
      >
        <label htmlFor="resume-upload" className="cursor-pointer flex items-center gap-2">
          {resumeFile ? (
            <>
              <Check className="w-5 h-5" />
              <span className="hidden sm:inline">Resume Added</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Resume</span>
            </>
          )}
        </label>
      </Button>
    </div>
  </div>

  {/* Generate Button on Separate Row */}
  <div className="w-full">
    <Button
      onClick={generateContent}
      disabled={isGenerating}
      className="h-10 px-6 w-full sm:w-auto text-sm rounded-md shadow-sm"
    >
      {isGenerating ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="hidden sm:inline">Generating...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>Generate Content</span>
        </div>
      )}
    </Button>
  </div>
</div>

        </div>
      </section>

      {/* Loading Animation */}
      {isGenerating && (
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow border">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Generating your career content...</span>
            </div>
          </div>
        </section>
      )}

      {/* Output Section - macOS Style */}
      {generatedContent && !isGenerating && (
        <section id="output-section" className="container mx-auto px-4 py-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Your Generated Career Content</h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cover Letter - macOS Style */}
              <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                
                  <div className="flex items-center gap-2 ml-3 mt-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-700">Cover Letter</span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="max-h-72 overflow-y-auto mb-3">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {generatedContent["Cover Letter"]}
                    </pre>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(generatedContent.coverLetter, "Cover Letter")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm rounded-md shadow-sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Cover Letter
                  </Button>
                </div>
              </div>

              {/* Cold Email - macOS Style */}
              <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                {/* macOS Window Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200 text-sm">
                 
                  <div className="flex items-center gap-2 ml-3">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-700">Cold Email</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="max-h-72 overflow-y-auto mb-3">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {generatedContent["Cold Email"]}
                    </pre>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(generatedContent.coldEmail, "Cold Email")}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white h-10 text-sm rounded-md shadow-sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Cold Email
                  </Button>
                </div>
              </div>

              {/* LinkedIn DM - macOS Style */}
              <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                {/* macOS Window Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200 text-sm">
                 
                  <div className="flex items-center gap-2 ml-3">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-gray-700">LinkedIn DM</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="max-h-72 overflow-y-auto mb-3">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {generatedContent["DM Message"]}
                    </pre>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(generatedContent.dmMessage, "LinkedIn DM")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-10 text-sm rounded-md shadow-sm"
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
        <Footer />

       </div>
  )
}
