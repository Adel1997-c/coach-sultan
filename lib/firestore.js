// lib/firestore.js
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc
} from "firebase/firestore";

// Add new trainee
export const addTrainee = async (data) => {
  await addDoc(collection(db, "trainees"), data);
};

// Get all trainees
export const getAllTrainees = async () => {
  const snapshot = await getDocs(collection(db, "trainees"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get trainee by ID
export const getTraineeById = async (id) => {
  const docRef = doc(db, "trainees", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Delete trainee
export const deleteTrainee = async (id) => {
  await deleteDoc(doc(db, "trainees", id));
};
