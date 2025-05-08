// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// const my_api_key = import.meta.env.VITE_API_KEY ; 
const firebaseConfig = {
  apiKey: "AIzaSyDyXxNHAiD6USDJ_FhBpdONdXZB8nDZBX4",
  authDomain: "imgupload-fefce.firebaseapp.com",
  projectId: "imgupload-fefce",
  storageBucket: "gs://imgupload-fefce.appspot.com",
  messagingSenderId: "878283899655",
  appId: "1:878283899655:web:9e074cb9593a1907797ba2",
  measurementId: "G-PRNZ03TG3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {storage} ; 