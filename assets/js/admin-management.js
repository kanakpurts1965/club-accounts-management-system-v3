// ==========================================
// ADMIN MANAGEMENT
// Club Accounts Management System
// Designed & Developed by Tanmoy Adak
// ==========================================

import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
deleteDoc,
doc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const adminCollection = collection(db,"admins");

const adminTable =
document.getElementById("adminTable");

const adminForm =
document.getElementById("adminForm");

let editId = null;



// ===============================
// LOAD ADMINS
// ===============================

window.addEventListener("load",loadAdmins);

async function loadAdmins(){

if(!adminTable) return;

adminTable.innerHTML="";

const snapshot =
await getDocs(adminCollection);

snapshot.forEach(item=>{

const data=item.data();

adminTable.innerHTML+=`

<tr>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.email}</td>

<td>${data.role}</td>

<td>

<span class="${
data.status=="Active"
?
"badge-active"
:
"badge-inactive"
}">

${data.status}

</span>

</td>

<td>

<button
class="action-btn edit-btn"
onclick="editAdmin('${item.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteAdmin('${item.id}')">

Delete

</button>

</td>

</tr>

`;

});

}



// ===============================
// OPEN MODAL
// ===============================

window.openAdminModal=function(){

editId=null;

adminForm.reset();

document.getElementById(
"adminModal"
).style.display="flex";

};



// ===============================
// CLOSE MODAL
// ===============================

window.closeAdminModal=function(){

document.getElementById(
"adminModal"
).style.display="none";

};



// ===============================
// SAVE ADMIN
// ===============================

adminForm.addEventListener(

"submit",

saveAdmin

);

async function saveAdmin(e){

e.preventDefault();

const data={

name:adminName.value,

mobile:adminMobile.value,

email:adminEmail.value,

role:adminRole.value,

status:adminStatus.value,

createdAt:serverTimestamp()

};

if(editId){

await updateDoc(

doc(db,"admins",editId),

data

);

}else{

await addDoc(

adminCollection,

data

);

}

closeAdminModal();

loadAdmins();

}



// ===============================
// DELETE
// ===============================

window.deleteAdmin=

async function(id){

if(!confirm("Delete Admin?")) return;

await deleteDoc(

doc(db,"admins",id)

);

loadAdmins();

};



// ===============================
// EDIT
// ===============================

window.editAdmin=

async function(id){

alert("Edit module will be added in next step.");

};



// ===============================
// SEARCH
// ===============================

window.searchAdmin=function(){

const keyword=

document.getElementById(

"adminSearch"

).value.toLowerCase();

const rows=

adminTable.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

const txt=

rows[i].innerText.toLowerCase();

rows[i].style.display=

txt.includes(keyword)

?

""

:

"none";

}

};



// ===============================
// END
// ===============================

console.log(

"Admin Management Loaded"

);
