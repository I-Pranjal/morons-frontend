"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2, Sparkles, Menu, X, User, Briefcase, GraduationCap, Code, FolderOpen, Award, ChevronLeft, ChevronRight } from "lucide-react"
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
import "./resumebuilder.css"

export default function ResumeBuilder() {
const { generateLatex } = useLatexGenerator()
const [showPreview, setShowPreview] = useState(false)
const [currentTab, setCurrentTab] = useState("personal")
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

const tabs = [
{ id: "personal", label: "Personal", icon: User },
{ id: "experience", label: "Experience", icon: Briefcase },
{ id: "education", label: "Education", icon: GraduationCap },
{ id: "skills", label: "Skills", icon: Code },
{ id: "projects", label: "Projects", icon: FolderOpen },
{ id: "achievements", label: "Awards", icon: Award }
]

const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab)

const navigateTab = (direction) => {
const newIndex = direction === 'next' 
  ? Math.min(currentTabIndex + 1, tabs.length - 1)
  : Math.max(currentTabIndex - 1, 0)
setCurrentTab(tabs[newIndex].id)
}

const generatePDF = async () => {
if (isGenerating) return;
if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.phone) {
alert("Fullname and contact number are required.");
return ;
}
const rawLatex = generateLatex(resumeData);
console.log(JSON.stringify({ latexCode: rawLatex }))
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
if (window.innerWidth < 1024) {
setShowPreview(true)
}
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
<Navbar />
<div className="main-container">
{/* Mobile Navigation */}
<div className="lg:hidden mobile-nav-container">
<div className="flex items-center gap-3">
<Button
onClick={() => navigateTab('prev')}
disabled={currentTabIndex === 0}
className="nav-arrow-button"
>
<ChevronLeft className="h-5 w-5" />
</Button>

<div className="mobile-nav-tabs flex-1">
{tabs.map((tab) => {
const Icon = tab.icon
return (
<button
key={tab.id}
onClick={() => setCurrentTab(tab.id)}
className={`mobile-nav-button ${currentTab === tab.id ? 'active' : ''}`}
>
<div className="mobile-tab-content">
<Icon className="h-5 w-5 mobile-tab-icon" />
</div>
</button>
)
})}
</div>

<Button
onClick={() => navigateTab('next')}
disabled={currentTabIndex === tabs.length - 1}
className="nav-arrow-button"
>
<ChevronRight className="h-5 w-5" />
</Button>
</div>

