import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnrLJsVFoYAXq3NicTvX3j3PtvtSzq1Yg",
  authDomain: "tester-a7ca6.firebaseapp.com",
  projectId: "tester-a7ca6",
  storageBucket: "tester-a7ca6.appspot.com",
  messagingSenderId: "288590069065",
  appId: "1:288590069065:web:54fcf03548b5a56b6eae98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
 

export { auth, db };
export default app;
