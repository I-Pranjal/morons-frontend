import { useState} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import TopicInput from "../components/topicinput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RoleTopicsSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    rolePreference: "",
    knownTopics: []
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddTopic = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !formData.knownTopics.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        knownTopics: [...prev.knownTopics, trimmed]
      }));
    }
    setInputValue("");
  };

  const handleRemoveTopic = (topic) => {
    setFormData(prev => ({
      ...prev,
      knownTopics: prev.knownTopics.filter(t => t !== topic)
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const techTopics = [
    "JavaScript", "Python", "Java", "C++", "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask",
    "Spring Boot","TypeScript", "MongoDB", "MySQL", "PostgreSQL", "Redis", "Docker", "Kubernetes",
    "AWS", "Azure", "Google Cloud", "Git/GitHub", "REST APIs", "GraphQL", "Microservices", "System Design",
    "Data Structures", "Algorithms", "Machine Learning", "DevOps", "CI/CD", "Testing (Unit/Integration)", "Agile/Scrum",  "REST APIs",
  "Authentication",
  "Databases",
  "System Design Basics",
  "Hashing",
  "Sorting Algorithms",
  "Binary Search",
  "Recursion",
  "Linked Lists",
  "Concurrency",
  "HTML & CSS",
  "JavaScript Fundamentals",
  "React Basics",
  "State Management",
  "Web Performance",
  "Accessibility",
  "Testing & Jest",
  "Browser Storage",
  "Caching",
  "Testing Fundamentals",
  "CI/CD",
  "Cloud Deployment"
  ];

  const handleSubmit = async () => {
    console.log("Form Data Submitted:", formData.knownTopics);
    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend", {
      role: formData.rolePreference,
      known_topics: formData.knownTopics,
      },{
        headers : {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      navigate("/hub", {
        state: response.data
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error); 
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      rolePreference: "",
      known_Topics: [],
      
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Navbar />
        </div>

        {/* Title Section */}
        <div className="text-center mb-10 mt-20">
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Developer Profile
          </h1>
          <p className="text-lg text-gray-400">
            Configure your professional preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="w-full max-w-2xl mx-auto">

            {/* Main Form Card */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white text-xl text-center">
                  Submit Your Preferences
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Role Preference Selection */}
                <div className="space-y-3">
                  <Label htmlFor="rolePreference" className="text-white text-base">
                    Preferred Developer Role *
                  </Label>
                  
                  <Select 
                    onValueChange={(value) => handleInputChange("rolePreference", value)} 
                    disabled={loading}
                    value={formData.rolePreference}
                  >
                    <SelectTrigger className="bg-black border-neutral-600 text-white h-12">
                      <SelectValue placeholder="Select your preferred role" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-600 text-white">
                      <SelectItem 
                        className="hover:bg-amber-300 hover:text-black transition-colors" 
                        value="Backend Developer"
                      >
                        Backend Developer
                      </SelectItem>
                      <SelectItem 
                        className="hover:bg-amber-300 hover:text-black transition-colors" 
                        value="Frontend Developer"
                      >
                        Frontend Developer
                      </SelectItem>
                      <SelectItem 
                        className="hover:bg-amber-300 hover:text-black transition-colors" 
                        value="Full-Stack Developer"
                      >
                        Full-Stack Developer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {formData.rolePreference && (
                    <div className="flex items-center text-amber-300 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Selected: {formData.rolePreference}
                    </div>
                  )}
                </div>

                {/* Topics Section */}
                <div className="space-y-3">
                  <Label className="text-white text-base">
                    Known Topics & Skills
                  </Label>
                  
                  <div className="bg-black p-4 rounded-lg border border-neutral-700">
                    <TopicInput
                      title="Known Topics"
                      category="knownTopics"
                      placeholder="Type a topic and press Enter"
                      value={formData.knownTopics}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      onAdd={handleAddTopic}
                      onRemove={handleRemoveTopic}
                      options={techTopics}
                    />
                    
                    {formData.knownTopics.length > 0 && (
                      <div className="mt-3 text-sm text-amber-300">
                        {formData.knownTopics.length} topics added
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !formData.rolePreference}
                    className="w-full bg-amber-300 text-black hover:bg-amber-400 h-12 text-base font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Preferences
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  {!formData.rolePreference && (
                    <p className="text-amber-300 text-sm text-center mt-2">
                      Please select a developer role to continue
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleTopicsSubmission;