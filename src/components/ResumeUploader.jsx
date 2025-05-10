import { useState, useRef } from 'react';
import { 
  Upload,
  FileText,
  Edit,
  Trash2,
  Download,
  ChevronRight,
  Plus,
  AlertCircle
} from 'lucide-react';

// Section Component
const Section = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        {children}
      </div>
    </section>
  );
};

// Form Field Component
const FormField = ({ label, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
};

// Input Component
const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
    />
  );
};

const ResumeUploader = () => {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    objective: '',
    education: [],
    skills: [],
    workExperience: [],
    activities: [],
    projects: []
  });

  const resumeFileRef = useRef(null);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [editMode, setEditMode] = useState({
    education: null,
    skill: null,
    activity: null
  });
  const [newEntry, setNewEntry] = useState({
    education: {
      degree: '',
      institution: '',
      years: '',
      score: ''
    },
    skill: '',
    activity: {
      title: '',
      organization: '',
      description: ''
    }
  });

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedResume(file.name);
    }
  };

  const handleInputChange = (field, value) => {
    setResumeData({
      ...resumeData,
      [field]: value
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleNewEducationChange = (field, value) => {
    setNewEntry({
      ...newEntry,
      education: { ...newEntry.education, [field]: value }
    });
  };

  const addEducation = () => {
    if (newEntry.education.degree && newEntry.education.institution) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, newEntry.education]
      });
      setNewEntry({
        ...newEntry,
        education: { degree: '', institution: '', years: '', score: '' }
      });
    }
  };

  const removeEducation = (index) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addSkill = () => {
    if (newEntry.skill) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newEntry.skill]
      });
      setNewEntry({ ...newEntry, skill: '' });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...resumeData.activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setResumeData({ ...resumeData, activities: updatedActivities });
  };

  const handleNewActivityChange = (field, value) => {
    setNewEntry({
      ...newEntry,
      activity: { ...newEntry.activity, [field]: value }
    });
  };

  const addActivity = () => {
    if (newEntry.activity.title) {
      setResumeData({
        ...resumeData,
        activities: [...resumeData.activities, newEntry.activity]
      });
      setNewEntry({
        ...newEntry,
        activity: { title: '', organization: '', description: '' }
      });
    }
  };

  const removeActivity = (index) => {
    const updatedActivities = resumeData.activities.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, activities: updatedActivities });
  };

  return (
    <>
      <Section title="Resume Information">
        <p className="text-sm text-gray-500 mb-6">This is the resume employers will see when you apply</p>
        
        <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 mb-6 flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
          <p className="text-sm text-yellow-800">
            This is the resume employers will see when you apply. Please make sure it is up to date.
          </p>
        </div>
        
        <div className="mb-6">
          <FormField label="Full Name">
            <Input
              value={resumeData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
          </FormField>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Email">
              <Input
                type="email"
                value={resumeData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </FormField>
            
            <FormField label="Phone">
              <Input
                value={resumeData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </FormField>
          </div>
          
          <FormField label="Location">
            <Input
              value={resumeData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter your location"
            />
          </FormField>
          
          <FormField label="Career Objective">
            <textarea
              value={resumeData.objective}
              onChange={(e) => handleInputChange('objective', e.target.value)}
              placeholder="Write a brief career objective statement"
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-black focus:border-black"
            />
          </FormField>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium">Education</h3>
          </div>
          
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              {editMode.education === index ? (
                <div className="space-y-3">
                  <FormField label="Degree/Course">
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      placeholder="Enter degree or course name"
                    />
                  </FormField>
                  
                  <FormField label="Institution">
                    <Input
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      placeholder="Enter school or college name"
                    />
                  </FormField>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Duration">
                      <Input
                        value={edu.years || edu.year}
                        onChange={(e) => handleEducationChange(index, edu.years ? 'years' : 'year', e.target.value)}
                        placeholder="Enter years"
                      />
                    </FormField>
                    
                    <FormField label="Score">
                      <Input
                        value={edu.score || edu.percentage}
                        onChange={(e) => handleEducationChange(index, edu.score ? 'score' : 'percentage', e.target.value)}
                        placeholder="Enter CGPA or percentage"
                      />
                    </FormField>
                  </div>
                  
                  {edu.board && (
                    <FormField label="Board">
                      <Input
                        value={edu.board}
                        onChange={(e) => handleEducationChange(index, 'board', e.target.value)}
                        placeholder="Enter board name"
                      />
                    </FormField>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-3">
                    <button 
                      onClick={() => setEditMode({...editMode, education: null})}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setEditMode({...editMode, education: null})}
                      className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditMode({...editMode, education: index})}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  {edu.board && <p className="text-sm text-gray-500">{edu.board}</p>}
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">{edu.years || edu.year}</p>
                    <p className="text-sm font-medium">{edu.score || edu.percentage}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <div className="mb-4 p-4 border border-dashed border-gray-200 rounded-md">
            <h4 className="font-medium mb-3">Add New Education</h4>
            <div className="space-y-3">
              <FormField label="Degree/Course">
                <Input
                  value={newEntry.education.degree}
                  onChange={(e) => handleNewEducationChange('degree', e.target.value)}
                  placeholder="Enter degree or course name"
                />
              </FormField>
              
              <FormField label="Institution">
                <Input
                  value={newEntry.education.institution}
                  onChange={(e) => handleNewEducationChange('institution', e.target.value)}
                  placeholder="Enter school or college name"
                />
              </FormField>
              
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Duration">
                  <Input
                    value={newEntry.education.years}
                    onChange={(e) => handleNewEducationChange('years', e.target.value)}
                    placeholder="Enter years (2022-2026)"
                  />
                </FormField>
                
                <FormField label="Score">
                  <Input
                    value={newEntry.education.score}
                    onChange={(e) => handleNewEducationChange('score', e.target.value)}
                    placeholder="Enter CGPA or percentage"
                  />
                </FormField>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={addEducation}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Education
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button 
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Remove</span>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={newEntry.skill}
              onChange={(e) => setNewEntry({...newEntry, skill: e.target.value})}
              placeholder="Enter a new skill"
            />
            <button 
              onClick={addSkill}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition flex-shrink-0"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium">Extra-curricular Activities</h3>
          </div>
          
          {resumeData.activities.map((activity, index) => (
            <div key={index} className="mb-2 p-3 border border-gray-200 rounded-md">
              {editMode.activity === index ? (
                <div className="space-y-3">
                  <FormField label="Title">
                    <Input
                      value={activity.title}
                      onChange={(e) => handleActivityChange(index, 'title', e.target.value)}
                      placeholder="Enter activity title"
                    />
                  </FormField>
                  
                  <FormField label="Organization">
                    <Input
                      value={activity.organization}
                      onChange={(e) => handleActivityChange(index, 'organization', e.target.value)}
                      placeholder="Enter organization name"
                    />
                  </FormField>
                  
                  <FormField label="Description">
                    <textarea
                      value={activity.description}
                      onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                      placeholder="Describe your role and accomplishments"
                      className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </FormField>
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setEditMode({...editMode, activity: null})}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setEditMode({...editMode, activity: null})}
                      className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    {activity.organization && (
                      <p className="text-sm text-gray-700">{activity.organization}</p>
                    )}
                    {activity.description && (
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditMode({...editMode, activity: index})}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeActivity(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="mb-4 p-4 border border-dashed border-gray-200 rounded-md">
            <h4 className="font-medium mb-3">Add New Activity</h4>
            <div className="space-y-3">
              <FormField label="Title">
                <Input
                  value={newEntry.activity.title}
                  onChange={(e) => handleNewActivityChange('title', e.target.value)}
                  placeholder="Enter activity title"
                />
              </FormField>
              
              <FormField label="Organization">
                <Input
                  value={newEntry.activity.organization}
                  onChange={(e) => handleNewActivityChange('organization', e.target.value)}
                  placeholder="Enter organization name"
                />
              </FormField>
              
              <FormField label="Description">
                <textarea
                  value={newEntry.activity.description}
                  onChange={(e) => handleNewActivityChange('description', e.target.value)}
                  placeholder="Describe your role and accomplishments"
                  className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-black focus:border-black"
                />
              </FormField>
              
              <div className="flex justify-end">
                <button 
                  onClick={addActivity}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      <Section title="Upload Resume">
        <p className="text-sm text-gray-500 mb-6">Upload your resume file (PDF, DOCX)</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            ref={resumeFileRef}
            className="hidden"
            accept=".pdf,.docx,.doc"
            onChange={handleResumeUpload}
          />
          
          {uploadedResume ? (
            <div>
              <div className="flex items-center justify-center mb-4">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm font-medium">{uploadedResume}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <button 
                  className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => resumeFileRef.current.click()}
                >
                  Replace
                </button>
                <button 
                  className="px-3 py-1 text-red-600 hover:text-red-800 text-sm font-medium"
                  onClick={() => setUploadedResume(null)}
                >
                  Remove
                </button>
                <button 
                  className="px-3 py-1 text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" /> Download
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center mb-4">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Drag and drop your resume here, or</p>
              <button 
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
                onClick={() => resumeFileRef.current.click()}
              >
                Browse files
              </button>
              <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
            Save Changes
          </button>
        </div>
      </Section>
    </>
  );
};

export default ResumeUploader;