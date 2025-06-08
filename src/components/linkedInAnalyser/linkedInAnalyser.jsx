"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, Copy, CheckCircle, AlertCircle, FileText, Code, Download, ExternalLink } from "lucide-react"
import ReactMarkdown from "react-markdown"


export default function LinkedInAnalyzer() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [copiedSection, setCopiedSection] = useState(null)
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const validateLinkedInUrl = (url) => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return linkedinRegex.test(url)
  }

//   const handleAnalyze = async () => {
//     if (!url.trim()) {
//       setError("Please enter a LinkedIn profile URL")
//       return
//     }

//     if (!validateLinkedInUrl(url)) {
//       setError("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)")
//       return
//     }

//     setLoading(true)
//     setError("")
//     setResult(null)

//     try {
//       const response = await fetch(`${backendURL}/api/v2/profile-analysis`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ profileURL: url }),
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const data = await response.json()
//       setResult(data)
//       console.log("Analysis result:", data); 
//     } catch (err) {
//       setError("Failed to analyze profile. Please check your connection and try again.")
//       console.error("Analysis error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }
const handleAnalyze = async () => {
  if (!url.trim()) {
    setError("Please enter a LinkedIn profile URL");
    return;
  }

  if (!validateLinkedInUrl(url)) {
    setError("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await fetch(`${backendURL}/api/v2/profile-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileURL: url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setResult(data);
  
  } catch (err) {
    setError(err.message || "Failed to analyze profile. Please check your connection and try again.");
    console.error("Analysis error:", err);
  } finally {
    setLoading(false);
  }
};


  const handleCopy = async (content, section) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSection(section)
    //   toast({
    //     title: "Copied to clipboard",
    //     description: `${section} has been copied to your clipboard.`,
    //   })
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
    //   toast({
    //     title: "Copy failed",
    //     description: "Failed to copy content to clipboard.",
    //     variant: "destructive",
    //   })
    }
  }

  const handleExampleUrl = () => {
    setUrl("https://linkedin.com/in/example-profile")
  }

  const exportAsMarkdown = () => {
    if (!result) return

    const content = `# LinkedIn Profile Analysis\n\n${result.analysis}\n\n# Recommendations\n\n${result.recommendations}`
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

  // Helper: Parse Gemini raw JSON if present
  let parsedAnalysis = null;
  let parsedRecommendations = null;
  if (result && result.raw) {
    try {
      // Remove code block markers and parse JSON
      const cleaned = result.raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      // Remove any leading markdown title from analysis/recommendations
      parsedAnalysis = parsed.analysis ? parsed.analysis.replace(/^# [^\n]+\n*/, "") : null;
      parsedRecommendations = parsed.recommendations ? parsed.recommendations.replace(/^# [^\n]+\n*/, "") : null;
    } catch (e) {
      parsedAnalysis = null;
      parsedRecommendations = null;
    }
  } else if (result) {
    parsedAnalysis = result.analysis ? result.analysis.replace(/^# [^\n]+\n*/, "") : result.analysis;
    parsedRecommendations = result.recommendations ? result.recommendations.replace(/^# [^\n]+\n*/, "") : result.recommendations;
  }

  return (
    <div className="min-h-screen bg-[#111112] text-white font-poppins">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-[#FFD600] rounded-xl shadow-lg">
              <Search className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD600] to-[#FFC107] bg-clip-text text-transparent font-poppins">
              The Moronss
            </h1>
          </div>
          <p className="text-3xl font-bold mb-2 text-white font-poppins">Learn. Build. <span className="text-[#FFD600]">Get Hired.</span></p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-poppins">
            Your AI mentor for technical college success. Master industry skills through personalized labs, build credible portfolios, and land your dream opportunities.
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
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Profile
                  </>
                )}
              </Button>
            </div>
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
                  Export
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

        {/* Results */}
        {result && !loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h2 className="text-2xl font-bold text-white font-poppins">Analysis Complete</h2>
              </div>
              <Badge variant="secondary" className="bg-green-900 text-green-300 border-0 font-poppins">
                Ready
              </Badge>
            </div>

            {/* Analysis Section */}
            <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#FFD600]" />
                  <CardTitle className="text-xl text-[#FFD600] font-poppins">Profile Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none prose-headings:text-[#FFD600] prose-p:text-white prose-strong:text-[#FFD600] prose-ul:text-gray-200 text-white font-poppins">
                  <ReactMarkdown>{parsedAnalysis || "No analysis found."}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations Section */}
            <Card className="shadow-xl border-0 bg-[#18181b] rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#FFD600]" />
                  <CardTitle className="text-xl text-[#FFD600] font-poppins">Improvement Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none prose-headings:text-[#FFD600] prose-p:text-white prose-strong:text-[#FFD600] prose-ul:text-gray-200 text-white font-poppins">
                  <ReactMarkdown>{parsedRecommendations || "No recommendations found."}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 font-poppins">
          <Separator className="mb-4 bg-[#232326]" />
          <p>Powered by AI • Built for professionals who want to stand out</p>
        </div>
      </div>
    </div>
  )
}
