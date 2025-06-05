import { useEffect, useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; 

const API_BASE = import.meta.env.VITE_BACKEND_URL;


const useSettingsBackend = () => {

    // Update the user details 
    const saveUserDetails = async (formData) => {
        const Name = formData.get('Name');
        const email = formData.get('email');
        const image = formData.get('image');
        const randomInteger = formData.get('randomInteger');
        const photo = formData.get('photo');
        let imageUrl = photo;
        if (image) {
            imageUrl = await uploadImage(image);
         
        }
    try {
      
        const response = await axios.put(`${API_BASE}/api/users/update`, {
            name: Name,
            email,
            profilePictureUrl: imageUrl,
            randomInteger
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
       
        return response.data;
    } catch (error) {
        console.error("Error updating user details:", error);
    }
}; 

    // Upload userImage 
    const uploadImage = async (file) => {
        if (!file) return null;

        const storageRef = ref(storage, `/moronss/userImage/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
        } catch (error) {
            console.error("Upload failed", error);
        return null;
        }
        };


    return {
        saveUserDetails,
    }
}; 

export default useSettingsBackend;
