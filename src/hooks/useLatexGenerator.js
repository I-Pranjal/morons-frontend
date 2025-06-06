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

    if (data.personalInfo && Object.keys(data.personalInfo).length) {
      latexString += addPersonalInfo(data.personalInfo);
    }
    if (data.skills && Object.keys(data.skills).length && hasSkills(data.skills)) {
      latexString += addSkills(data.skills);
    }
    if (data.education && data.education.length > 0) {
      latexString += addEducation(data.education);
    }
    if (data.experience && hasExperience(data.experience)) {
      latexString += addExperience(data.experience);
    }
    if (data.projects && hasProjects(data.projects)) {
      latexString += addProjects(data.projects);
    }
    if (data.honors && data.honors.length > 0) {
      latexString += addHonor(data.honors);
    }
    if (data.certifications && data.certifications.length > 0) {
      latexString += addCertifications(data.certifications);
    }

    latexString += '\\end{document}';
    return latexString;
  };

  const addPersonalInfo = (info) => {
    const { fullName, linkedin, linkedinText, github, githubText, email, phone } = info;
    return `\\begin{center}{\\Huge \\textbf{${fullName}}} \\\\
${linkedin ? `\\href{${linkedin}}{${linkedinText || 'LinkedIn'}} \\quad` : ''} 
${github ? `\\href{${github}}{${githubText || 'GitHub  '}} ` : ''} 
\\href{mailto:${email}}{${email}} \\quad 
${phone}\\end{center}\\vspace{5pt} \\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}`;
  };

  const hasSkills = (skills) => {
    return Object.values(skills).some((arr) => Array.isArray(arr) && arr.length > 0);
  };

  const addSkills = (skills) => {
    let s = "\\section*{SKILLS SUMMARY}\\begin{itemize}[leftmargin=*, itemsep=0pt]";
    for (let key in skills) {
      if (skills[key] && skills[key].length > 0) {
        s += `\\item \\textbf{${key}:} ${skills[key].join(', ')}`;
      }
    }
    return s + "\\end{itemize} \\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}";
  };

  const addEducation = (eduArr) => {
    let e = "\\section*{EDUCATION}";
    eduArr.forEach((edu) => {
      const courses = edu.courses && edu.courses.length > 0 ? edu.courses.join(', ') : '';
      e += `\\textbf{${edu.institution}} \\hfill ${edu.location} \\\\
\\textit{${edu.degree}; GPA: ${edu.gpa}} \\hfill ${edu.duration} \\\\
${courses ? `\\textit{Courses:} ${courses}\\\\` : ''}`;
    });
    e += "\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}";
    return e;
  };

  const hasExperience = (expArr) => {
    return expArr.some((exp) => exp.details && exp.details.length > 0);
  };

  const addExperience = (expArr) => {
    let s = "\\section*{EXPERIENCE}";
    expArr.forEach((exp) => {
      if (exp.details && exp.details.length > 0) {
        s += `\\textbf{${exp.company}} \\hfill ${exp.location} \\\\
\\textit{${exp.title}} \\hfill ${exp.duration}
\\begin{itemize}[leftmargin=*, itemsep=0pt]`;
        exp.details.forEach((d) => {
          if (d && d.trim()) s += `\\item ${d}`;
        });
        s += "\\end{itemize}";
      }
    });
    s += " \\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}" ; 
    return s;
  };

  const hasProjects = (projects) => {
    return projects.some((proj) => proj.name && proj.description);
  };

  const addProjects = (projects) => {
    let p = "\\section*{PROJECTS}\\begin{itemize}[leftmargin=*, itemsep=3pt]";
    projects.forEach((proj) => {
      if (proj.name && proj.description) {
        const link = proj.link ? `(\\href{${proj.link}}{${proj.linkText || 'Link'}})` : '';
        p += `\\item \\textbf{${proj.name}} ${link}: ${proj.description}`;
      }
    });
    return p + "\\end{itemize} \\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}";
  };

  const addHonor = (honors) => {
    if (!honors.some((h) => h && h.trim())) return "";
    let h = "\\section*{HONORS AND AWARDS}\\begin{itemize}[leftmargin=*, itemsep=2pt]";
    honors.forEach((honor) => {
      if (honor && honor.trim()) h += `\\item ${honor}`;
    });
    return h + "\\end{itemize} \\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.4pt}}";
  };

  const addCertifications = (certs) => {
    if (!certs.some((c) => c && c.trim())) return "";
    let c = "\\section*{CERTIFICATIONS}\\begin{itemize}[leftmargin=*, itemsep=2pt]";
    certs.forEach((cert) => {
      if (cert && cert.trim()) c += `\\item ${cert}`;
    });
    return c + "\\end{itemize}";
  };

  return { generateLatex };
};

export default useLatexGenerator;
