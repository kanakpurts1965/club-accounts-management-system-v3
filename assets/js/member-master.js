// ==========================================
// SAVE MEMBER
// ==========================================

memberForm.addEventListener(

"submit",

saveMember

);

async function saveMember(e){

e.preventDefault();

const photoInput=document.getElementById("memberPhoto");

let photoURL="";



// ==========================================
// GOOGLE DRIVE UPLOAD
// তোমার Existing Upload Script এখানে Call হবে
// ==========================================

if(photoInput.files.length>0){

photoURL=await uploadMemberPhoto(

photoInput.files[0]

);

}



// ==========================================
// MEMBER DATA
// ==========================================

const data={

name:document.getElementById(

"memberName"

).value.trim(),

mobile:document.getElementById(

"memberMobile"

).value.trim(),

password:document.getElementById(

"memberMobile"

).value.trim(),

bloodGroup:document.getElementById(

"memberBlood"

).value,

joinDate:document.getElementById(

"memberJoinDate"

).value,

photo:photoURL,

role:"member",

status:"active",

createdAt:new Date()

};



// ==========================================
// UPDATE
// ==========================================

if(editId){

await updateDoc(

doc(db,"members",editId),

data

);

alert("Member Updated Successfully");

}



// ==========================================
// ADD
// ==========================================

else{

await addDoc(

memberCollection,

data

);

alert("Member Added Successfully");

}

closeMemberModal();

loadMembers();

}



// ==========================================
// PHOTO UPLOAD
// Existing Google Drive API ব্যবহার হবে
// ==========================================

async function uploadMemberPhoto(file){

const formData=new FormData();

formData.append("file",file);



const response=await fetch(

YOUR_GOOGLE_DRIVE_UPLOAD_URL,

{

method:"POST",

body:formData

}

);



const result=await response.json();

return result.url;

}

// ==========================================
// LOAD MEMBERS
// ==========================================

async function loadMembers(){

const q=query(

memberCollection,

orderBy("joinDate","desc")

);

const snapshot=await getDocs(q);

memberTable.innerHTML="";

snapshot.forEach(item=>{

const data=item.data();

memberTable.innerHTML+=`

<tr>

<td>

<img
class="member-photo"
src="${data.photo||'123.png.png'}">

</td>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.bloodGroup||"-"}</td>

<td>${data.joinDate}</td>

<td>

<span class="badge-active">

${data.status}

</span>

</td>

<td>

<button
class="action-btn edit-btn"
onclick="editMember('${item.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteMember('${item.id}')">

Delete

</button>

</td>

</tr>

`;

});

}



// ==========================================
// SEARCH MEMBER
// ==========================================

window.searchMember=function(){

const value=

document

.getElementById(

"memberSearch"

)

.value

.toLowerCase();

const rows=

memberTable.getElementsByTagName("tr");

for(let row of rows){

const text=row.innerText.toLowerCase();

row.style.display=

text.includes(value)

? ""

: "none";

}

};



// ==========================================
// DELETE MEMBER
// ==========================================

window.deleteMember=

async function(id){

if(

!confirm(

"Delete this member?"

)

){

return;

}

await deleteDoc(

doc(db,"members",id)

);

loadMembers();

};



// ==========================================
// EDIT MEMBER
// ==========================================

window.editMember=

async function(id){

const snapshot=

await getDocs(memberCollection);

snapshot.forEach(item=>{

if(item.id!==id)return;

const data=item.data();

editId=id;

document.getElementById("memberName").value=data.name;

document.getElementById("memberMobile").value=data.mobile;

document.getElementById("memberBlood").value=data.bloodGroup;

document.getElementById("memberJoinDate").value=data.joinDate;

document.getElementById("memberModal").style.display="flex";

});

};



// ==========================================
// END
// ==========================================

console.log(

"Member Master Loaded"

);
