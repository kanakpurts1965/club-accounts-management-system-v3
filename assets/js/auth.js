/* ==========================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
  Authentication Engine V3 
   Designed & Developed by Tanmoy Adak
========================================================== */

import {

auth,
db,

signInWithEmailAndPassword,
signOut,
onAuthStateChanged,

doc,
getDoc,
getDocs,
query,
where,

adminsRef,
membersRef

}

from "./firebase.js";

/* ===========================================
   SESSION
=========================================== */

const SESSION_KEY="club_accounts_session";

/* ===========================================
   SAVE SESSION
=========================================== */

function saveSession(data){

localStorage.setItem(

SESSION_KEY,

JSON.stringify(data)

);

}

/* ===========================================
   GET SESSION
=========================================== */

export function getSession(){

const s=

localStorage.getItem(SESSION_KEY);

return s?JSON.parse(s):null;

}

/* ===========================================
   CLEAR SESSION
=========================================== */

export function clearSession(){

localStorage.removeItem(

SESSION_KEY

);

}

/* ===========================================
   MEMBER LOGIN
=========================================== */

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

"Member Not Found"

);

}

const member=

snap.docs[0].data();

if(member.status!="active"){

throw new Error(

"Member Account Disabled"

);

}

if(member.password!==password){

throw new Error(

"Wrong Password"

);

}

saveSession({

uid:member.uid,

memberNo:member.memberNo,

name:member.name,

role:"member",

mobile:member.mobile

});

location.href="viewer.html";

}

/* ==========================================================
   ADMIN LOGIN
========================================================== */

export async function adminLogin(

id,

password

){

const q=query(

adminsRef,

where(

id.includes("@")

?

"email"

:

"mobile",

"==",

id

)

);

const snap=

await getDocs(q);

if(snap.empty){

throw new Error(

"Admin Not Found"

);

}

const admin=

snap.docs[0].data();

if(admin.status!="active"){

throw new Error(

"Admin Account Disabled"

);

}

if(admin.password!==password){

throw new Error(

"Wrong Password"

);

}

saveSession({

uid:admin.uid,

name:admin.name,

role:admin.role,

email:admin.email,

mobile:admin.mobile

});

location.href="dashboard.html";

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

"Master Admin Not Found"

);

}

const master=

snap.data();

if(master.status!="active"){

throw new Error(

"Master Disabled"

);

}

saveSession({

uid:user.user.uid,

name:master.name,

role:"master",

email:master.email,

mobile:master.mobile

});

location.href="dashboard.html";

}

/* ==========================================================
   LOGOUT
========================================================== */

export async function logout(){

await signOut(auth);

clearSession();

location.replace("login.html");

}

/* ==========================================================
   SESSION CHECK
========================================================== */

export function requireLogin(){

const session=

getSession();

if(!session){

location.replace("login.html");

return;

}

return session;

}
