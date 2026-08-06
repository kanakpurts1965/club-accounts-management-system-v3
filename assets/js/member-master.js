/* =====================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM 
   Member Master
===================================================== */

import {
db
} from "./firebase.js";

import {

collection,

doc,

addDoc,

getDocs,

getDoc,

updateDoc,

deleteDoc,

query,

orderBy,

where

} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const memberCollection=collection(db,"members");

const tbody=document.querySelector("#memberTable tbody");

const memberForm=document.getElementById("memberForm");

const memberNo=document.getElementById("memberNo");

const joinDate=document.getElementById("joinDate");

const memberName=document.getElementById("memberName");

const memberMobile=document.getElementById("memberMobile");

const memberPassword=document.getElementById("memberPassword");

const bloodGroup=document.getElementById("bloodGroup");

const memberStatus=document.getElementById("memberStatus");

let editId=null;

/* ===========================
   AUTO MEMBER NUMBER
=========================== */

async function generateMemberNo(){

const snap=await getDocs(

query(memberCollection,orderBy("memberNo","desc"))

);

if(snap.empty){

memberNo.value=1;

return;

}

memberNo.value=snap.docs[0].data().memberNo+1;

}

/* ===========================
   UID
=========================== */

function generateUID(no){

return "UID"+String(no).padStart(3,"0");

}

/* ===========================
   TODAY
=========================== */

function todayDate(){

const d=new Date();

joinDate.value=d.toISOString().split("T")[0];

}

todayDate();

generateMemberNo();

/* ===========================
   DUPLICATE MOBILE
=========================== */

async function mobileExists(mobile){

const q=query(

memberCollection,

where("mobile","==",mobile)

);

const s=await getDocs(q);

return !s.empty;

}
/* ===========================
   SAVE MEMBER
=========================== */

memberForm.addEventListener("submit", async (e)=>{

e.preventDefault();

showLoader();

try{

const mobile=memberMobile.value.trim();

if(editId===null){

const exists=await mobileExists(mobile);

if(exists){

hideLoader();

showToast("Mobile Number Already Exists","danger");

return;

}

}

const data={

uid:generateUID(Number(memberNo.value)),

memberNo:Number(memberNo.value),

name:memberName.value.trim(),

mobile:mobile,

password:mobile,

bloodGroup:bloodGroup.value,

photo:"",

joinDate:joinDate.value,

status:memberStatus.value,

role:"member",

createdAt:new Date()

};

if(editId){

await updateDoc(

doc(db,"members",editId),

data

);

showToast("Member Updated Successfully");

}else{

await addDoc(

memberCollection,

data

);

showToast("Member Added Successfully");

}

memberForm.reset();

editId=null;

todayDate();

await generateMemberNo();

memberPassword.value="";

closeModal("memberModal");

loadMembers();

hideLoader();

}catch(err){

console.error(err);

hideLoader();

showToast("Failed To Save Member","danger");

}

});

/* ===========================
   LOAD MEMBERS
=========================== */

async function loadMembers(){

tbody.innerHTML="";

const snap=await getDocs(

query(memberCollection,orderBy("memberNo"))

);

if(snap.empty){

tbody.innerHTML=`

<tr>

<td colspan="8"

style="text-align:center;">

No Members Found

</td>

</tr>

`;

return;

}

snap.forEach((docSnap)=>{

const m=docSnap.data();

tbody.innerHTML+=`

<tr>

<td>

<img

class="avatar"

src="${m.photo || '123.png.png'}">

</td>

<td>${m.memberNo}</td>

<td>${m.name}</td>

<td>${m.mobile}</td>

<td>${m.bloodGroup||'-'}</td>

<td>${m.joinDate}</td>

<td>

<span class="badge badge-success">

${m.status}

</span>

</td>

<td>

<div class="action-group">

<button

class="icon-btn view-btn"

onclick="viewMember('${docSnap.id}')">

👁

</button>

<button

class="icon-btn edit-btn"

onclick="editMember('${docSnap.id}')">

✏

</button>

<button

class="icon-btn delete-btn"

onclick="deleteMember('${docSnap.id}')">

🗑

</button>

</div>

</td>

</tr>

`;

});

}

loadMembers();

/* ===========================
   VIEW MEMBER
=========================== */

window.viewMember = async function(id){

showLoader();

try{

const ref = doc(db,"members",id);

const snap = await getDoc(ref);

if(!snap.exists()){

showToast("Member Not Found","danger");

hideLoader();

return;

}

const m = snap.data();

alert(

"Member No : "+m.memberNo+

"\nName : "+m.name+

"\nMobile : "+m.mobile+

"\nBlood : "+(m.bloodGroup||"-")+

"\nJoin Date : "+m.joinDate+

"\nStatus : "+m.status

);

hideLoader();

}catch(err){

console.error(err);

hideLoader();

showToast("Failed","danger");

}

}

/* ===========================
   EDIT MEMBER
=========================== */

window.editMember = async function(id){

showLoader();

try{

const ref = doc(db,"members",id);

const snap = await getDoc(ref);

if(!snap.exists()){

hideLoader();

return;

}

const m = snap.data();

editId=id;

memberNo.value=m.memberNo;

joinDate.value=m.joinDate;

memberName.value=m.name;

memberMobile.value=m.mobile;

memberPassword.value=m.password;

bloodGroup.value=m.bloodGroup;

memberStatus.value=m.status;

openModal("memberModal");

hideLoader();

}catch(err){

console.error(err);

hideLoader();

}

}

/* ===========================
   DELETE MEMBER
=========================== */

window.deleteMember=function(id){

confirmDelete(async()=>{

showLoader();

try{

await deleteDoc(doc(db,"members",id));

showToast("Member Deleted");

loadMembers();

hideLoader();

}catch(err){

console.error(err);

hideLoader();

showToast("Delete Failed","danger");

}

});

}

/* ===========================
   MEMBER COUNT
=========================== */

async function loadMemberCount(){

const snap=await getDocs(memberCollection);

const box=document.getElementById("memberCount");

if(box){

box.innerHTML=snap.size;

}

}

loadMemberCount();

/* ===========================
   PHOTO URL
=========================== */

window.setPhotoURL=function(url){

document.getElementById("memberPhoto").dataset.url=url;

}

/* ===========================
   SEARCH
=========================== */

window.searchMember=function(){

const key=document

.getElementById("memberSearch")

.value

.toLowerCase();

document

.querySelectorAll("#memberTable tbody tr")

.forEach(row=>{

row.style.display=

row.innerText

.toLowerCase()

.includes(key)

?

""

:

"none";

});

}

/* ===========================
   REFRESH
=========================== */

window.refreshMembers=async function(){

showLoader();

await loadMembers();

await loadMemberCount();

await generateMemberNo();

hideLoader();

}

/* ===========================
   INIT
=========================== */

document.addEventListener("DOMContentLoaded",async()=>{

await loadMembers();

await loadMemberCount();

await generateMemberNo();

todayDate();

});
