/* ==========================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
   Firebase Engine V3
   Designed & Developed by Tanmoy Adak
========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {

getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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

Timestamp,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
const firebaseConfig={

apiKey:"AIzaSyAIdEgUsC2l2I2BLBU604LUGU9wxzz51P8",

authDomain:"club-accounts-system.firebaseapp.com",

projectId:"club-accounts-system",

storageBucket:"club-accounts-system.firebasestorage.app",

messagingSenderId:"501949137419",

appId:"1:501949137419:web:cddd127f118fd2efecbd0e"

};
const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);
enableIndexedDbPersistence(db)

.then(()=>{

console.log("Firestore Offline Ready");

})

.catch((err)=>{

console.log(err);

});
window.addEventListener("online",()=>{

console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

console.log("Internet Disconnected");

});
export const adminsRef=

collection(db,"admins");

export const membersRef=

collection(db,"members");

export const yearRef=

collection(db,"financialYears");

export const programRef=

collection(db,"programs");

export const categoryRef=

collection(db,"categories");

export const creditRef=

collection(db,"credits");

export const debitRef=

collection(db,"debits");

export const contributionRef=

collection(db,"memberContributions");

export const cashRef=

collection(db,"clubCash");

export const statementRef=

collection(db,"statements");

export const activityRef=

collection(db,"activityLogs");

export const settingsRef=

collection(db,"settings");
export{

app,

db,

auth,

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

Timestamp,

serverTimestamp,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

};
