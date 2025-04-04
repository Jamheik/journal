import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey:  process.env.local.FIREBASE_API_KEY,
  authDomain: "journal-1358a.firebaseapp.com",
  projectId: "journal-1358a",
  storageBucket: "journal-1358a.firebasestorage.app",
  messagingSenderId: "366542833662",
  appId: "1:366542833662:web:73462c39cef3f54b9422af",
  measurementId: "G-J1WB6PSNB7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);