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

let chart;



window.onload=async()=>{

await loadDashboard();

};



async function loadDashboard(){

await loadCredit();

await loadDebit();

await loadMembers();

await loadContribution();

updateCards();

await loadRecent();

drawChart();

}



async function loadCredit(){

const snap=

await getDocs(

collection(db,"credit")

);

totalCredit=0;

snap.forEach(doc=>{

totalCredit+=Number(

doc.data().amount||0

);

});

}



async function loadDebit(){

const snap=

await getDocs(

collection(db,"debit")

);

totalDebit=0;

snap.forEach(doc=>{

totalDebit+=Number(

doc.data().amount||0

);

});

}



async function loadMembers(){

const snap=

await getDocs(

collection(db,"members")

);

totalMembers=snap.size;

}



async function loadContribution(){

const snap=

await getDocs(

collection(db,"member_contributions")

);

totalContribution=0;

snap.forEach(doc=>{

totalContribution+=Number(

doc.data().amount||0

);

});

}



function updateCards(){

const cash=

totalCredit-totalDebit;

totalCredit.innerText;

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

}



async function loadRecent(){

const body=

document.getElementById(

"recentTransactions"

);

body.innerHTML="";

let list=[];

const cols=[

["credit","Credit"],

["debit","Debit"],

["member_contributions","Contribution"]

];

for(const c of cols){

const snap=

await getDocs(

query(

collection(db,c[0]),

orderBy("date","desc"),

limit(5)

)

);

snap.forEach(doc=>{

list.push({

type:c[1],

...doc.data()

});

});

}

list.sort(

(a,b)=>

new Date(b.date)-

new Date(a.date)

);

list.slice(0,10)

.forEach(item=>{

body.innerHTML+=`

<tr>

<td>${item.date}</td>

<td>${item.type}</td>

<td>${item.program||"-"}</td>

<td>

₹${Number(item.amount).toLocaleString()}

</td>

</tr>

`;

});

}



function drawChart(){

const ctx=

document

.getElementById(

"accountsChart"

);

if(chart){

chart.destroy();

}

chart=

new Chart(ctx,{

type:"doughnut",

data:{

labels:[

"Credit",

"Debit",

"Contribution"

],

datasets:[{

data:[

totalCredit,

totalDebit,

totalContribution

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}



setInterval(

loadDashboard,

30000

);
