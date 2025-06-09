"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Upload, FileText, Zap, Target } from "lucide-react"
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

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white w-fit min-w-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-8 ">
        <div className="grid lg:grid-cols-2 gap-8 h-full mt-20">
          {/* Left Panel - Input Section */}
          <div className="space-y-6">
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
                  <Input type="file" accept=".pdf" className="hidden" id="jd1-file" onChange={e => setJd1File(e.target.files[0])} />
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
                  <Input type="file" accept=".pdf" className="hidden" id="jd2-file" onChange={e => setJd2File(e.target.files[0])} />
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
              onClick={handleCompare}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center"><Zap className="h-5 w-5 mr-2 animate-spin" />Comparing...</span>
              ) : (
                <span className="flex items-center justify-center"><Zap className="h-5 w-5 mr-2" />Compare Jobs</span>
              )}
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
                {loading ? (
                  <div className="text-center text-amber-400 text-lg py-12">Comparing jobs...</div>
                ) : comparisonData.length === 0 ? (
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
                                <span>{row.jd1 || "N/A"}</span>
                                {row.match === false && (
                                  <Badge variant="destructive" className="text-xs bg-red-500">
                                    Diff
                                  </Badge>
                                )}
                                {row.match === true && (
                                  <Badge className="bg-green-600 hover:bg-green-700 text-xs">Match</Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-gray-300">
                              <div className="flex items-center space-x-2">
                                <span>{row.jd2 || "N/A"}</span>
                                {row.match === true && (
                                  <Badge className="bg-green-600 hover:bg-green-700 text-xs">Match</Badge>
                                )}
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
          </div>
        </div>
      </div>
    </div>
  )
}
