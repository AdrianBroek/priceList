// Zamiast importu domyślnego obiektu 'firebase', importuj moduły oddzielnie
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Pobranie modułu uwierzytelniania
const auth = getAuth(app);

export { auth };
export default app;
