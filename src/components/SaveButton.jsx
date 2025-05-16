import { useState } from 'react';
import { Save, Check } from 'lucide-react';

// Toast Notification Component
const Toast = ({ message, isVisible, type = "success" }) => {
  if (!isVisible) return null;
  
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  
  return (
    <div className="fixed bottom-6 right-6 px-4 py-3 rounded-lg text-white shadow-lg flex items-center z-50">
      <div className={`${bgColor} px-4 py-3 rounded-lg text-white shadow-lg flex items-center`}>
        {type === "success" ? (
          <Check className="w-5 h-5 mr-2" />
        ) : (
          <AlertCircle className="w-5 h-5 mr-2" />
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

// Reusable Save Button Component
const SaveButton = ({ sectionName = "changes" }) => {
  const [showToast, setShowToast] = useState(false);
  
  const handleSave = () => {
    // In a real app, you would save the changes to your backend
    // For demo, we'll just show a success message
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  return (
    <>
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleSave}
          className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center text-sm"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save {sectionName}
        </button>
      </div>
      
      {/* Success Toast */}
      <Toast 
        isVisible={showToast}
        message={`Your ${sectionName} have been saved successfully!`}
        type="success"
      />
    </>
  );
};

export default SaveButton;