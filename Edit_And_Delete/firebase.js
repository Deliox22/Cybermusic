import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore,collection,getDocs,onSnapshot,addDoc,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_R_X1fJmC844loexbo17mx8cHim-NjQE",
  authDomain: "estudiantes-8919d.firebaseapp.com",
  projectId: "estudiantes-8919d",
  storageBucket: "estudiantes-8919d.appspot.com",
  messagingSenderId: "469840599548",
  appId: "1:469840599548:web:7e2823c7d6aec2d090fa79",
  measurementId: "G-LC5XSF75KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export const saveTask = (title, description) =>
    addDoc(collection(db, "tasks"), { title, description });

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

  export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

  export const getTask = (id) => getDoc(doc(db, "tasks", id));
  
  export const updateTask = (id, newFields) =>
    updateDoc(doc(db, "tasks", id), newFields);
  
