"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Upload, FileText, ChevronDown, ChevronUp, Briefcase, Zap, Target } from "lucide-react"
import Navbar from "../Navbar"

export default function JobComparator() {
  const [jd1Open, setJd1Open] = useState(true)
  const [jd2Open, setJd2Open] = useState(true)
  const [jd1Text, setJd1Text] = useState("")
  const [jd2Text, setJd2Text] = useState("")
  const [activeTab, setActiveTab] = useState("compare")

  // Mock comparison data
  const [comparisonData, setComparisonData] = useState([])

  const tabs = [
    { id: "home", label: "Home" },
    { id: "compare", label: "Compare" },
    { id: "analyzer", label: "Resume Analyzer" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white w-fit min-w-screen">
        <Navbar />
      <div className="container mx-auto px-6 py-8 ">
        <div className="grid lg:grid-cols-2 gap-8 h-full mt-20">
          {/* Left Panel - Input Section */}
          <div className="space-y-6">
            {/* <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Job Role Comparator</h1>
              <p className="text-gray-400 text-lg">
                Compare job descriptions side by side to make informed career decisions
              </p>
            </div> */}

            {/* JD1 Input Card */}
            <Card className="bg-[#1a1a1a] border-gray-700 shadow-2xl hover:shadow-amber-400/10 transition-all duration-300">
              <CardHeader className="rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                    <span>Job Description 1</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter job title, paste JD, or upload PDF..."
                  value={jd1Text}
                  onChange={(e) => setJd1Text(e.target.value)}
                  className="min-h-[200px] bg-[#0e0e0e] border-gray-600 focus:border-amber-400 focus:ring-amber-400/20 text-white placeholder-gray-500 resize-none"
                />
                <div className="flex items-center space-x-4">
                  <Input type="file" accept=".pdf" className="hidden" id="jd1-file" />
                  <label
                    htmlFor="jd1-file"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-600 hover:border-amber-400 text-amber-300 font-bold"
                  >
                    <Upload className="h-4 w-4 text-amber-400" />
                    <span className="text-sm">Upload PDF</span>
                  </label>
                  <FileText className="h-5 w-5 text-amber-400 drop-shadow-lg shadow-amber-400/50" />
                </div>
              </CardContent>
            </Card>

            {/* JD2 Input Card */}
            <Card className="bg-[#1a1a1a] border-gray-700 shadow-2xl hover:shadow-amber-400/10 transition-all duration-300">
              <CardHeader className="rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                    <span>Job Description 2</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter job title, paste JD, or upload PDF..."
                  value={jd2Text}
                  onChange={(e) => setJd2Text(e.target.value)}
                  className="min-h-[200px] bg-[#0e0e0e] border-gray-600 focus:border-amber-400 focus:ring-amber-400/20 text-white placeholder-gray-500 resize-none"
                />
                <div className="flex items-center space-x-4">
                  <Input type="file" accept=".pdf" className="hidden" id="jd2-file" />
                  <label
                    htmlFor="jd2-file"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-600 hover:border-amber-400 text-amber-300 font-bold "
                  >
                    <Upload className="h-4 w-4 text-amber-400" />
                    <span className="text-sm">Upload PDF</span>
                  </label>
                  <FileText className="h-5 w-5 text-amber-400 drop-shadow-lg shadow-amber-400/50" />
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-xl shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition-all duration-300 py-3"
              onClick={() => {
                // Simulate loading and then set data
                setTimeout(() => {
                  setComparisonData([
                    { parameter: "Job Title", jd1: "Senior Frontend Developer", jd2: "Full Stack Engineer", match: false },
                    { parameter: "Salary Range", jd1: "$80k - $120k", jd2: "$90k - $130k", match: true },
                    { parameter: "Location", jd1: "San Francisco, CA", jd2: "Remote", match: false },
                    { parameter: "Experience", jd1: "5+ years", jd2: "3-5 years", match: true },
                    { parameter: "Education", jd1: "Bachelor's Degree", jd2: "Bachelor's/Master's", match: true },
                    { parameter: "Company Size", jd1: "Startup (50-200)", jd2: "Enterprise (1000+)", match: false },
                    { parameter: "Tech Stack", jd1: "React, TypeScript, Node.js", jd2: "React, Python, AWS", match: true },
                    { parameter: "Benefits", jd1: "Health, Dental, 401k", jd2: "Health, Dental, Stock Options", match: true },
                  ])
                }, 1000)
              }}
            >
              <Zap className="h-5 w-5 mr-2" />
              Compare Jobs
            </Button>
          </div>

          {/* Right Panel - Comparison Results */}
          <div className="space-y-6">
            <Card className="bg-[#1a1a1a] border-gray-700 shadow-2xl h-fit min-h-[200px] flex flex-col justify-center items-center w-full max-w-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Target className="h-6 w-6 text-amber-400" />
                  <span>Comparison Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                {comparisonData.length === 0 ? (
                  <div className="text-center text-gray-400 text-lg py-12">Enter jobs to compare</div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <table className="w-[600px] min-w-[600px] max-w-none table-fixed bg-[#18181b] rounded-xl border-separate border-spacing-0">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-2 text-amber-400 font-bold w-1/3 min-w-[120px]">Parameter</th>
                          <th className="text-left py-3 px-2 text-gray-300 w-1/3 min-w-[120px]">Job 1</th>
                          <th className="text-left py-3 px-2 text-gray-300 w-1/3 min-w-[120px]">Job 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors group"
                          >
                            <td className="py-4 px-2 font-medium text-white group-hover:text-amber-400 transition-colors">
                              {row.parameter}
                            </td>
                            <td className="py-4 px-2 text-gray-300">
                              <div className="flex items-center space-x-2">
                                <span>{row.jd1}</span>
                                {!row.match && (
                                  <Badge variant="destructive" className="text-xs bg-red-500">
                                    Diff
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-gray-300">
                              <div className="flex items-center space-x-2">
                                <span>{row.jd2}</span>
                                {row.match && <Badge className="bg-green-600 hover:bg-green-700 text-xs">Match</Badge>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {comparisonData.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#1a1a1a] border-gray-700 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">75%</div>
                    <div className="text-sm text-gray-400">Match Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1a1a] border-gray-700 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">8/8</div>
                    <div className="text-sm text-gray-400">Parameters</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
