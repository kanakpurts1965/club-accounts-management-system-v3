/* =====================================================
   CLUB ACCOUNTS MANAGEMENT SYSTEM
   App JS
   Designed & Developed by Tanmoy Adak
===================================================== */

"use strict";

/* ================= Sidebar ================= */

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#menuBtn");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("active");

});

}

/* ================= Dropdown ================= */

document.querySelectorAll(".menu-toggle").forEach(menu=>{

menu.addEventListener("click",()=>{

menu.parentElement.classList.toggle("menu-open");

});

});

/* ================= Active Menu ================= */

const currentPage=window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar a").forEach(link=>{

const href=link.getAttribute("href");

if(href===currentPage){

link.classList.add("active");

}

});

/* ================= Modal ================= */

window.openModal=function(id){

document.getElementById(id).classList.add("active");

}

window.closeModal=function(id){

document.getElementById(id).classList.remove("active");

}

/* Close Modal Outside Click */

window.onclick=function(e){

document.querySelectorAll(".modal").forEach(modal=>{

if(e.target===modal){

modal.classList.remove("active");

}

});

}

/* ================= Notification ================= */

window.showToast=function(message,type="success"){

const toast=document.createElement("div");

toast.className="toast "+type;

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},3000);

}

/* ================= Loader ================= */

window.showLoader=function(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="flex";

}

}

window.hideLoader=function(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

}

/* ================= Search ================= */

window.searchTable=function(inputId,tableId){

const keyword=document.getElementById(inputId).value.toLowerCase();

const rows=document.querySelectorAll(`#${tableId} tbody tr`);

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(keyword)

? ""

: "none";

});

}

/* ================= Confirm Delete ================= */

window.confirmDelete=function(callback){

if(confirm("Are you sure you want to delete this record?")){

callback();

}

}

/* ================= Current Date ================= */

window.today=function(){

const d=new Date();

return d.toISOString().split("T")[0];

}

/* ================= Time ================= */

window.currentTime=function(){

return new Date().toLocaleTimeString();

}

/* ================= Number Format ================= */

window.money=function(amount){

return new Intl.NumberFormat("en-IN",{

style:"currency",

currency:"INR"

}).format(amount);

}

/* ================= Logout ================= */

window.logout=function(){

if(confirm("Logout?")){

localStorage.clear();

location.href="login.html";

}

}

/* ================= Dark Mode Ready ================= */

window.toggleTheme=function(){

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

?"dark"

:"light"

);

}

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

}

/* ================= Init ================= */

document.addEventListener("DOMContentLoaded",()=>{

hideLoader();

console.log("Club Accounts Management System Loaded");

});
/* ===========================================
   MOBILE MASTER LOGIN
=========================================== */

const logo=document.querySelector(".logo img");

let pressTimer=null;

if(logo){

logo.addEventListener("touchstart",()=>{

pressTimer=setTimeout(()=>{

const pin=prompt("Enter Master PIN");

if(pin==="123456"){

location.href="login.html?master=1";

}

},5000);

});

logo.addEventListener("touchend",()=>{

clearTimeout(pressTimer);

});

logo.addEventListener("touchcancel",()=>{

clearTimeout(pressTimer);

});

}
/* ===========================================
   DESKTOP MASTER LOGIN
=========================================== */

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()=="a"){

const pin=prompt("Enter Master PIN");

if(pin==="123456"){

location.href="login.html?master=1";

}

}

});
