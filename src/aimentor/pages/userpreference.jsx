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
    <div className="min-h-screen bg-neutral-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
         <Navbar / >
        </div>

        <Card className="bg-[#23232a] border-[#35353f] mt-20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Submit Your Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Role Preference Selection */}
            <div>
              <Label htmlFor="rolePreference" className="text-white">Preferred Developer Role *</Label>
              <Select 
                onValueChange={(value) => handleInputChange("rolePreference", value)} 
                disabled={loading}
                value={formData.rolePreference}
              >
                <SelectTrigger className="bg-[#18181b] border-[#35353f] text-white">
                  <SelectValue placeholder="Select your preferred role" />
                </SelectTrigger>
                <SelectContent className="bg-[#23232a] border-[#35353f] text-white">
                  <SelectItem className="hover:bg-amber-200 hover:text-black transition-normal" value="Backend Developer">Backend Developer</SelectItem>
                  <SelectItem className="hover:bg-amber-200 hover:text-black transition-normal" value="Frontend Developer">Frontend Developer</SelectItem>
                  <SelectItem className="hover:bg-amber-200 hover:text-black transition-normal" value="Full-Stack Developer">Full-Stack Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Topics Selection */}

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

        

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#f0c14b] text-[#23232a] hover:bg-[#ffe08a] h-12"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleTopicsSubmission;