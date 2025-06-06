"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2 } from "lucide-react"
import PersonalInfoForm from "../components/personal-info-form"
import ExperienceForm from "../components/experience-form"
import EducationForm from "../components/education-form"
import SkillsForm from "../components/skills-form"
import ProjectsForm from "../components/projects-form"
import AchievementsForm from "../components/achievements-form"
import useLatexGenerator from "@/hooks/useLatexGenerator"
import Navbar from "../../Navbar"
import Footer from "../../footer"

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

  const generatePDF = async () => {
    const rawLatex = generateLatex(resumeData)
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
    <Navbar />
    <div className="min-h-screen bg-white text-sm mt-22">
      <div className="mx-auto w-full max-w-[98%] px-1 pt-2 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-2 h-[calc(100vh-120px)]">
          
          {/* Form Panel */}
          <Card className="border h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-2 border-b bg-gray-50 sticky top-0 z-10">
              <CardTitle className="text-[13px] flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume Builder
              </CardTitle>
              <Button
                onClick={generatePDF}
                className="bg-amber-200 hover:bg-amber-300 text-xs"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Generate"
                )}
              </Button>
            </CardHeader>

            <CardContent className="overflow-y-auto px-3 pt-1 pb-3 h-full">
              <Tabs defaultValue="personal" className="h-full">
                <TabsList className="grid grid-cols-6 text-[10px] border-b mb-2 rounded-none">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="achievements">Awards</TabsTrigger>
                </TabsList>

                <div className="overflow-y-auto h-[calc(100%-60px)]">
                  <TabsContent value="personal">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={data => updateResumeData("personalInfo", data)}
                    />
                  </TabsContent>
                  <TabsContent value="experience">
                    <ExperienceForm
                      experience={resumeData.experience}
                      onChange={data => updateResumeData("experience", data)}
                    />
                  </TabsContent>
                  <TabsContent value="education">
                    <EducationForm
                      data={resumeData.education}
                      onChange={data => updateResumeData("education", data)}
                    />
                  </TabsContent>
                  <TabsContent value="skills">
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={updateSkills}
                    />
                  </TabsContent>
                  <TabsContent value="projects">
                    <ProjectsForm
                      data={resumeData.projects}
                      onChange={data => updateResumeData("projects", data)}
                    />
                  </TabsContent>
                  <TabsContent value="achievements">
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

          {/* PDF Preview */}
          <Card className="border h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-2 border-b bg-gray-50 sticky top-0 z-10">
              <CardTitle className="text-lg flex gap-1 items-center">
                Preview
                {isGenerating && <Loader2 className="h-6 w-6 animate-spin" />}
              </CardTitle>
              <Button
                onClick={downloadPDF}
                disabled={!pdfUrl || isGenerating}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardHeader>
            <CardContent className="p-0 h-full">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl + "#toolbar=0"}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                  {isGenerating ? "Generating..." : "Fill out details to preview"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}
