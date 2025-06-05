const useLatexGenerator = () => {
  const generateLatex = (data) => {
    let latexString =
      '\\documentclass[10pt,a4paper]{article}' +
      '\\usepackage[a4paper, total={6.5in,10in}]{geometry}' +
      '\\usepackage{hyperref}' +
      '\\usepackage{xcolor}' +
      '\\usepackage{enumitem}' +
      '\\usepackage{titlesec}' +
      '\\pagenumbering{gobble}' +
      '\\setlength{\\parindent}{0pt}' +
      '\\titleformat{\\section}{\\bfseries\\uppercase}{\\thesection}{1em}{}' +
      '\\titleformat{\\subsection}[runin]{\\bfseries}{}{0em}{}[ -- ]' +
      '\\begin{document}';

    latexString += addPersonalInfo(data.personalInfo);
    latexString += addSkills(data.skills);
    latexString += addEducation(data.education);
    latexString += addExperience(data.experience);
    latexString += addProjects(data.projects);
    latexString += addHonor(data.honors);
    latexString += addCertifications(data.certifications);
    latexString += '\\end{document}';

    return latexString;
  };

  const addPersonalInfo = (info) => {
    return `\\begin{center}{\\Huge \\textbf{${info.fullName}}} \\\\
\\href{${info.linkedin}}{\\color{cyan}${info.linkedinText}} \\quad
\\href{${info.github}}{\\color{cyan}${info.githubText}} \\\\
\\textbf{Email:} \\href{mailto:${info.email}}{${info.email}} \\quad
\\textbf{Mobile:} ${info.phone}\\end{center}\\vspace{5pt}`;
  };

  const addSkills = (skills) => {
    let s = "\\section*{SKILLS SUMMARY}\\begin{itemize}[leftmargin=*, itemsep=0pt]";
    for (let key in skills) {
      s += `\\item \\textbf{${key}:} ${skills[key].join(', ')}`;
    }
    return s + "\\end{itemize}";
  };

  const addEducation = (eduArr) => {
    let e = "\\section*{EDUCATION}";
    eduArr.forEach((edu) => {
      e += `\\textbf{${edu.institution}} \\hfill ${edu.location} \\\\
\\textit{${edu.degree}; GPA: ${edu.gpa}} \\hfill ${edu.duration} \\\\
\\textit{Courses:} ${edu.courses.join(', ')}\\\\`;
    });
    return e;
  };

  const addExperience = (expArr) => {
    let s = "\\section*{EXPERIENCE}";
    expArr.forEach((exp) => {
      s += `\\textbf{${exp.company}} \\hfill ${exp.location} \\\\
\\textit{${exp.title}} \\hfill ${exp.duration}\\\\
\\begin{itemize}[leftmargin=*, itemsep=0pt]`;
      exp.details.forEach((d) => {
        s += `\\item ${d}`;
      });
      s += "\\end{itemize}";
    });
    return s;
  };

  const addProjects = (projects) => {
    let p = "\\section*{PROJECTS}\\begin{itemize}[leftmargin=*, itemsep=3pt]";
    projects.forEach((proj) => {
      p += `\\item \\textbf{${proj.name}} (\\href{${proj.link}}{${proj.linkText}}): ${proj.description}`;
    });
    return p + "\\end{itemize}";
  };

  const addHonor = (honors) => {
    let h = "\\section*{HONORS AND AWARDS}\\begin{itemize}[leftmargin=*, itemsep=2pt]";
    honors.forEach((honor) => {
      h += `\\item ${honor}`;
    });
    return h + "\\end{itemize}";
  };

  const addCertifications = (certs) => {
    let c = "\\section*{CERTIFICATIONS}\\begin{itemize}[leftmargin=*, itemsep=2pt]";
    certs.forEach((cert) => {
      c += `\\item ${cert}`;
    });
    return c + "\\end{itemize}";
  };

  return { generateLatex };
};

export default useLatexGenerator;
