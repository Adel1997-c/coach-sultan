// lib/auth.js
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Coach login
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Coach logout
export const logoutAdmin = async () => {
  await signOut(auth);
};
