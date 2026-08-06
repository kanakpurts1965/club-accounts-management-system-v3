/* ==========================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
   AUTH ENGINE V4
   Designed & Developed by Tanmoy Adak
========================================================== */

import{

auth,
db,

adminsRef,
membersRef,

doc,
getDoc,
getDocs,

query,
where,

signInWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
onAuthStateChanged,

updateDoc,
serverTimestamp

}

from "./firebase.js";

/* ==========================================================
   SESSION KEY
========================================================== */

const SESSION_NAME="club_accounts_session";

/* ==========================================================
   SAVE SESSION
========================================================== */

function saveSession(user){

localStorage.setItem(

SESSION_NAME,

JSON.stringify(user)

);

}

/* ==========================================================
   GET SESSION
========================================================== */

export function getSession(){

const data=

localStorage.getItem(

SESSION_NAME

);

return data?

JSON.parse(data)

:

null;

}

/* ==========================================================
   REMOVE SESSION
========================================================== */

export function removeSession(){

localStorage.removeItem(

SESSION_NAME

);

}

/* ==========================================================
   MEMBER LOGIN
========================================================== */

export async function memberLogin(

mobile,

password

){

const q=query(

membersRef,

where("mobile","==",mobile)

);

const snap=

await getDocs(q);

if(snap.empty){

throw new Error(

"Member not found."

);

}

const memberDoc=

snap.docs[0];

const member=

memberDoc.data();

if(member.status!=="active"){

throw new Error(

"Member account disabled."

);

}

if(member.password!==password){

throw new Error(

"Invalid password."

);

}

await updateDoc(

memberDoc.ref,

{

lastLogin:

serverTimestamp()

}

);

saveSession({

uid:member.uid,

memberId:member.memberId,

name:member.name,

role:"member",

mobile:member.mobile

});

location.replace(

"viewer.html"

);

}

/* ==========================================================
   ADMIN LOGIN
========================================================== */

export async function adminLogin(

id,

password

){

const field=

id.includes("@")

?

"email"

:

"mobile";

const q=query(

adminsRef,

where(field,"==",id)

);

const snap=

await getDocs(q);

if(snap.empty){

throw new Error(

"Admin not found."

);

}

const adminDoc=

snap.docs[0];

const admin=

adminDoc.data();

if(admin.status!=="active"){

throw new Error(

"Admin account disabled."

);

}

if(admin.password!==password){

throw new Error(

"Invalid password."

);

}

await updateDoc(

adminDoc.ref,

{

lastLogin:

serverTimestamp()

}

);

saveSession({

uid:admin.uid,

adminId:admin.adminId,

name:admin.name,

role:admin.role,

mobile:admin.mobile,

email:admin.email

});

location.replace(

"dashboard.html"

);

}

/* ==========================================================
   MASTER LOGIN
========================================================== */

export async function masterLogin(

email,

password

){

const user=

await signInWithEmailAndPassword(

auth,

email,

password

);

const ref=

doc(

db,

"admins",

"master"

);

const snap=

await getDoc(ref);

if(!snap.exists()){

throw new Error(

"Master Admin not found."

);

}

const master=

snap.data();

if(master.status!=="active"){

throw new Error(

"Master account disabled."

);

}

await updateDoc(

ref,

{

lastLogin:

serverTimestamp()

}

);

saveSession({

uid:user.user.uid,

name:master.name,

role:"master",

mobile:master.mobile,

email:master.email

});

location.replace(

"dashboard.html"

);

/* ==========================================================
   RESET PASSWORD
========================================================== */

}

export async function resetPassword(

email

){

await sendPasswordResetEmail(

auth,

email

);

}

/* ==========================================================
   LOGOUT
========================================================== */

export async function logout(){

await signOut(

auth

);

removeSession();

location.replace(

"login.html"

);

}

/* ==========================================================
   ROUTE PROTECTION
========================================================== */

export function requireLogin(){

const session=

getSession();

if(!session){

location.replace(

"login.html"

);

return null;

}

return session;

}

/* ==========================================================
   AUTH STATE
========================================================== */

onAuthStateChanged(

auth,

(user)=>{

if(user){

console.log(

"Logged :",

user.email

);

}else{

console.log(

"No Login"

);

}

}
);
