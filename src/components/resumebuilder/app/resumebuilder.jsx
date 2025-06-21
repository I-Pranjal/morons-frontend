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
<style jsx>{`
.main-container {
background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
min-height: 100vh;
padding-top: 80px;
}

.professional-card {
background: white;
border: 1px solid #e2e8f0;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
border-radius: 12px;
}

.professional-card:hover {
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-header {
background: #f8fafc;
border-bottom: 1px solid #e2e8f0;
border-radius: 12px 12px 0 0;
}

.primary-button {
background: #fbbf24;
color: #1f2937;
border: none;
font-weight: 600;
border-radius: 8px;
transition: all 0.2s ease;
}

.primary-button:hover:not(:disabled) {
background: #f59e0b;
transform: translateY(-1px);
box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
}

.primary-button:disabled {
background: #374151;
color: #6b7280;
cursor: not-allowed;
transform: none;
}

.mobile-toggle {
background: #fbbf24;
color: #1f2937;
border: none;
padding: 8px 16px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;
}

.mobile-toggle:hover {
background: #f59e0b;
box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
}

.tab-list {
background: #f1f5f9;
border: 1px solid #e2e8f0;
border-radius: 8px;
padding: 4px;
}

.tab-trigger {
background: transparent;
color: #64748b;
border: 1px solid transparent;
border-radius: 6px;
font-weight: 500;
transition: all 0.2s ease;
padding: 8px 12px;
}

.tab-trigger:hover {
background: #e2e8f0;
color: #475569;
}

.tab-trigger[data-state="active"] {
background: #fbbf24;
color: #1f2937;
font-weight: 600;
}

.content-area {
background: #fafafa;
border: 1px solid #e5e7eb;
border-radius: 8px;
padding: 20px;
margin-top: 16px;
}

.preview-placeholder {
background: #f9fafb;
border: 2px dashed #d1d5db;
border-radius: 12px;
}

.preview-icon {
background: #f3f4f6;
border: 1px solid #d1d5db;
border-radius: 50%;
}

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

.custom-scrollbar::-webkit-scrollbar {
width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
background: #f1f5f9;
border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
background: #cbd5e1;
border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
background: #94a3b8;
}

.mobile-nav-container {
position: fixed;
top: 80px;
left: 0;
right: 0;
z-index: 50;
background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
border-bottom: 1px solid #374151;
padding: 10px 16px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-nav-tabs {
display: flex;
align-items: center;
gap: 8px;
overflow-x: auto;
padding: 4px 0;
}

.mobile-nav-tabs::-webkit-scrollbar {
display: none;
}

.mobile-nav-tabs {
-ms-overflow-style: none;
scrollbar-width: none;
}

.mobile-nav-button {
background: #374151;
border: 1px solid #4b5563;
border-radius: 12px;
padding: 12px;
color: #d1d5db;
transition: all 0.2s ease;
flex-shrink: 0;
min-width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
}

.mobile-nav-button:hover {
background: #4b5563;
border-color: #6b7280;
}

.mobile-nav-button.active {
background: #fbbf24;
color: #1f2937;
border-color: #fbbf24;
box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
}

.mobile-nav-button:disabled {
background: #1f2937;
color: #6b7280;
cursor: not-allowed;
border-color: #374151;
}

.mobile-tab-content {
display: flex;
align-items: center;
justify-content: center;
}

.mobile-tab-icon {
flex-shrink: 0;
}

.mobile-toggle-section {
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
margin-top: 12px;
}

.nav-arrow-button {
background: #374151;
border: 1px solid #4b5563;
border-radius: 12px;
padding: 12px;
color: #d1d5db;
transition: all 0.2s ease;
min-width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
}

.nav-arrow-button:hover:not(:disabled) {
background: #4b5563;
border-color: #6b7280;
}

.nav-arrow-button:disabled {
background: #1f2937;
color: #6b7280;
cursor: not-allowed;
border-color: #374151;
}

@media (max-width: 1024px) {
.main-container {
padding-top: 160px;
padding-left: 12px;
padding-right: 12px;
}

.mobile-container {
padding: 0;
}

.mobile-grid {
display: block;
}

.mobile-content {
margin-top: 0;
}

.mobile-hidden {
display: none;
}

.mobile-full-height {
height: calc(100vh - 160px);
}

.tab-list {
display: none;
}

.tab-content-mobile {
height: calc(100vh - 240px);
overflow-y: auto;
}

.content-area {
margin-top: 0;
padding: 16px;
}

.card-header {
padding: 12px 16px;
}

.professional-card {
margin-bottom: 12px;
}
}

@media (max-width: 640px) {
.main-container {
padding-top: 160px;
padding-left: 8px;
padding-right: 8px;
}

.mobile-nav-container {
padding: 8px 12px;
}

.mobile-nav-tabs {
gap: 6px;
}

.mobile-nav-button {
min-width: 44px;
height: 44px;
padding: 10px;
}

.nav-arrow-button {
min-width: 44px;
height: 44px;
padding: 10px;
}

.mobile-toggle-section {
flex-direction: row;
gap: 6px;
margin-top: 10px;
}

.mobile-toggle-section .mobile-toggle {
font-size: 13px;
padding: 8px 14px;
}

.mobile-toggle-section .flex {
gap: 4px;
}

.mobile-toggle-section .flex button {
font-size: 11px;
padding: 6px 10px;
}
}

@media (min-width: 1024px) {
.desktop-container {
max-width: calc(100% - 32px);
margin: 0 auto;
padding: 0 16px;
}

.desktop-grid {
gap: 24px;
}

.tab-list {
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 4px;
}

.main-container {
background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
}
`}</style>
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
<div className={`desktop-grid mobile-grid grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-160px)]`}>
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
className="w-full h-full border-0 bg-white"
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