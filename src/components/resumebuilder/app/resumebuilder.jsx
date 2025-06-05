"use client"
import { useState, useEffect } from "react"
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
// import { generateLatex } from "../lib/latex-generator"

export default function ResumeBuilder() {
  const { generateLatex } = useLatexGenerator();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      linkedin: "",
      linkedinText: "",
      github: "",
      githubText: "",
      email: "",
      phone: ""
    },
    skills: {
      Languages: [],
      Frameworks: [],
      Tools: [],
      Platforms: [],
      "Soft Skills": []
    },
    education: [{
      institution: "",
      location: "",
      degree: "",
      gpa: "",
      duration: "",
      courses: []
    }],
    experience: [
      {
        company: "",
        location: "",
        title: "",
        duration: "",
        details: []
      },
    ],
    projects: [
      {
        name: "",
        link: "",
        linkText: "",
        description: ""
      },
    ],
    honors: [],
    certifications: []
  });


  const [pdfUrl, setPdfUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [latexCode, setLatexCode] = useState("")


const generatePDF = async () => {
  const rawLatex = generateLatex(resumeData);
  console.log("Generated function result:", rawLatex); // Debug log

  // Do NOT manually escape backslashes or quotes here!
  // Just use rawLatex as is:
  setLatexCode(rawLatex); // for preview or other uses

  setIsGenerating(true); // show spinner

  const payload = { "latexCode": rawLatex }; // Use rawLatex directly
  console.log("Payload to send:", payload); // Debug log

  try {
    const response = await fetch("https://latextopdf-gqmn.onrender.com/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // JSON.stringify will escape properly
    });

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF.");
  } finally {
    setIsGenerating(false); // hide spinner
  }
};

// ---------------------------------------------------------------------------------------------------------------
const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

// ---------------------------------------------------------------------------------------------------------------
const downloadPDF = () => {
  if (!pdfUrl) {
    alert("No PDF available to download. Please generate it first.");
    return;
  }

  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download =`${resumeData.personalInfo.fullName}.pdf` ||"resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// ---------------------------------------------------------------------------------------------------------------





  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create your professional resume with live preview</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
          {/* Left Panel - Form */}
          <Card className="overflow-scroll">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Details
              </CardTitle>
              <Button 
              className="bg-amber-200 text-black hover:bg-amber-300"
              onClick={() => generatePDF()}
              >
                Generate resume
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="personal" className="h-full">
                <TabsList className="grid w-full grid-cols-6 rounded-none border-b">
                  <TabsTrigger value="personal" className="text-xs">
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="text-xs">
                    Awards
                  </TabsTrigger>
                </TabsList>

                <div className="h-[calc(100%-60px)] overflow-y-auto p-6">
                  <TabsContent value="personal" className="mt-0">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) => updateResumeData("personalInfo", data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <ExperienceForm
                      experience={resumeData.experience}
                      onChange={(data) => updateResumeData("experience", data)}
                    />
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => updateResumeData("education", data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <SkillsForm data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <ProjectsForm data={resumeData.projects} onChange={(data) => updateResumeData("projects", data)} />
                  </TabsContent>

                  <TabsContent value="achievements" className="mt-0">
                    <AchievementsForm
                      honors={resumeData.honors}
                      certifications={resumeData.certifications}
                      onChange={(data) => updateResumeData("achievements", data)}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right Panel - PDF Preview */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Preview
                  {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
                </CardTitle>
                <Button onClick={downloadPDF} disabled={!pdfUrl || isGenerating} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              {pdfUrl ? (
                <iframe src={pdfUrl + "#toolbar=0"} className="w-full h-full border-0" title="Resume Preview" />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {isGenerating ? "Generating preview..." : "Fill in your details to see preview"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
