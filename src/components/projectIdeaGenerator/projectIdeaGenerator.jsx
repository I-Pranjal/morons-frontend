"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Loader2, BookOpen, Code, Database, Shield, Palette, Cloud, Coins, X } from "lucide-react"
import Navbar from "../Navbar"
import Footer from "../footer"
import axios from "axios"

function Lightbulb(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

const domains = [
  { value: "sde", label: "Software Development", icon: Code },
  { value: "data-science", label: "Data Science", icon: Database },
  { value: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { value: "ui-ux", label: "UI/UX Design", icon: Palette },
  { value: "devops", label: "DevOps", icon: Cloud },
  { value: "web3", label: "Web3/Blockchain", icon: Coins },
]

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export default function ProjectIdeasGenerator() {
  const [domain, setDomain] = useState("")
  const [techStackInput, setTechStackInput] = useState("")
  const [techStack, setTechStack] = useState([])
  const [level, setLevel] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [projectIdeas, setProjectIdeas] = useState([])
  const [hasGenerated, setHasGenerated] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleGenerateIdeas = async () => {
    if (!domain || !level) return

    setIsLoading(true)
    
    try {
      // Log the response for debugging
      console.log("Request sent to backend:", {
          domain,
          techStack: techStack.length > 0 ? techStack : undefined,
          level,
      });
      
      const response = await axios.post(`${backendURL}/api/v2/suggestproject`, {
        domain,
        techStack: techStack.length > 0 ? techStack : undefined,
        level,    
      }); 

      console.log("Response from backend:", response.data);
      
      const ideas = response.data;
      setProjectIdeas(ideas)
      setHasGenerated(true)
    } catch (error) {
      console.error("Error generating ideas:", error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  const handleTechStackKeyDown = (e) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      techStackInput.trim() !== ""
    ) {
      e.preventDefault()
      const value = techStackInput.trim().replace(/,$/, "")
      if (value && !techStack.includes(value)) {
        setTechStack([...techStack, value])
      }
      setTechStackInput("")
    }
  }

  const removeTechStack = (item) => {
    setTechStack(techStack.filter((t) => t !== item))
  }

  const isFormValid = domain && level

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
              Project Ideas Generator
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get personalized project ideas based on your domain, tech stack, and experience level
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8 mb-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-6 w-6 text-amber-400 mr-3" />
              <h2 className="text-xl font-semibold">Configure Your Preferences</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Domain Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Domain
                </label>
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 hover:border-amber-400 text-white h-12">
                    <SelectValue placeholder="Select your domain" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {domains.map((d) => {
                      const Icon = d.icon
                      return (
                        <SelectItem key={d.value} value={d.value} className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-amber-400" />
                            {d.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((levelOption) => (
                    <Button
                      key={levelOption.value}
                      variant="outline"
                      onClick={() => setLevel(levelOption.value)}
                      className={`h-12 text-sm ${
                        level === levelOption.value
                          ? "bg-amber-400 text-black border-amber-400 hover:bg-amber-500"
                          : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-amber-400"
                      }`}
                    >
                      {levelOption.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tech Stack Input - Full Width */}
              <div className="lg:col-span-2 space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Tech Stack (Optional)
                </label>
                
                {/* Display selected tech stack */}
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {techStack.map((item) => (
                      <Badge
                        key={item}
                        className="bg-amber-400/20 text-amber-400 border-amber-400/30 px-3 py-1"
                      >
                        {item}
                        <button
                          type="button"
                          className="ml-2 hover:text-amber-300"
                          onClick={() => removeTechStack(item)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <Input
                  placeholder="Type technologies and press Enter..."
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  onKeyDown={handleTechStackKeyDown}
                  className="bg-gray-800 border-gray-700 hover:border-amber-400 text-white placeholder:text-gray-500 h-12"
                />
                <p className="text-xs text-gray-500">
                  Press Enter or comma to add. Separate multiple technologies.
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <Button
                onClick={handleGenerateIdeas}
                disabled={!isFormValid || isLoading}
                className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 h-12 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  "Generate Project Ideas"
                )}
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
                <p className="text-gray-300">Generating personalized project ideas...</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {hasGenerated && !isLoading && (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-6 w-6 text-amber-400 mr-3" />
                <h2 className="text-xl font-semibold">Project Ideas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 hover:border-amber-400 rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-amber-400 mb-3">
                      {idea.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="bg-amber-400/10 text-amber-400 border-amber-400/30 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasGenerated && !isLoading && (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-gray-400">
                Fill out the form above to generate your personalized project ideas.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}