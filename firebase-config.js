/**
 * ARGI Studio — Firebase Real-Time Cloud Database & Storage Integration
 * Project ID: argi-studio
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase App Configuration provided by User
export const firebaseConfig = {
  apiKey: "AIzaSyDqJ4YwyEiO8iFXg-xQGXwL272Z84oCNkM",
  authDomain: "argi-studio.firebaseapp.com",
  projectId: "argi-studio",
  storageBucket: "argi-studio.firebasestorage.app",
  messagingSenderId: "292121121878",
  appId: "1:292121121878:web:c2841f3263e303bfc117f7",
  measurementId: "G-W6C9V5GFZP"
};

// Initialize Firebase SDK
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Fetch all projects from Firestore (with local fallback)
 */
export async function getCloudProjects() {
  try {
    const colRef = collection(db, "projects");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = {};
      snapshot.forEach(docSnap => {
        data[docSnap.id] = docSnap.data();
      });
      localStorage.setItem("argi_projects_data", JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn("Firestore projects read fallback:", err);
  }
  // Local fallback
  const local = localStorage.getItem("argi_projects_data");
  if (local) return JSON.parse(local);
  try {
    const staticRes = await fetch("data/projects.json");
    if (staticRes.ok) return await staticRes.json();
  } catch (err) {}
  return {};
}

/**
 * Save / Update a Project in Firestore
 */
export async function saveCloudProject(id, projectData) {
  try {
    const docRef = doc(db, "projects", id);
    await setDoc(docRef, projectData, { merge: true });
    return true;
  } catch (err) {
    console.error("Failed to save project to Firestore:", err);
    throw err;
  }
}

/**
 * Delete a Project from Firestore
 */
export async function deleteCloudProject(id) {
  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("Failed to delete project from Firestore:", err);
    throw err;
  }
}

/**
 * Fetch all articles from Firestore (with local fallback)
 */
export async function getCloudArticles() {
  try {
    const colRef = collection(db, "articles");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = {};
      snapshot.forEach(docSnap => {
        data[docSnap.id] = docSnap.data();
      });
      localStorage.setItem("argi_articles_data", JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn("Firestore articles read fallback:", err);
  }
  // Local fallback
  const local = localStorage.getItem("argi_articles_data");
  if (local) return JSON.parse(local);
  try {
    const staticRes = await fetch("data/articles.json");
    if (staticRes.ok) return await staticRes.json();
  } catch (err) {}
  return {};
}

/**
 * Save / Update an Article in Firestore
 */
export async function saveCloudArticle(id, articleData) {
  try {
    const docRef = doc(db, "articles", id);
    await setDoc(docRef, articleData, { merge: true });
    return true;
  } catch (err) {
    console.error("Failed to save article to Firestore:", err);
    throw err;
  }
}

/**
 * Delete an Article from Firestore
 */
export async function deleteCloudArticle(id) {
  try {
    const docRef = doc(db, "articles", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("Failed to delete article from Firestore:", err);
    throw err;
  }
}

/**
 * Upload Media file directly to Firebase Storage (Google Cloud CDN)
 */
export async function uploadCloudMedia(file, folder = "uploads") {
  try {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storageRef = ref(storage, `${folder}/${timestamp}_${cleanName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    console.error("Firebase Storage Upload failed:", err);
    throw err;
  }
}

/**
 * Real-time listener for projects
 */
export function subscribeCloudProjects(callback) {
  try {
    const colRef = collection(db, "projects");
    return onSnapshot(colRef, (snapshot) => {
      const data = {};
      snapshot.forEach(docSnap => {
        data[docSnap.id] = docSnap.data();
      });
      localStorage.setItem("argi_projects_data", JSON.stringify(data));
      callback(data);
    });
  } catch (err) {
    console.warn("Real-time projects listener error:", err);
    return () => {};
  }
}
