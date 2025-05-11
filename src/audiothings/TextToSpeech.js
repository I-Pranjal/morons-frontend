import axios from 'axios';


export async function fetchAudio(text) {
    // const backendURL = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await axios.get('http://localhost:5000/api/audio?text=This is the text format for the work', {
            // params: { text : "This is the text format for the work" },
            // responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);
        console.log("audio generated") ; 
        const audio = new Audio(audioUrl);
        audio.play(); 
        return; 
    } catch (error) {
        console.error('Error fetching audio:', error);
        throw error;
    }
}