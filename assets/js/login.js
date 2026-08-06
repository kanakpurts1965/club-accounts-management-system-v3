/* ==========================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
   LOGIN ENGINE V3
   Designed & Developed by Tanmoy Adak
========================================================== */

import {

masterLogin,
adminLogin,
memberLogin

} from "./auth.js";

/* ===========================================
   ELEMENTS
=========================================== */

const memberTab=document.getElementById("memberTab");

const adminTab=document.getElementById("adminTab");

const memberBox=document.getElementById("memberLogin");

const adminBox=document.getElementById("adminLogin");

const masterBox=document.getElementById("masterLogin");

const pinModal=document.getElementById("masterPinModal");

/* ===========================================
   TAB SWITCH
=========================================== */

memberTab.onclick=()=>{

memberTab.classList.add("active");

adminTab.classList.remove("active");

memberBox.classList.add("active");

adminBox.classList.remove("active");

memberBox.style.display="block";

adminBox.style.display="none";

}

adminTab.onclick=()=>{

adminTab.classList.add("active");

memberTab.classList.remove("active");

adminBox.classList.add("active");

memberBox.classList.remove("active");

adminBox.style.display="block";

memberBox.style.display="none";

}

/* ===========================================
   MASTER SHORTCUT
=========================================== */

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()=="a"){

pinModal.classList.add("active");

}

});

/* ===========================================
   MOBILE LONG PRESS
=========================================== */

const logo=document.getElementById("clubLogo");

let holdTimer=null;

logo.addEventListener("touchstart",()=>{

holdTimer=setTimeout(()=>{

pinModal.classList.add("active");

},5000);

});

logo.addEventListener("touchend",()=>{

clearTimeout(holdTimer);

});

logo.addEventListener("touchcancel",()=>{

clearTimeout(holdTimer);

});

/* ==========================================================
   LOGIN EVENTS
========================================================== */

/* ===========================
   MEMBER LOGIN
=========================== */

document.getElementById("memberLoginForm")

.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoader();

const mobile=

document.getElementById("memberMobile").value.trim();

const password=

document.getElementById("memberPassword").value;

try{

await memberLogin(

mobile,

password

);

hideLoader();

}catch(err){

hideLoader();

showToast(err.message,"danger");

}

});

/* ===========================
   ADMIN LOGIN
=========================== */

document.getElementById("adminLoginForm")

.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoader();

const id=

document.getElementById("adminId").value.trim();

const password=

document.getElementById("adminPassword").value;

try{

await adminLogin(

id,

password

);

hideLoader();

}catch(err){

hideLoader();

showToast(err.message,"danger");

}

});

/* ===========================
   MASTER LOGIN
=========================== */

document.getElementById("masterLoginForm")

.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoader();

const email=

document.getElementById("masterEmail").value.trim();

const password=

document.getElementById("masterPassword").value;

try{

await masterLogin(

email,

password

);

hideLoader();

}catch(err){

hideLoader();

showToast(err.message,"danger");

}

});

/* ===========================
   VERIFY MASTER PIN
=========================== */

document

.getElementById("continueMasterPin")

.addEventListener("click",()=>{

const pin=

document

.getElementById("masterPin")

.value

.trim();

/* TEMP */

if(pin==="123456"){

pinModal.classList.remove("active");

masterBox.style.display="block";

document

.getElementById("masterPin")

.value="";

showToast(

"Master Access Granted",

"success"

);

}else{

showToast(

"Invalid Master PIN",

"danger"

);

}

});

/* ===========================
   CANCEL PIN
=========================== */

document

.getElementById("cancelMasterPin")

.onclick=()=>{

pinModal.classList.remove("active");

document

.getElementById("masterPin")

.value="";

};

/* ===========================
   REMEMBER ME
=========================== */

window.addEventListener("load",()=>{

const saved=

localStorage.getItem("rememberLogin");

if(saved){

const obj=

JSON.parse(saved);

if(obj.type==="member"){

memberTab.click();

memberMobile.value=obj.id;

}

if(obj.type==="admin"){

adminTab.click();

adminId.value=obj.id;

}

}

});
