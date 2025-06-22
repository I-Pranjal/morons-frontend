"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Zap, Target, GitCompare, X } from "lucide-react"
import Navbar from "../Navbar"


export default function JobComparator() {
  const [jd1Text, setJd1Text] = useState("");
  const [jd2Text, setJd2Text] = useState("");
  const [jd1File, setJd1File] = useState(null);
  const [jd2File, setJd2File] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleCompare = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("jd1Text", jd1Text);
    formData.append("jd2Text", jd2Text);
    if (jd1File) formData.append("jd1File", jd1File);
    if (jd2File) formData.append("jd2File", jd2File);

    try {
      const res = await fetch(`${backendURL}/api/v2/compare-jds`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Comparison Data:", data);

      // Process the response to add match information
      const processedData = data.map(item => ({
        ...item,
        match: item.jd1 === item.jd2 && item.jd1 !== null && item.jd2 !== null
      }));

      setComparisonData(processedData);
    } catch (e) {
      setComparisonData([]);
    }
    setLoading(false);
  };

  const removeFile = (fileType) => {
    if (fileType === 'jd1') {
      setJd1File(null);
    } else {
      setJd2File(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto pt-16 sm:pt-20">
        {/* Input Section */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
          {/* Job Description 1 */}
          <div className="group">
            <Card className="bg-zinc-900/80 backdrop-blur border-zinc-800 hover:border-amber-300/40 hover:bg-zinc-900/90 transition-all duration-500 shadow-2xl hover:shadow-amber-300/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                    <span className="text-lg sm:text-xl font-bold text-white">First Position</span>
                  </div>
                  <div className="w-8 h-8 bg-amber-300/10 rounded-lg flex items-center justify-center group-hover:bg-amber-300/20 transition-colors">
                    <span className="text-amber-300 font-bold text-sm">1</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Job Description Content</label>
                  <Textarea
                    placeholder="Paste the complete job description here or upload a document below..."
                    value={jd1Text}
                    onChange={(e) => setJd1Text(e.target.value)}
                    className="min-h-[160px] sm:min-h-[180px] bg-black/50 border-zinc-700 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 text-white placeholder-zinc-500 resize-none rounded-lg transition-all duration-300 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Upload Document</label>
                  <div className="flex flex-col gap-3">
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      className="hidden" 
                      id="jd1-file" 
                      onChange={e => setJd1File(e.target.files[0])} 
                    />
                    <label
                      htmlFor="jd1-file"
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 hover:border-amber-300/50 rounded-lg cursor-pointer transition-all duration-300 group/upload"
                    >
                      <Upload className="h-4 w-4 text-amber-300 group-hover/upload:scale-110 transition-transform" />
                      <span className="text-white font-medium text-sm">Choose File</span>
                    </label>
                    
                    {jd1File && (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-amber-300/10 border border-amber-300/30 rounded-lg">
                        <FileText className="h-4 w-4 text-amber-300 flex-shrink-0" />
                        <span className="text-xs text-amber-300 font-medium truncate flex-1">{jd1File.name}</span>
                        <button
                          onClick={() => removeFile('jd1')}
                          className="text-amber-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Description 2 */}
          <div className="group">
            <Card className="bg-zinc-900/80 backdrop-blur border-zinc-800 hover:border-amber-300/40 hover:bg-zinc-900/90 transition-all duration-500 shadow-2xl hover:shadow-amber-300/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                    <span className="text-lg sm:text-xl font-bold text-white">Second Position</span>
                  </div>
                  <div className="w-8 h-8 bg-amber-300/10 rounded-lg flex items-center justify-center group-hover:bg-amber-300/20 transition-colors">
                    <span className="text-amber-300 font-bold text-sm">2</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Job Description Content</label>
                  <Textarea
                    placeholder="Paste the complete job description here or upload a document below..."
                    value={jd2Text}
                    onChange={(e) => setJd2Text(e.target.value)}
                    className="min-h-[160px] sm:min-h-[180px] bg-black/50 border-zinc-700 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 text-white placeholder-zinc-500 resize-none rounded-lg transition-all duration-300 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Upload Document</label>
                  <div className="flex flex-col gap-3">
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      className="hidden" 
                      id="jd2-file" 
                      onChange={e => setJd2File(e.target.files[0])} 
                    />
                    <label
                      htmlFor="jd2-file"
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 hover:border-amber-300/50 rounded-lg cursor-pointer transition-all duration-300 group/upload"
                    >
                      <Upload className="h-4 w-4 text-amber-300 group-hover/upload:scale-110 transition-transform" />
                      <span className="text-white font-medium text-sm">Choose File</span>
                    </label>
                    
                    {jd2File && (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-amber-300/10 border border-amber-300/30 rounded-lg">
                        <FileText className="h-4 w-4 text-amber-300 flex-shrink-0" />
                        <span className="text-xs text-amber-300 font-medium truncate flex-1">{jd2File.name}</span>
                        <button
                          onClick={() => removeFile('jd2')}
                          className="text-amber-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Compare Button Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-300/20 blur-xl rounded-full"></div>
            <Button
              className="relative bg-amber-300 hover:bg-amber-400 text-black font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-xl shadow-2xl hover:shadow-amber-300/25 transition-all duration-300 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              onClick={handleCompare}
              disabled={loading || (!jd1Text && !jd1File) || (!jd2Text && !jd2File)}
            >
              {loading ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                  <span className="hidden sm:inline">Analyzing Positions...</span>
                  <span className="sm:hidden">Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="hidden sm:inline">Compare Job Descriptions</span>
                  <span className="sm:hidden">Compare</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-zinc-900/80 backdrop-blur border-zinc-800 shadow-2xl">
            <CardHeader className="pb-4 border-b border-zinc-800">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center space-x-3 text-white text-lg sm:text-2xl">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-300/10 rounded-xl flex items-center justify-center">
                    <Target className="h-4 w-4 sm:h-6 sm:w-6 text-amber-300" />
                  </div>
                  <span>Comparison Analysis</span>
                </CardTitle>
                {comparisonData.length > 0 && (
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-zinc-400">Matches</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span className="text-zinc-400">Differences</span>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-24 space-y-4 sm:space-y-6">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-300/10 rounded-full animate-pulse"></div>
                    <Zap className="absolute inset-0 m-auto h-6 w-6 sm:h-8 sm:w-8 text-amber-300 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-semibold text-amber-300 mb-2">Analyzing Job Descriptions</p>
                    <p className="text-sm sm:text-base text-zinc-400">Comparing requirements, responsibilities, and benefits...</p>
                  </div>
                </div>
              ) : comparisonData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-24 space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-800/50 rounded-full flex items-center justify-center">
                    <GitCompare className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-600" />
                  </div>
                  <div className="text-center max-w-md">
                    <p className="text-lg sm:text-xl font-semibold text-white mb-2">Ready to Compare</p>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      Enter or upload job descriptions above and click the compare button to see a detailed side-by-side analysis
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-base sm:text-lg font-semibold text-white">
                      Analysis Complete • {comparisonData.length} Parameters Compared
                    </p>
                  </div>

                  <div className="grid gap-3 sm:gap-4">
                    {comparisonData.map((row, index) => (
                      <div
                        key={index}
                        className="bg-black/40 border border-zinc-800 rounded-xl p-4 sm:p-6 hover:border-zinc-700 hover:bg-black/60 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                          <h4 className="text-base sm:text-lg font-semibold text-amber-300">{row.parameter}</h4>
                          {row.match !== null && (
                            <Badge 
                              className={`px-2 py-1 text-xs sm:text-sm font-medium ${
                                row.match 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                              }`}
                            >
                              {row.match ? '✓ Match' : '✗ Different'}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                              <span className="text-xs sm:text-sm font-medium text-zinc-400">First Position</span>
                            </div>
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 sm:p-4">
                              <p className="text-sm sm:text-base text-white leading-relaxed">
                                {row.jd1 || <span className="text-zinc-500 italic">Not specified</span>}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                              <span className="text-xs sm:text-sm font-medium text-zinc-400">Second Position</span>
                            </div>
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 sm:p-4">
                              <p className="text-sm sm:text-base text-white leading-relaxed">
                                {row.jd2 || <span className="text-zinc-500 italic">Not specified</span>}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}