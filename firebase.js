/* ==========================================================
   firebase.js
   CLUB ACCOUNTS MANAGEMENT SYSTEM V4
========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  enableIndexedDbPersistence,

  collection,
  doc,

  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,

  getDoc,
  getDocs,

  query,
  where,
  orderBy,
  limit,

  serverTimestamp,
  Timestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===============================
   FIREBASE CONFIG
================================ */

const firebaseConfig = {

  apiKey: "AIzaSyAIdEgUsC2l2I2BLBU604LUGU9wxzz51P8",

  authDomain: "club-accounts-system.firebaseapp.com",

  projectId: "club-accounts-system",

  storageBucket: "club-accounts-system.firebasestorage.app",

  messagingSenderId: "501949137419",

  appId: "1:501949137419:web:cddd127f118fd2efecbd0e"

};

/* ===============================
   INITIALIZE
================================ */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* ===============================
   OFFLINE SUPPORT
================================ */

enableIndexedDbPersistence(db)

.catch((err)=>{

console.log(err);

});

/* ===============================
   COLLECTIONS
================================ */

const adminsRef = collection(db,"admins");

const membersRef = collection(db,"members");

const yearsRef = collection(db,"financialYears");

const programsRef = collection(db,"programs");

const categoriesRef = collection(db,"categories");

const creditsRef = collection(db,"credits");

const debitsRef = collection(db,"debits");

const contributionsRef = collection(db,"memberContributions");

const cashRef = collection(db,"clubCash");

const statementsRef = collection(db,"statements");

const activityLogsRef = collection(db,"activityLogs");

const settingsRef = collection(db,"settings");

/* ===============================
   INTERNET
================================ */

window.addEventListener("online",()=>{

console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

console.log("Internet Disconnected");

});

/* ===============================
   EXPORT
================================ */

export{

app,

auth,

db,

adminsRef,

membersRef,

yearsRef,

programsRef,

categoriesRef,

creditsRef,

debitsRef,

contributionsRef,

cashRef,

statementsRef,

activityLogsRef,

settingsRef,

collection,

doc,

addDoc,

setDoc,

updateDoc,

deleteDoc,

getDoc,

getDocs,

query,

where,

orderBy,

limit,

serverTimestamp,

Timestamp,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged,

sendPasswordResetEmail

};
