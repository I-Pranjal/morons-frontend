"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2, Sparkles } from "lucide-react"
import PersonalInfoForm from "../components/personal-info-form"
import ExperienceForm from "../components/experience-form"
import EducationForm from "../components/education-form"
import SkillsForm from "../components/skills-form"
import ProjectsForm from "../components/projects-form"
import AchievementsForm from "../components/achievements-form"
import useLatexGenerator from "@/hooks/useLatexGenerator"
import Navbar from "../../Navbar"
import Footer from "../../footer"
import axios from "axios"

export default function ResumeBuilder() {
  const { generateLatex } = useLatexGenerator()

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "", linkedin: "", linkedinText: "", github: "", githubText: "", email: "", phone: ""
    },
    skills: {
      Languages: [], Frameworks: [], Tools: [], Platforms: [], "Soft Skills": []
    },
    education: [{
      institution: "", location: "", degree: "", gpa: "", duration: "", courses: []
    }],
    experience: [{
      company: "", location: "", title: "", duration: "", details: []
    }],
    projects: [{
      name: "", link: "", linkText: "", description: ""
    }],
    honors: [],
    certifications: []
  })

  const [pdfUrl, setPdfUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [latexCode, setLatexCode] = useState("")
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const generatePDF = async () => {
    if (isGenerating) return; 
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.phone) {
      alert("Fullname and contact number are required."); 
      return ; 
    }
   
    const rawLatex = generateLatex(resumeData); 
    setLatexCode(rawLatex)
    setIsGenerating(true)

    try {
      const response = await fetch("https://latextopdf-gqmn.onrender.com/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latexCode: rawLatex })
      })

      if (!response.ok) throw new Error("Failed to generate PDF")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating the PDF.")
    } finally {
      setIsGenerating(false)
    }

    await axios.post(
      `${backendURL}/api/resumemaker`,
      resumeData,
      { headers: { "Content-Type": "application/json" } }
    );    
  }

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }))
  }

  const updateSkills = ({ type, value }) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [type]: value }
    }))
  }

  const downloadPDF = () => {
    if (!pdfUrl) {
      alert("Generate the PDF first.")
      return
    }

    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${resumeData.personalInfo.fullName || "resume"}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <style jsx>{`
        /* Main Background */
        .main-container {
          background: linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 50%, #2c2c2c 100%);
          min-height: 100vh;
          padding-top: 80px; /* Space for navbar */
        }
        
        /* Professional Cards */
        .professional-card {
          background: linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%);
          border: 1px solid rgba(251, 191, 36, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .professional-card:hover {
          border-color: rgba(251, 191, 36, 0.3);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
        }
        
        /* Header Styling */
        .card-header {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border-bottom: 1px solid rgba(251, 191, 36, 0.3);
          backdrop-filter: blur(15px);
        }
        
        /* Buttons */
        .primary-button {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #000000;
          border: none;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
          transition: all 0.3s ease;
        }
        
        .primary-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(251, 191, 36, 0.5);
        }
        
        .primary-button:disabled {
          background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          color: #d1d5db;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        /* Tabs */
        .tab-list {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 12px;
          padding: 4px;
        }
        
        .tab-trigger {
          background: transparent;
          color: #4b5563;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 8px 12px;
        }
        
        .tab-trigger:hover {
          background: rgba(251, 191, 36, 0.15);
          color: #d97706;
          border-color: rgba(251, 191, 36, 0.3);
        }
        
        .tab-trigger[data-state="active"] {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.2) 100%);
          color: #d97706;
          border-color: rgba(251, 191, 36, 0.5);
          box-shadow: 0 2px 10px rgba(251, 191, 36, 0.3);
          font-weight: 600;
        }
        
        /* Content Area */
        .content-area {
          background: rgba(251, 191, 36, 0.05);
          border: 1px solid rgba(251, 191, 36, 0.1);
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }
        
        /* Preview Area */
        .preview-placeholder {
          background: linear-gradient(135deg, rgba(248, 248, 248, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%);
          border: 2px dashed rgba(251, 191, 36, 0.4);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .preview-icon {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 50%;
        }
        
        /* Loading Animation */
        .loading-dots {
          display: flex;
          gap: 4px;
        }
        
        .loading-dot {
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite both;
        }
        
        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .loading-dot:nth-child(2) { animation-delay: -0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0s; }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        /* Text Styling */
        .gradient-text {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
        
        /* Scrollbar Styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(251, 191, 36, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.4);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.6);
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .main-container {
            padding-top: 70px;
          }
        }
      `}</style>
      
      <Navbar />
      
      <div className="main-container">
        <div className="max-w-[95%] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 min-h-[calc(100vh-160px)]">
            
            {/* Form Panel */}
            <Card className="professional-card border-0 overflow-hidden">
              <CardHeader className="card-header px-6 py-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/30 to-amber-400/20 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white text-lg font-semibold">Resume Builder</span>
                  </div>
                  <Button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="primary-button px-6 py-2 rounded-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate PDF
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 h-[calc(100%-80px)] overflow-hidden">
                <Tabs defaultValue="personal" className="h-full">
                  <TabsList className="tab-list grid grid-cols-6 w-full mb-4">
                    <TabsTrigger value="personal" className="tab-trigger text-xs">Personal</TabsTrigger>
                    <TabsTrigger value="experience" className="tab-trigger text-xs">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="tab-trigger text-xs">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="tab-trigger text-xs">Skills</TabsTrigger>
                    <TabsTrigger value="projects" className="tab-trigger text-xs">Projects</TabsTrigger>
                    <TabsTrigger value="achievements" className="tab-trigger text-xs">Awards</TabsTrigger>
                  </TabsList>

                  <div className="h-[calc(100%-60px)] overflow-y-auto custom-scrollbar">
                    <TabsContent value="personal" className="content-area mt-0">
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        onChange={data => updateResumeData("personalInfo", data)}
                      />
                    </TabsContent>
                    <TabsContent value="experience" className="content-area mt-0">
                      <ExperienceForm
                        experience={resumeData.experience}
                        onChange={data => updateResumeData("experience", data)}
                      />
                    </TabsContent>
                    <TabsContent value="education" className="content-area mt-0">
                      <EducationForm
                        data={resumeData.education}
                        onChange={data => updateResumeData("education", data)}
                      />
                    </TabsContent>
                    <TabsContent value="skills" className="content-area mt-0">
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={updateSkills}
                      />
                    </TabsContent>
                    <TabsContent value="projects" className="content-area mt-0">
                      <ProjectsForm
                        data={resumeData.projects}
                        onChange={data => updateResumeData("projects", data)}
                      />
                    </TabsContent>
                    <TabsContent value="achievements" className="content-area mt-0">
                      <AchievementsForm
                        honors={resumeData.honors}
                        onHonorChange={data => updateResumeData("honors", data.honors)}
                        certifications={resumeData.certifications}
                        onCertificationChange={data => updateResumeData("certifications", data.certifications)}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* PDF Preview Panel */}
            <Card className="professional-card border-0 overflow-hidden">
              <CardHeader className="card-header px-6 py-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/30 to-amber-400/20 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white text-lg font-semibold">Resume Preview</span>
                    {isGenerating && (
                      <div className="flex items-center gap-2 text-white">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-medium">Processing...</span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={downloadPDF}
                    disabled={!pdfUrl || isGenerating}
                    className="primary-button px-6 py-2 rounded-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 h-[calc(100%-80px)]">
                {pdfUrl ? (
                  <div className="relative h-full">
                    <iframe
                      src={pdfUrl + "#toolbar=0"}
                      className="w-full h-full border-0 bg-white"
                      title="Resume Preview"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-yellow-400/20"></div>
                  </div>
                ) : (
                  <div className="preview-placeholder h-full flex flex-col items-center justify-center m-4">
                    <div className="text-center space-y-6">
                      <div className="preview-icon w-20 h-20 mx-auto flex items-center justify-center">
                        <FileText className="w-10 h-10 text-amber-600" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-amber-700">
                          {isGenerating ? "Generating Your Resume" : "Ready to Preview"}
                        </h3>
                        <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                          {isGenerating 
                            ? "Please wait while we create your professional resume PDF" 
                            : "Fill out the form sections to see your resume preview here"
                          }
                        </p>
                      </div>
                      {isGenerating && (
                        <div className="loading-dots">
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}