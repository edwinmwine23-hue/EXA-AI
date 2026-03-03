import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// REGISTER
export async function register(email, password) {
  const userCredential =
    await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  // Create user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: serverTimestamp(),
    plan: "free",
    totalChats: 0
  });

  return user;
}

// LOGIN
export async function login(email, password) {
  const userCredential =
    await signInWithEmailAndPassword(auth, email, password);

  return userCredential.user;
}

// LOGOUT
export async function logout() {
  await signOut(auth);
}