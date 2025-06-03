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
import axios from "axios"
// import { generateLatex } from "../lib/latex-generator"

export default function ResumeBuilder() {
const [resumeData, setResumeData] = useState({
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "123 Main Street, City, Country", // Optional
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.dev",   // Optional
  },
  experience: [
    {
      title: "Software Developer",
      company: "ABC Corp",
      duration: "2021–Present",
      description: "Developed full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time.",
        // Description will be an array of strings
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "University XYZ",
      year: "2021",
      gpa: "3.8/4.0",
    },
  ],
  skills: {
    technical: ["Python", "JavaScript", "C++"],
    languages: ["English", "Spanish"],
    other: ["Agile Methodology", "Public Speaking"],
  },
  projects: [
    {
      name: "Resume PDF Generator",
      link : "" , // Optional link to the project
      techstack: ["React", "Node.js", "Express", "LaTeX"],
      description: "Created an app that converts LaTeX code into downloadable PDF resumes.",  // This will be an array of strings 
    },
    {
      name: "Task Manager",
      link : "" , // Optional link to the project
      techstack: ["React", "Express", "MongoDB"],
      description: "Built a task tracking web app with React and Express.", // THis will be an array of strings 
    },
  ],
  achievements: [
    "Recipient of XYZ Scholarship for Academic Excellence", 
    "Won 1st place in HackXYZ 2020 Hackathon",
  ],
});


  const [pdfUrl, setPdfUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [latexCode, setLatexCode] = useState("")


  const generatePDF = async () => {
      const latexCode = generateLatexFromData(resumeData);
    setLatexCode(latexCode); // Set the LaTeX code for preview
    setIsGenerating(true); // Show loading spinner
    try {
      const response = await fetch("https://latextopdf-gqmn.onrender.com/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latexCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setPdfUrl(url); // Set the PDF URL for preview
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF.");
    } finally {
      setIsGenerating(false); // Hide loading spinner
    }
  }


  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  // const GEMINI_API_KEY = "AIzaSyC_nNDDXcaccD1mwvByrCnkbFmPpoTIoWI"; 

  const generateLatexFromData = (data) => {
  // const  theLatexCode = `\\documentclass[10pt,a4paper]{article}\\usepackage[a4paper, total={6.5in, 10in}]{geometry}\\usepackage{hyperref}\\usepackage{xcolor}\\usepackage{enumitem}\\usepackage{titlesec}\\pagenumbering{gobble}\\setlength{\\parindent}{0pt}\\titleformat{\\section}{\\bfseries\\uppercase}{\\thesection}{1em}{}\\titleformat{\\subsection}[runin]{\\bfseries}{}{0em}{}[ -- ]\\begin{document}\\begin{center}{\\Huge \\textbf{${resumeData.personalInfo.fullName}}} \\\\ \\href{${resumeData.personalInfo.linkedin}}{\\color{cyan}Linkedin: https://www.linkedin.com/in/hritik-gupta-ml/} \\quad \\href{https://github.com/hritikgupta01}{\\color{cyan}Github: https://github.com/hritikgupta01} \\\\ \\textbf{Email:} \\href{mailto:hritikg369@gmail.com}{hritikg369@gmail.com} \\quad \\textbf{Mobile:} +91-953-241-5855\\end{center}\\vspace{5pt}\\section*{SKILLS SUMMARY}\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item \\textbf{Languages:} Java, Python, SQL, JavaScript\\item \\textbf{Frameworks:} Flask, NodeJs\\item \\textbf{Tools:} GIT, MongoDB, MySQL, SQLite, ReactJs, Aws EC2, ExpressJs\\item \\textbf{Platforms:} Linux, Windows, Web, Arduino, Raspberry\\item \\textbf{Soft Skills:} Leadership, Directorate, Writing, Time Management\\end{itemize}\\section*{EDUCATION}\\textbf{Noida Institute of Engineering and Technology} \\hfill Greater Noida, UP, India \\\\ \\textit{Bachelor in Computer Science and Engineering with Artificial Intelligence; GPA: 8.54} \\hfill Nov 2020 -- May 2024 \\\\ \\textit{Courses:} Operating Systems, Data Structures, Analysis Of Algorithms, Machine Learning, Networking, Databases, Web Development\\section*{EXPERIENCE}\\textbf{iNeuron} \\hfill Bengaluru, India \\\\ \\textit{Software Developer Engineer Intern} \\hfill Mar 2023 -- Apr 2023\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Created a regression model for \\textbf{Metro Interstate Traffic Volume} forecasting with a low \\textbf{RMSE of 0.37}.\\item Experience in performing \\textbf{data analysis} using Python, NumPy, Pandas, Scikit-Learn, and Jupyter.\\item Performed data cleaning, preprocessing, exploratory, and deep dive analysis to fetch meaningful insights.\\item Tested and Validated \\textbf{CatBoostRegressor}, \\textbf{AdaBoostRegressor}, and \\textbf{XGBRegressor} to determine the optimal model. \\textbf{CatBoostRegressor} 17\\% more accurate than others.\\item Skilled in creating documents LLD, HLD, using \\textbf{Azure DevOps}.\\end{itemize}\\textbf{Noida Institute of Engineering and Technology} \\hfill Greater Noida, India \\\\ \\textit{Machine Learning Engineer Intern} \\hfill Sep 2022 -- Nov 2022\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Developed a \\textbf{Calling Bot} solution that effectively updated parents on their child's attendance with a \\textbf{99\\% success rate}, significantly reducing workload by \\textbf{80\\%}.\\item Facilitated over \\textbf{1500+} calls, in significant time savings and improved efficiency.\\item Developed the software using Python and leveraged \\textbf{Twilio API} to enable backend calling functionality. \\textbf{AWS EC2} for deployment and \\textbf{SQLite} for data storage.\\end{itemize}\\textbf{IDR Research and Development Pvt. Ltd} \\hfill Greater Noida, India \\\\ \\textit{Machine Learning Engineer Intern} \\hfill Nov 2021 -- May 2022\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Implemented and integrated Drone (UAVs) with \\textbf{COMPUTER VISION} applications including number plate recognition, \\textbf{Image segmentation}, \\textbf{Real-time object tracking} and \\textbf{person detection}.\\item Led team to achieve \\textbf{20\\% increase in FPS} for object detection and reducing action time to \\textbf{0.05ms} through image segmentation for decision making.\\item Utilized Python, MobileNet, Darknet, \\textbf{YOLOV5}, \\textbf{YOLOR}, \\textbf{OpenCV}, \\textbf{TensorFlow}, \\textbf{Torch}, and Raspberry Pi for image processing and computer vision tasks.\\end{itemize}\\section*{PROJECTS}\\begin{itemize}[leftmargin=*, itemsep=3pt]\\item \\textbf{Chat application} (\\href{https://m-talk.onrender.com/}{link: m-talk.onrender.com}): Developed a robust chat app using \\textbf{ReactJS, NodeJS, ExpressJS, MongoDB, SocketIO, and Chakra UI}.\\item \\textbf{Digit Image Generator - GAN} (\\href{https://hritikguptagan.pythonanywhere.com/}{link: hritikguptagan.pythonanywhere.com}): Trained GANs for digit generation, improved model accuracy by \\textbf{20\\%}.\\item \\textbf{Movie Recommendation System} (\\href{https://hritik121.pythonanywhere.com/movie\\_recommend.hg/}{link: hritik121.pythonanywhere.com}): Delivered \\textbf{92\\% accuracy}, enhanced user retention by \\textbf{60\\%}.\\item \\textbf{Gender Predictor API} (\\href{https://tinyurl.com/2u2nfaxj}{link: tinyurl.com/2u2nfaxj}): Predicted gender based on names.\\end{itemize}\\section*{HONORS AND AWARDS}\\begin{itemize}[leftmargin=*, itemsep=2pt]\\item Solved over \\textbf{700 DSA problems} on LeetCode, GFG, and HackerRank.\\item Ranked among the \\textbf{top 50} in problem-solving on GeeksforGeeks.\\item Winner of \\textbf{Sharda University’s 2022 Tech Pitch}.\\end{itemize}\\section*{CERTIFICATIONS}\\begin{itemize}[leftmargin=*, itemsep=2pt]\\item CodeStudio DSA Interview Prep Guide.\\item \\textbf{Getting Started with AI using IBM Watson (Coursera)}.\\end{itemize}\\end{document}`
    // const thelatexCode = `\\documentclass[10pt,a4paper]{article}\\usepackage[a4paper, total={6.5in, 10in}]{geometry}\\usepackage{hyperref}\\usepackage{xcolor}\\usepackage{enumitem}\\usepackage{titlesec}\\pagenumbering{gobble}\\setlength{\\parindent}{0pt}\\titleformat{\\section}{\\bfseries\\uppercase}{\\thesection}{1em}{}\\titleformat{\\subsection}[runin]{\\bfseries}{}{0em}{}[ -- ]\\begin{document}\\begin{center}{\\Huge \\textbf{${resumeData.personalInfo.fullName}}} \\\\ \\href{${resumeData.personalInfo.linkedin}}{\\color{cyan}Linkedin: ${resumeData.personalInfo.linkedin}} \\quad \\href{${resumeData.personalInfo.github}}{\\color{cyan}Github: ${resumeData.personalInfo.github}} \\\\ \\textbf{Email:} \\href{mailto:hritikg369@gmail.com}{hritikg369@gmail.com} \\quad \\textbf{Mobile:} +91-953-241-5855\\end{center}\\vspace{5pt}\\section*{SKILLS SUMMARY}\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item \\textbf{Languages:} Java, Python, SQL, JavaScript\\item \\textbf{Frameworks:} Flask, NodeJs\\item \\textbf{Tools:} GIT, MongoDB, MySQL, SQLite, ReactJs, Aws EC2, ExpressJs\\item \\textbf{Platforms:} Linux, Windows, Web, Arduino, Raspberry\\item \\textbf{Soft Skills:} Leadership, Directorate, Writing, Time Management\\end{itemize}\\section*{EDUCATION}\\textbf{Noida Institute of Engineering and Technology} \\hfill Greater Noida, UP, India \\\\ \\textit{Bachelor in Computer Science and Engineering with Artificial Intelligence; GPA: 8.54} \\hfill Nov 2020 -- May 2024 \\\\ \\textit{Courses:} Operating Systems, Data Structures, Analysis Of Algorithms, Machine Learning, Networking, Databases, Web Development\\section*{EXPERIENCE}\\textbf{iNeuron} \\hfill Bengaluru, India \\\\ \\textit{Software Developer Engineer Intern} \\hfill Mar 2023 -- Apr 2023\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Created a regression model for \\textbf{Metro Interstate Traffic Volume} forecasting with a low \\textbf{RMSE of 0.37}.\\item Experience in performing \\textbf{data analysis} using Python, NumPy, Pandas, Scikit-Learn, and Jupyter.\\item Performed data cleaning, preprocessing, exploratory, and deep dive analysis to fetch meaningful insights.\\item Tested and Validated \\textbf{CatBoostRegressor}, \\textbf{AdaBoostRegressor}, and \\textbf{XGBRegressor} to determine the optimal model. \\textbf{CatBoostRegressor} 17\\% more accurate than others.\\item Skilled in creating documents LLD, HLD, using \\textbf{Azure DevOps}.\\end{itemize}\\textbf{Noida Institute of Engineering and Technology} \\hfill Greater Noida, India \\\\ \\textit{Machine Learning Engineer Intern} \\hfill Sep 2022 -- Nov 2022\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Developed a \\textbf{Calling Bot} solution that effectively updated parents on their child's attendance with a \\textbf{99\\% success rate}, significantly reducing workload by \\textbf{80\\%}.\\item Facilitated over \\textbf{1500+} calls, in significant time savings and improved efficiency.\\item Developed the software using Python and leveraged \\textbf{Twilio API} to enable backend calling functionality. \\textbf{AWS EC2} for deployment and \\textbf{SQLite} for data storage.\\end{itemize}\\textbf{IDR Research and Development Pvt. Ltd} \\hfill Greater Noida, India \\\\ \\textit{Machine Learning Engineer Intern} \\hfill Nov 2021 -- May 2022\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item Implemented and integrated Drone (UAVs) with \\textbf{COMPUTER VISION} applications including number plate recognition, \\textbf{Image segmentation}, \\textbf{Real-time object tracking} and \\textbf{person detection}.\\item Led team to achieve \\textbf{20\\% increase in FPS} for object detection and reducing action time to \\textbf{0.05ms} through image segmentation for decision making.\\item Utilized Python, MobileNet, Darknet, \\textbf{YOLOV5}, \\textbf{YOLOR}, \\textbf{OpenCV}, \\textbf{TensorFlow}, \\textbf{Torch}, and Raspberry Pi for image processing and computer vision tasks.\\end{itemize}\\section*{PROJECTS}\\begin{itemize}[leftmargin=*, itemsep=3pt]\\item \\textbf{Chat application} (\\href{https://m-talk.onrender.com/}{link: m-talk.onrender.com}): Developed a robust chat app using \\textbf{ReactJS, NodeJS, ExpressJS, MongoDB, SocketIO, and Chakra UI}.\\item \\textbf{Digit Image Generator - GAN} (\\href{https://hritikguptagan.pythonanywhere.com/}{link: hritikguptagan.pythonanywhere.com}): Trained GANs for digit generation, improved model accuracy by \\textbf{20\\%}.\\item \\textbf{Movie Recommendation System} (\\href{https://hritik121.pythonanywhere.com/movie\\_recommend.hg/}{link: hritik121.pythonanywhere.com}): Delivered \\textbf{92\\% accuracy}, enhanced user retention by \\textbf{60\\%}.\\item \\textbf{Gender Predictor API} (\\href{https://tinyurl.com/2u2nfaxj}{link: tinyurl.com/2u2nfaxj}): Predicted gender based on names.\\end{itemize}\\section*{HONORS AND AWARDS}\\begin{itemize}[leftmargin=*, itemsep=2pt]\\item Solved over \\textbf{700 DSA problems} on LeetCode, GFG, and HackerRank.\\item Ranked among the \\textbf{top 50} in problem-solving on GeeksforGeeks.\\item Winner of \\textbf{Sharda University’s 2022 Tech Pitch}.\\end{itemize}\\section*{CERTIFICATIONS}\\begin{itemize}[leftmargin=*, itemsep=2pt]\\item CodeStudio DSA Interview Prep Guide.\\item \\textbf{Getting Started with AI using IBM Watson (Coursera)}.\\end{itemize}\\end{document}` ; 
    const thelatexCode = `\\documentclass[10pt,a4paper]{article}\\usepackage[a4paper, total={6.5in, 10in}]{geometry}\\usepackage{hyperref}\\usepackage{xcolor}\\usepackage{enumitem}\\usepackage{titlesec}\\pagenumbering{gobble}\\setlength{\\parindent}{0pt}\\titleformat{\\section}{\\bfseries\\uppercase}{\\thesection}{1em}{}\\titleformat{\\subsection}[runin]{\\bfseries}{}{0em}{}[ -- ]\\begin{document}\\begin{center}{\\Huge \\textbf{${resumeData.personalInfo.fullName}}} \\\\ \\href{https://${resumeData.personalInfo.linkedin}}{\\color{cyan}Linkedin: ${resumeData.personalInfo.linkedin}} \\quad \\href{https://${resumeData.personalInfo.github}}{\\color{cyan}Github: ${resumeData.personalInfo.github}} \\\\ \\textbf{Email:} \\href{mailto:${resumeData.personalInfo.email}}{${resumeData.personalInfo.email}} \\quad \\textbf{Mobile:} ${resumeData.personalInfo.phone}\\end{center}\\vspace{5pt}\\section*{SKILLS SUMMARY}\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item \\textbf{Technical:} ${resumeData.skills.technical.join(", ")}\\item \\textbf{Languages:} ${resumeData.skills.languages.join(", ")}\\item \\textbf{Other:} ${resumeData.skills.other.join(", ")}\\end{itemize}\\section*{EDUCATION}\\textbf{${resumeData.education[0].institution}} \\\\ \\textit{${resumeData.education[0].degree}; GPA: ${resumeData.education[0].gpa}} \\\\ \\textit{Year:} ${resumeData.education[0].year}\\section*{EXPERIENCE}\\textbf{${resumeData.experience[0].company}} \\\\ \\textit{${resumeData.experience[0].title}} \\\\ \\textit{${resumeData.experience[0].duration}}\\begin{itemize}[leftmargin=*, itemsep=0pt]\\item ${resumeData.experience[0].description}\\end{itemize}\\section*{PROJECTS}\\begin{itemize}[leftmargin=*, itemsep=3pt]${resumeData.projects.map(project => `\\item \\textbf{${project.name}}: ${project.description}`).join("")}\\end{itemize}\\section*{HONORS AND AWARDS}\\begin{itemize}[leftmargin=*, itemsep=2pt]${resumeData.achievements.map(a => `\\item ${a}`).join("")}\\end{itemize}\\end{document}`;

    return thelatexCode ; 
  }


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






  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create your professional resume with live preview</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
          {/* Left Panel - Form */}
          <Card className="overflow-hidden">
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
                      data={resumeData.experience}
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
                      data={resumeData.achievements}
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
