import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Étudiants, remplacez ceci par votre propre config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXGOSzsY48q3gc2jW2CgP1vdUvAnk60G8",
  authDomain: "vue-kanban-15ca8.firebaseapp.com",
  projectId: "vue-kanban-15ca8",
  storageBucket: "vue-kanban-15ca8.firebasestorage.app",
  messagingSenderId: "483451950226",
  appId: "1:483451950226:web:0c0559a31921ba7a48824b",
  measurementId: "G-Q5VF8K27RR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };