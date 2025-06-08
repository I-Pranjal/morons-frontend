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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LinkedIn Profile Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get detailed insights and personalized recommendations to optimize your LinkedIn profile for better career
            opportunities.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Profile URL
            </CardTitle>
            <CardDescription>Enter your LinkedIn profile URL to get started with the analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={handleExampleUrl} variant="outline" disabled={loading}>
                Example
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
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

              {result && (
                <Button onClick={exportAsMarkdown} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8 shadow-lg border-0">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Analyzing Your Profile</h3>
                  <p className="text-muted-foreground">
                    Our AI is reviewing your LinkedIn profile and generating personalized recommendations...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="text-2xl font-bold">Analysis Complete</h2>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ready
              </Badge>
            </div>

            {/* Analysis Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-blue-700">Profile Analysis</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(result.analysis, "Analysis")}
                    className="flex items-center gap-2"
                  >
                    {copiedSection === "Analysis" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700">
                  <ReactMarkdown>{result.analysis || "No analysis found."}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-indigo-700">Improvement Recommendations</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(result.recommendations, "Recommendations")}
                    className="flex items-center gap-2"
                  >
                    {copiedSection === "Recommendations" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700">
                  <ReactMarkdown>{result.recommendations || "No recommendations found."}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <Separator className="mb-4" />
          <p>Powered by AI • Built for professionals who want to stand out</p>
          <p>
            
          </p>
        </div>
      </div>
    </div>
  )
}