<div className="mobile-toggle-section">
<Button
onClick={() => setShowPreview(!showPreview)}
className="mobile-toggle flex items-center gap-2"
>
{showPreview ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
{showPreview ? 'Edit' : 'Preview'}
</Button>
<div className="flex gap-2">
<Button
onClick={generatePDF}
disabled={isGenerating}
className="primary-button px-3 py-2 text-xs"
>
{isGenerating ? (
<>
<Loader2 className="h-3 w-3 animate-spin mr-1" />
Gen...
</>
) : (
<>
<Sparkles className="h-3 w-3 mr-1" />
Generate
</>
)}
</Button>
<Button
onClick={downloadPDF}
disabled={!pdfUrl || isGenerating}
className="primary-button px-3 py-2 text-xs"
>
<Download className="h-3 w-3 mr-1" />
Download
</Button>
</div>
</div>
</div>

<div className="desktop-container mobile-container">
<div className="mobile-content">
<div className="desktop-grid mobile-grid grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-160px)]">
<Card className={`professional-card border-0 overflow-hidden ${showPreview && 'mobile-hidden lg:block'}`}>
<CardHeader className="card-header px-4 py-3 lg:px-5 lg:py-3">
<CardTitle className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="p-2 bg-blue-100 rounded-lg">
<FileText className="h-4 w-4 text-blue-600" />
</div>
<span className="text-gray-700 text-base font-medium">Resume Builder</span>
</div>
<div className="hidden lg:block">
<Button
onClick={generatePDF}
disabled={isGenerating}
className="primary-button px-4 py-2 rounded-md text-sm"
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
</div>
</CardTitle>
</CardHeader>
<CardContent className="p-4 h-[calc(100%-70px)] overflow-hidden">
<Tabs value={currentTab} onValueChange={setCurrentTab} className="h-full">
<TabsList className="tab-list grid w-full mb-4">
{tabs.map((tab) => {
const Icon = tab.icon
return (
<TabsTrigger key={tab.id} value={tab.id} className="tab-trigger">
<Icon className="lg:hidden h-4 w-4" />
<span className="hidden lg:inline">{tab.label}</span>
</TabsTrigger>
)
})}
</TabsList>
<div className="h-[calc(100%-60px)] lg:h-[calc(100%-60px)] overflow-y-auto custom-scrollbar tab-content-mobile">
<TabsContent value="personal" className="content-area mt-0">
<div className="form-container">
<PersonalInfoForm
data={resumeData.personalInfo}
onChange={data => updateResumeData("personalInfo", data)}
/>
</div>
</TabsContent>
<TabsContent value="experience" className="content-area mt-0">
<div className="form-container">
<ExperienceForm
experience={resumeData.experience}
onChange={data => updateResumeData("experience", data)}
/>
</div>
</TabsContent>
<TabsContent value="education" className="content-area mt-0">
<div className="form-container">
<EducationForm
data={resumeData.education}
onChange={data => updateResumeData("education", data)}
/>
</div>
</TabsContent>
<TabsContent value="skills" className="content-area mt-0">
<div className="form-container">
<SkillsForm
data={resumeData.skills}
onChange={updateSkills}
/>
</div>
</TabsContent>
<TabsContent value="projects" className="content-area mt-0">
<div className="form-container">
<ProjectsForm
data={resumeData.projects}
onChange={data => updateResumeData("projects", data)}
/>
</div>
</TabsContent>
<TabsContent value="achievements" className="content-area mt-0">
<div className="form-container">
<AchievementsForm
honors={resumeData.honors}
onHonorChange={data => updateResumeData("honors", data.honors)}
certifications={resumeData.certifications}
onCertificationChange={data => updateResumeData("certifications", data.certifications)}
/>
</div>
</TabsContent>
</div>
</Tabs>
</CardContent>
</Card>

<Card className={`professional-card border-0 overflow-hidden mobile-full-height ${!showPreview && 'mobile-hidden lg:block'}`}>
<CardHeader className="card-header px-4 py-3">
<CardTitle className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="p-2 bg-blue-100 rounded-lg">
<FileText className="h-4 w-4 text-blue-600" />
</div>
<span className="text-gray-700 text-base font-medium">Resume Preview</span>
{isGenerating && (
<div className="flex items-center gap-2 text-gray-600">
<Loader2 className="h-3 w-3 animate-spin" />
<span className="text-xs font-medium hidden sm:inline">Processing...</span>
</div>
)}
</div>
<div className="hidden lg:block">
<Button
onClick={downloadPDF}
disabled={!pdfUrl || isGenerating}
className="primary-button px-4 py-2 rounded-md text-sm"
>
<Download className="h-4 w-4 mr-2" />
Download PDF
</Button>
</div>
</CardTitle>
</CardHeader>
<CardContent className="p-0 h-[calc(100%-70px)]">
{pdfUrl ? (
<div className="relative h-full">
<iframe
src={pdfUrl + "#toolbar=0"}
className="w-full h-full border-0 bg-black"
title="Resume Preview"
/>
<div className="absolute inset-0 pointer-events-none border border-gray-200"></div>
</div>
) : (
<div className="preview-placeholder h-full flex flex-col items-center justify-center m-3">
<div className="text-center space-y-5">
<div className="preview-icon w-16 h-16 mx-auto flex items-center justify-center">
<FileText className="w-8 h-8 text-gray-500" />
</div>
<div className="space-y-2">
<h3 className="text-lg font-semibold text-gray-700">
{isGenerating ? "Generating Your Resume" : "Ready to Preview"}
</h3>
<p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
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
</div>
<Footer />
</>
)
}
