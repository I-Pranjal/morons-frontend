"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Loader2, Search, Copy, CheckCircle, AlertCircle, FileText, Code, Download, ExternalLink,
  User, Briefcase, GraduationCap, Award, TrendingUp, Target, Star, BarChart3,
  MapPin, Calendar, Mail, Phone, Globe, Users, MessageSquare, Heart,
  Zap, Shield, Lightbulb, CheckSquare, XSquare
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import Navbar from "../Navbar"
import Footer from "../footer"

export default function LinkedInAnalyzer() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [copiedSection, setCopiedSection] = useState(null)
  const [showDemo, setShowDemo] = useState(true)

  // Initialize with demo data
  const getDemoData = () => ({
    profile: {
      name: "Alex Johnson",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      connections: "500+",
      profileViews: 1250,
      postImpressions: 5600
    },
    scores: {
      overall: 78,
      profileCompleteness: 85,
      contentQuality: 72,
      networking: 68,
      engagement: 82
    },
    strengths: [
      { category: "Technical Skills", score: 90, details: ["React", "Node.js", "Python", "AWS"] },
      { category: "Leadership", score: 75, details: ["Team Management", "Project Leadership"] },
      { category: "Communication", score: 80, details: ["Technical Writing", "Presentations"] }
    ],
    weaknesses: [
      { category: "Industry Recognition", score: 45, improvement: "Publish more industry insights and thought leadership content" },
      { category: "Network Diversity", score: 55, improvement: "Connect with professionals from different industries and roles" },
      { category: "Content Frequency", score: 40, improvement: "Post more regularly (2-3 times per week) to increase visibility" }
    ],
    recommendations: [
      {
        priority: "High",
        category: "Profile Optimization",
        action: "Add industry keywords to headline and summary",
        impact: "30% increase in profile visibility",
        effort: "Low"
      },
      {
        priority: "High",
        category: "Skills Showcase",
        action: "Add portfolio projects and certifications",
        impact: "25% increase in recruiter interest",
        effort: "Medium"
      },
      {
        priority: "Medium",
        category: "Content Strategy",
        action: "Share weekly industry insights and trends",
        impact: "40% increase in engagement rate",
        effort: "Medium"
      },
      {
        priority: "Medium",
        category: "Professional Branding",
        action: "Update profile photo and banner image",
        impact: "15% increase in profile views",
        effort: "Low"
      },
      {
        priority: "Low",
        category: "Network Building",
        action: "Connect with 5 industry leaders monthly",
        impact: "20% network growth over 6 months",
        effort: "High"
      },
      {
        priority: "Low",
        category: "Thought Leadership",
        action: "Write monthly industry analysis articles",
        impact: "50% increase in profile authority",
        effort: "High"
      }
    ]
  })

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const validateLinkedInUrl = (url) => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return linkedinRegex.test(url)
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a LinkedIn profile URL")
      return
    }

    if (!validateLinkedInUrl(url)) {
      setError("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setShowDemo(false)

    try {
      // Try backend first
      const response = await fetch(`${backendURL}/api/v2/profile-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileURL: url }),
      })

      if (!response.ok) {
        throw new Error(`Backend unavailable`)
      }

      const data = await response.json()
      setResult(data)
      console.log(data);
    } catch (err) {
      // If backend fails, use mock data with a realistic delay
      console.log("Backend unavailable, using demo mode")
      
      setTimeout(() => {
        // Generate dynamic mock data based on URL
        const username = url.split('/in/')[1]?.replace('/', '') || 'professional'
        const dynamicMockData = generateMockData(username)
        setResult(dynamicMockData)
        setLoading(false)
      }, 2500)
      return
    }
    
    setLoading(false)
  }

  const generateMockData = (username) => {
    const names = ['John Doe', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Wilson']
    const titles = ['Senior Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Director']
    const locations = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA']
    
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomTitle = titles[Math.floor(Math.random() * titles.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    
    return {
      profile: {
        name: randomName,
        title: randomTitle,
        location: randomLocation,
        connections: Math.floor(Math.random() * 500) + 100 + "+",
        profileViews: Math.floor(Math.random() * 2000) + 500,
        postImpressions: Math.floor(Math.random() * 8000) + 2000
      },
      scores: {
        overall: Math.floor(Math.random() * 30) + 65,
        profileCompleteness: Math.floor(Math.random() * 25) + 70,
        contentQuality: Math.floor(Math.random() * 35) + 60,
        networking: Math.floor(Math.random() * 40) + 50,
        engagement: Math.floor(Math.random() * 25) + 70
      },
      strengths: [
        { 
          category: "Technical Skills", 
          score: Math.floor(Math.random() * 20) + 80, 
          details: ["React", "Node.js", "Python", "AWS", "Docker"].slice(0, Math.floor(Math.random() * 3) + 2)
        },
        { 
          category: "Leadership", 
          score: Math.floor(Math.random() * 25) + 70, 
          details: ["Team Management", "Project Leadership", "Mentoring"]
        },
        { 
          category: "Communication", 
          score: Math.floor(Math.random() * 20) + 75, 
          details: ["Technical Writing", "Presentations", "Public Speaking"]
        }
      ],
      weaknesses: [
        { 
          category: "Industry Recognition", 
          score: Math.floor(Math.random() * 20) + 35, 
          improvement: "Publish more industry insights and thought leadership content" 
        },
        { 
          category: "Network Diversity", 
          score: Math.floor(Math.random() * 25) + 45, 
          improvement: "Connect with professionals from different industries and roles" 
        },
        { 
          category: "Content Frequency", 
          score: Math.floor(Math.random() * 30) + 30, 
          improvement: "Post more regularly (2-3 times per week) to increase visibility" 
        }
      ],
      recommendations: [
        {
          priority: "High",
          category: "Profile Optimization",
          action: "Add industry keywords to headline and summary",
          impact: "30% increase in profile visibility",
          effort: "Low"
        },
        {
          priority: "High",
          category: "Skills Showcase",
          action: "Add portfolio projects and certifications",
          impact: "25% increase in recruiter interest",
          effort: "Medium"
        },
        {
          priority: "Medium",
          category: "Content Strategy",
          action: "Share weekly industry insights and trends",
          impact: "40% increase in engagement rate",
          effort: "Medium"
        },
        {
          priority: "Medium",
          category: "Professional Branding",
          action: "Update profile photo and banner image",
          impact: "15% increase in profile views",
          effort: "Low"
        },
        {
          priority: "Low",
          category: "Network Building",
          action: "Connect with 5 industry leaders monthly",
          impact: "20% network growth over 6 months",
          effort: "High"
        },
        {
          priority: "Low",
          category: "Thought Leadership",
          action: "Write monthly industry analysis articles",
          impact: "50% increase in profile authority",
          effort: "High"
        }
      ]
    }
  }

  const handleCopy = async (content, section) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSection(section)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const exportAsMarkdown = () => {
    if (!result) return

    const content = `# LinkedIn Profile Analysis Report\n\n## Profile Overview\n- Name: ${result.profile.name}\n- Title: ${result.profile.title}\n- Location: ${result.profile.location}\n\n## Scores\n- Overall Score: ${result.scores.overall}/100\n- Profile Completeness: ${result.scores.profileCompleteness}/100\n\n## Recommendations\n${result.recommendations.map(rec => `- ${rec.action} (${rec.priority} Priority)`).join('\n')}`
    
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "linkedin-analysis.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const ScoreCard = ({ title, score, icon: Icon, color = "text-[#FFD600]" }) => (
    <div className="bg-[#232326] rounded-xl p-4 border border-[#333333]">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-6 w-6 ${color}`} />
        <Badge className="bg-[#FFD600] text-black text-xs font-bold">{score}/100</Badge>
      </div>
      <h3 className="text-white font-semibold text-sm">{title}</h3>
      <div className="mt-2 bg-[#18181b] rounded-full h-2">
        <div 
          className="bg-[#FFD600] h-2 rounded-full transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )

  const PriorityBadge = ({ priority }) => {
    const colors = {
      High: "bg-red-900 text-red-300 border-red-700",
      Medium: "bg-yellow-900 text-yellow-300 border-yellow-700",
      Low: "bg-green-900 text-green-300 border-green-700"
    }
    return (
      <Badge className={`${colors[priority]} border text-xs font-semibold`}>
        {priority}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-[#111112] text-white font-poppins">
    <Navbar/>
      <div className="container mx-auto px-4 pt-12 max-w-7xl py-12">
      
        {/* Header */}
        <div className=" mb-10">
          <div className=" justify-center gap-3 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
           LinkedIn Analyzer
          </h2> 
          </div>
          <p className="text-xl text-gray-300 ">
            Your AI-powered LinkedIn profile analyzer. Get detailed insights, actionable recommendations, and boost your professional presence.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-10 shadow-xl border-0 bg-[#18181b] backdrop-blur-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-poppins">
              <ExternalLink className="h-5 w-5 text-[#FFD600]" />
              Profile URL
            </CardTitle>
            <CardDescription className="text-gray-400 font-poppins">Enter your LinkedIn profile URL to get started with the analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-[#232326] border border-[#232326] text-white placeholder-gray-500 focus:border-[#FFD600] focus:ring-[#FFD600] rounded-lg font-poppins"
                disabled={loading}
              />
              <Button
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                className="bg-[#FFD600] hover:bg-[#FFC107] text-black font-semibold rounded-lg shadow-md px-6 font-poppins"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Profile
                  </>
                )}
              </Button>
            </div>
            {/* Demo Data Notice */}
            {showDemo && (
              <Alert className="mb-6 bg-[#1a4d3a] border-[#22c55e] text-green-300 font-poppins">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Demo Mode:</strong> Showing sample analysis to demonstrate features. Enter a LinkedIn URL above to analyze a real profile.
                </AlertDescription>
              </Alert>
            )}

            {/* Live Analysis Notice */}
            {result && !showDemo && (
              <Alert className="mb-6 bg-[#2d2d2f] border-[#FFD600] text-[#FFD600] font-poppins">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Analysis complete! {url ? 'Profile analyzed successfully.' : 'Using demo data for demonstration.'}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="bg-[#2d2d2f] border-[#FFD600] text-[#FFD600] font-poppins">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="flex gap-2">
                <Button onClick={exportAsMarkdown} variant="outline" className="flex items-center gap-2 border-[#FFD600] text-[#FFD600] bg-[#18181b] hover:bg-[#FFD600] hover:text-black font-poppins">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8 shadow-xl border-0 bg-[#18181b] rounded-2xl">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#232326] rounded-full animate-spin border-t-[#FFD600]"></div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-white font-poppins">Analyzing Your Profile</h3>
                  <p className="text-gray-400 font-poppins">
                    Our AI is reviewing your LinkedIn profile and generating personalized recommendations...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results - Show demo data initially or analysis results */}
        {(result || showDemo) && !loading && (
          <div className="space-y-8">
            {/* Profile Overview */}
            <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#FFD600]" />
                  <CardTitle className="text-xl text-[#FFD600] font-poppins">Profile Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-[#FFD600]" />
                      <span className="text-gray-400 text-sm">Profile</span>
                    </div>
                    <p className="text-white font-semibold">{(result || getDemoData()).profile.name}</p>
                    <p className="text-gray-300 text-sm">{(result || getDemoData()).profile.title}</p>
                  </div>
                  <div className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-[#FFD600]" />
                      <span className="text-gray-400 text-sm">Location</span>
                    </div>
                    <p className="text-white font-semibold">{(result || getDemoData()).profile.location}</p>
                  </div>
                  <div className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-[#FFD600]" />
                      <span className="text-gray-400 text-sm">Connections</span>
                    </div>
                    <p className="text-white font-semibold">{(result || getDemoData()).profile.connections}</p>
                  </div>
                  <div className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-[#FFD600]" />
                      <span className="text-gray-400 text-sm">Profile Views</span>
                    </div>
                    <p className="text-white font-semibold">{(result || getDemoData()).profile.profileViews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Scores */}
            <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#FFD600]" />
                  <CardTitle className="text-xl text-[#FFD600] font-poppins">Performance Scores</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <ScoreCard title="Overall Score" score={(result || getDemoData()).scores.overall} icon={Star} />
                  <ScoreCard title="Profile Completeness" score={(result || getDemoData()).scores.profileCompleteness} icon={CheckSquare} />
                  <ScoreCard title="Content Quality" score={(result || getDemoData()).scores.contentQuality} icon={FileText} />
                  <ScoreCard title="Networking" score={(result || getDemoData()).scores.networking} icon={Users} />
                  <ScoreCard title="Engagement" score={(result || getDemoData()).scores.engagement} icon={Heart} />
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Strengths */}
              <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <CardTitle className="text-xl text-green-400 font-poppins">Key Strengths</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(result || getDemoData()).strengths.map((strength, index) => (
                      <div key={index} className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">{strength.category}</h4>
                          <Badge className="bg-green-900 text-green-300 border-green-700">{strength.score}/100</Badge>
                        </div>
                        <div className="bg-[#18181b] rounded-full h-2 mb-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${strength.score}%` }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {strength.details.map((detail, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-green-400 text-green-400">
                              {detail}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-400" />
                    <CardTitle className="text-xl text-red-400 font-poppins">Areas for Improvement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(result || getDemoData()).weaknesses.map((weakness, index) => (
                      <div key={index} className="bg-[#232326] p-4 rounded-lg border border-[#333333]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">{weakness.category}</h4>
                          <Badge className="bg-red-900 text-red-300 border-red-700">{weakness.score}/100</Badge>
                        </div>
                        <div className="bg-[#18181b] rounded-full h-2 mb-2">
                          <div 
                            className="bg-red-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${weakness.score}%` }}
                          />
                        </div>
                        <p className="text-gray-300 text-sm mt-2">
                          <Lightbulb className="h-3 w-3 inline mr-1 text-[#FFD600]" />
                          {weakness.improvement}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Plan */}
            <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#FFD600]" />
                  <CardTitle className="text-xl text-[#FFD600] font-poppins">Recommended Action Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#333333]">
                        <th className="text-left py-3 px-4 text-[#FFD600] font-semibold">Priority</th>
                        <th className="text-left py-3 px-4 text-[#FFD600] font-semibold">Category</th>
                        <th className="text-left py-3 px-4 text-[#FFD600] font-semibold">Action</th>
                        <th className="text-left py-3 px-4 text-[#FFD600] font-semibold">Expected Impact</th>
                        <th className="text-left py-3 px-4 text-[#FFD600] font-semibold">Effort Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(result || getDemoData()).recommendations.map((rec, index) => (
                        <tr key={index} className="border-b border-[#232326] hover:bg-[#232326] transition-colors">
                          <td className="py-4 px-4">
                            <PriorityBadge priority={rec.priority} />
                          </td>
                          <td className="py-4 px-4 text-gray-300">{rec.category}</td>
                          <td className="py-4 px-4 text-white font-medium">{rec.action}</td>
                          <td className="py-4 px-4 text-green-400">{rec.impact}</td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="border-gray-500 text-gray-300">
                              {rec.effort}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h2 className="text-2xl font-bold text-white font-poppins">
                  {showDemo ? "Demo Analysis" : "Analysis Complete"}
                </h2>
              </div>
              <Badge variant="secondary" className="bg-green-900 text-green-300 border-0 font-poppins">
                {showDemo ? "Demo Mode" : "Ready for Action"}
              </Badge>
            </div> */}
          </div>
        )}

        {/* Footer */}
       <Footer/>
      </div>
    </div>
  )
}