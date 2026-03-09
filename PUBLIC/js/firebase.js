// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  
    authDomain: "exa-ai-967ed.firebaseapp.com",
    projectId: "exa-ai-967ed",
    storageBucket: "exa-ai-967ed.firebasestorage.app",
    messagingSenderId: "594277531492",
    appId: "1:594277531492:web:188b4abee36806181c0471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
