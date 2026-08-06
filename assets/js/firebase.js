/* =====================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
   Firebase Configuration
   Designed & Developed by Tanmoy Adak
===================================================== */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {

getFirestore,
enableIndexedDbPersistence

}

from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import {

getAuth

}

from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

/* ===========================================
   FIREBASE CONFIG
=========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAIdEgUsC2l2I2BLBU604LUGU9wxzz51P8",
  authDomain: "club-accounts-system.firebaseapp.com",
  projectId: "club-accounts-system",
  storageBucket: "club-accounts-system.firebasestorage.app",
  messagingSenderId: "501949137419",
  appId: "1:501949137419:web:cddd127f118fd2efecbd0e"
};

/* ===========================================
   INITIALIZE
=========================================== */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

/* ===========================================
   OFFLINE SUPPORT
=========================================== */

enableIndexedDbPersistence(db)

.catch((err)=>{

console.log("Offline Cache Error");

console.log(err);

});

/* ===========================================
   INTERNET STATUS
=========================================== */

window.addEventListener("online",()=>{

console.log("Internet Connected");

if(typeof showToast==="function"){

showToast("Internet Connected","success");

}

});

window.addEventListener("offline",()=>{

console.log("Internet Disconnected");

if(typeof showToast==="function"){

showToast("No Internet","danger");

}

});

/* ===========================================
   FIRESTORE TEST
=========================================== */

async function firebaseReady(){

try{

console.log("Firebase Connected");

}catch(e){

console.error(e);

}

}

firebaseReady();

/* ===========================================
   GLOBAL EXPORT
=========================================== */

export{

app,

db,

auth

};
