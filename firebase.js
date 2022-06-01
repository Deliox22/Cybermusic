import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore,collection,getDocs,onSnapshot,addDoc,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
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
const storage = getStorage();

export const saveTask = (title, description, genre, file , type) => {

  const storageRef = ref(storage, file.name);       

  uploadBytes(storageRef, file).then((snapshop) => {
    getDownloadURL(snapshop.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      addDoc(collection(db, "Canciones"), { title, description, genre, downloadURL, type});
    });
  });
}

export const getTasks = () => getDocs(collection(db, "Canciones"));
export const getTasksCanciones = () => getDocs(collection(db, "Canciones"));

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "Canciones"), callback);

  export const deleteTask = (id) => deleteDoc(doc(db, "Canciones", id));

  export const getTask = (id) => getDoc(doc(db, "Canciones", id));

  

export const saveTask2 = (title, description, genre, partText, file , type) => {

  const storageRef = ref(storage, file.name);       
  
  uploadBytes(storageRef, file).then((snapshop) => {
    getDownloadURL(snapshop.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      addDoc(collection(db, "Partituras"), { title, description, genre, partText ,downloadURL, type});
    });
  });
}


export const getTasks2 = () => getDocs(collection(db, "Partituras"));
export const getTasksCanciones2 = () => getDocs(collection(db, "Partituras"));

export const onGetTasks2 = (callback) =>
  onSnapshot(collection(db, "Partituras"), callback);

  export const deleteTask2 = (id) => deleteDoc(doc(db, "Partituras", id));

  export const getTask2 = (id) => getDoc(doc(db, "Partituras", id));


  
