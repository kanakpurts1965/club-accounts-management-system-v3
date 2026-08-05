// dashboard.js
// ==========================================
// Dashboard V3
// Club Accounts Management System
// Designed & Developed by Tanmoy Adak
// ==========================================

import { db } from "./firebase.js";

import {

collection,

getDocs,

query,

orderBy,

limit

}

from

"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let totalCredit=0;

let totalDebit=0;

let totalMembers=0;

let totalContribution=0;

let chart=null;



window.addEventListener(

"load",

initializeDashboard

);



async function initializeDashboard(){

await loadSummary();

await loadRecentTransactions();

drawChart();

}



// =========================
// LOAD SUMMARY
// =========================

async function loadSummary(){

await loadCredit();

await loadDebit();

await loadMembers();

await loadContribution();

updateCards();

}



// =========================
// CREDIT
// =========================

async function loadCredit(){

totalCredit=0;

const snapshot=

await getDocs(

collection(db,"credit")

);

snapshot.forEach(doc=>{

const data=doc.data();

totalCredit+=

Number(

data.amount||0

);

});

}



// =========================
// DEBIT
// =========================

async function loadDebit(){

totalDebit=0;

const snapshot=

await getDocs(

collection(db,"debit")

);

snapshot.forEach(doc=>{

const data=doc.data();

totalDebit+=

Number(

data.amount||0

);

});

}

  // =========================
// MEMBERS
// =========================

async function loadMembers(){

totalMembers=0;

const snapshot=

await getDocs(

collection(db,"members")

);

totalMembers=snapshot.size;

}



// =========================
// CONTRIBUTION
// =========================

async function loadContribution(){

totalContribution=0;

const snapshot=

await getDocs(

collection(db,"member_contributions")

);

snapshot.forEach(doc=>{

const data=doc.data();

totalContribution+=

Number(

data.amount||0

);

});

}



// =========================
// UPDATE DASHBOARD
// =========================

function updateCards(){

const cash=

totalCredit-

totalDebit;

document.getElementById(

"totalCredit"

).innerText=

"₹"+

totalCredit.toLocaleString();

document.getElementById(

"totalDebit"

).innerText=

"₹"+

totalDebit.toLocaleString();

document.getElementById(

"cashInHand"

).innerText=

"₹"+

cash.toLocaleString();

document.getElementById(

"totalMembers"

).innerText=

totalMembers;

document.getElementById(

"summaryCredit"

).innerText=

"₹"+

totalCredit.toLocaleString();

document.getElementById(

"summaryDebit"

).innerText=

"₹"+

totalDebit.toLocaleString();

document.getElementById(

"summaryCash"

).innerText=

"₹"+

cash.toLocaleString();

document.getElementById(

"summaryMembers"

).innerText=

totalMembers;

}

// =========================
// RECENT TRANSACTIONS
// =========================

async function loadRecentTransactions(){

const tbody=document.getElementById("recentTransactions");

if(!tbody) return;

tbody.innerHTML="";

let transactions=[];

const collections=[

{ name:"credit", type:"Credit" },

{ name:"debit", type:"Debit" },

{ name:"member_contributions", type:"Contribution" }

];

for(const item of collections){

const snapshot=await getDocs(

query(

collection(db,item.name),

orderBy("date","desc"),

limit(5)

)

);

snapshot.forEach(doc=>{

transactions.push({

id:doc.id,

type:item.type,

...doc.data()

});

});

}

transactions.sort(

(a,b)=>

new Date(b.date)-new Date(a.date)

);

if(transactions.length===0){

tbody.innerHTML=`

<tr>

<td colspan="5">

No Transactions Found

</td>

</tr>

`;

return;

}

transactions.slice(0,10).forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.date||"-"}</td>

<td>${item.type}</td>

<td>${item.program||item.category||"-"}</td>

<td>₹${Number(item.amount||0).toLocaleString()}</td>

<td>

<span class="badge badge-success">

Completed

</span>

</td>

</tr>

`;

});

}



// =========================
// CHART
// =========================

function drawChart(){

const canvas=document.getElementById("accountsChart");

if(!canvas) return;

if(chart){

chart.destroy();

}

chart=new Chart(canvas,{

type:"bar",

data:{

labels:[

"Credit",

"Debit",

"Contribution"

],

datasets:[{

label:"Amount",

data:[

totalCredit,

totalDebit,

totalContribution

],

borderWidth:1

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

}



// =========================
// AUTO REFRESH
// =========================

setInterval(

initializeDashboard,

30000

);



// =========================
// LOGOUT
// =========================

window.logout=function(){

sessionStorage.clear();

location.href="login.html";

};



// =========================
// END
// =========================

console.log(

"Dashboard Loaded Successfully"

);
