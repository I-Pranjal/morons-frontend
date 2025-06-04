import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';

const useLatexGenerator = () => {

const generateLatex = async (data) => {
    // Initialize an empty string 
    let latexString = '\\documentclass[10pt,a4paper]{article}\\usepackage[a4paper, total={6.5in, 10in}]{geometry}\\usepackage{hyperref}\\usepackage{xcolor}\\usepackage{enumitem}\\usepackage{titlesec}\\pagenumbering{gobble}\\setlength{\\parindent}{0pt}\\titleformat{\\section}{\\bfseries\\uppercase}{\\thesection}{1em}{}\\titleformat{\\subsection}[runin]{\\bfseries}{}{0em}{}[ -- ]\\begin{document}';

    latexString += addPersonalInfo(data.personalInfo);

    latexString += addSkils(data.skills);


    return latexString ; 
}

const addPersonalInfo = (personalInfo) => {
    let p_string = "\\begin{center}" ; 
    // Add line for name 
    p_string += `{\\Huge \\textbf{${personalInfo.fullName}}} \\\\` ; 
    // Add line for linkedin profile :
    p_string += `\\href{${personalInfo.linkedin}}{\\color{cyan}Linkedin: ${personalInfo.linkedin} } \\quad ` ;
    // Add line for github repo : 
    p_string += `\\href{${personalInfo.github}}{\\color{cyan}Github: ${personalInfo.github}} \\\\ ` ; 
    // Add line for email : 
    p_string += `\\textbf{Email:} \\href{mailto:${personalInfo.email}}{${personalInfo.email}} \\quad`; 
    // Add line for phone number :
    p_string += `\\textbf{Mobile:} ${personalInfo.phone}\\end{center}\\vspace{5pt}` ; 

    return p_string ;
}


const addSkills = (skills) => {
    let s_string = "\\section*{SKILLS SUMMARY}" ; 
    Object.keys(skills).forEach((category) => {
        s_string += `\\item \\textbf{${category.charAt(0).toUpperCase() + category.slice(1)}:} ${skills[category].join(', ')}`;
    });
    // Added skills section
    // End the line 
    return s_string ; 
}



















    return {generateLatex} ; 
};
export default useLatexGenerator;