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
  const [level, setlevel] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [projectIdeas, setProjectIdeas] = useState([])
  const [hasGenerated, setHasGenerated] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


  const handleGenerateIdeas = async () => {
    if (!domain || !level) return

    setIsLoading(true)
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
    // Mock response based on domain
    const ideas = response.data ; 
    setProjectIdeas(ideas)
    setHasGenerated(true)
    setIsLoading(false)
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Navbar />
      <div className="container w-auto mx-auto p-4 mt-20">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full">
            <div className="bg-[#121212] rounded-lg mb-6"></div>
            {/* Main Content */}
            <div className="bg-[#121212] rounded-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="mr-4 text-[#f0c14b]">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Project Generator</h2>
                  <div className="h-1 w-12 bg-[#f0c14b] mt-2"></div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                Get personalized project ideas based on your domain, tech stack, and experience level. Perfect for
                portfolio building, learning new skills, or finding inspiration.
              </p>

              <div className="space-y-6">
                {/* Domain Selection */}
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <div className="relative">
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger
                        className="bg-[#1e1e1e] border-[#333] text-white"
                        onClick={() => setSelectOpen((o) => !o)}
                      >
                        <SelectValue
                          placeholder="Select your domain"
                          value={domain}
                          options={domains}
                        />
                      </SelectTrigger>
                      <SelectContent open={selectOpen} setOpen={setSelectOpen}>
                        {domains.map((d) => {
                          const Icon = d.icon
                          return (
                            <SelectItem
                              key={d.value}
                              value={d.value}
                              onValueChange={setDomain}
                              setOpen={setSelectOpen}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-[#f0c14b]" />
                                {d.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tech Stack Input */}
                <div>
                  <label htmlFor="techStack" className="block text-sm font-medium text-gray-300 mb-2">
                    Tech Stack (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {techStack.map((item, idx) => (
                      <span
                        key={item}
                        className="flex items-center bg-[#232323] border border-[#f0c14b]/30 text-[#f0c14b] rounded-full px-3 py-1 text-xs font-semibold"
                      >
                        {item}
                        <button
                          type="button"
                          className="ml-2 focus:outline-none"
                          onClick={() => removeTechStack(item)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <Input
                      id="techStack"
                      placeholder="Type and press Enter…"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      onKeyDown={handleTechStackKeyDown}
                      className="bg-[#1e1e1e] border-[#333] text-white placeholder:text-gray-500 min-w-[120px] flex-1"
                      style={{ width: "auto" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add. Separate multiple technologies.</p>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {levels.map((level) => (
                      <Button
                        key={level.value}
                        variant="outline"
                        onClick={() => setlevel(level.value)}
                        className={`${
                          level === level.value
                            ? "bg-[#f0c14b] text-black border-[#f0c14b] hover:bg-[#f0c14b] hover:text-black"
                            : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#333]"
                        }`}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateIdeas}
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-[#f0c14b] hover:bg-[#f8d878] text-black font-semibold py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    "Generate Project Ideas"
                  )}
                </Button>
              </div>
            </div>

            {/* Results */}
            {hasGenerated && !isLoading && (
              <div className="bg-[#121212] rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-4 text-[#f0c14b]">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Project Ideas</h2>
                    <div className="h-1 w-12 bg-[#f0c14b] mt-2"></div>
                  </div>
                </div>

                {/* Responsive grid for cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectIdeas.map((idea, index) => (
                    <div
                      key={index}
                      className="bg-[#18181b] border border-[#333] rounded-xl p-6 shadow-lg hover:border-[#f0c14b] transition-all duration-300 flex flex-col h-full"
                    >
                      <h3 className="text-xl font-bold mb-2 text-[#f0c14b]">{idea.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 flex-1">{idea.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {idea.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="bg-[#232323] text-[#f0c14b] border-[#f0c14b]/30 text-base px-4 py-2 font-semibold"
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

            {/* Loading State */}
            {isLoading && (
              <div className="bg-[#121212] rounded-lg p-6 text-center">
                <div className="inline-flex items-center gap-3 text-gray-300">
                  <Loader2 className="h-6 w-6 animate-spin text-[#f0c14b]" />
                  <span>Generating personalized project ideas...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      {/* <Footer /> */}
      </div>
    </div>
  )
}
