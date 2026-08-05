import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

sendPasswordResetEmail,

onAuthStateChanged,

signOut

}

from

"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginForm=

document.getElementById(

"loginForm"

);

if(loginForm){

loginForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

const email=

document.getElementById(

"email"

).value;

const password=

document.getElementById(

"password"

).value;

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

location.href=

"dashboard.html";

}

catch(error){

alert(

error.message

);

}

}

);

}

const forgot=

document.getElementById(

"forgotPassword"

);

if(forgot){

forgot.onclick=

async()=>{

const email=

document.getElementById(

"email"

).value;

if(!email){

alert(

"Enter your email first."

);

return;

}

try{

await sendPasswordResetEmail(

auth,

email

);

alert(

"Password reset email sent."

);

}

catch(error){

alert(

error.message

);

}

};

}

onAuthStateChanged(

auth,

(user)=>{

const page=

location.pathname;

if(

user&&

page.includes(

"login.html"

)

){

location.href=

"dashboard.html";

}

}

);

window.logout=

async()=>{

await signOut(auth);

location.href=

"login.html";

};
