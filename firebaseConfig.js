// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI3E2Y8yXlCoTkjlffKSm_ZK98AyKipbo",
  authDomain: "giogaapp.firebaseapp.com",
  databaseURL: "https://giogaapp-default-rtdb.firebaseio.com",
  projectId: "giogaapp",
  storageBucket: "giogaapp.firebasestorage.app",
  messagingSenderId: "809832229014",
  appId: "1:809832229014:web:6354aa741d3758451a7ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
