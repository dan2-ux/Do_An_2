// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA42nqZT73f5epwzefI5xNY5y4fWqwWb6E",
  authDomain: "doan-9a8fd.firebaseapp.com",
  databaseURL: "https://doan-9a8fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "doan-9a8fd",
  storageBucket: "doan-9a8fd.appspot.com",
  messagingSenderId: "140758962502",
  appId: "1:140758962502:web:5c9a588a2ab470fa499547"
};


const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(); 
const storage = firebase.storage(); 






const tenkiemtra = document.getElementById("tenkiemtra")
const nutkiemtra = document.getElementById("nutkiemtra")
const ngaykiemtra = document.getElementById("ngaykiemtra")
const table = document.getElementById("table")
const tablecon = document.querySelector("#tablecon")
const addnew = document.getElementById("addnew")
const add = document.querySelector("#add")
const infors = document.getElementById("infors")
const line = document.querySelector("#line")
const home = document.getElementById("home")
const homepage= document.querySelector("#homepage")
const chuahinh = document.querySelector("#chuahinh")
const kiemtra = document.querySelector("#kiemtra")


function thoigian(){
  const date = new Date()
  let hours = date.getHours().toString().padStart(2,0)
  let mins = date.getMinutes().toString().padStart(2,0)
  let seconds = date.getSeconds().toString().padStart(2,0)
  document.getElementById("trangthai").innerHTML = `Trạng thái cửa tại : ${hours}:${mins}:${seconds}`
}




setInterval(thoigian)

nutkiemtra.onclick = function() {
  let ngaydekiemtra = ngaykiemtra.value
  
  chuahinh.style.display = "block"
  let tendekiemtra = tenkiemtra.value;
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${tendekiemtra}_${ngaydekiemtra}.jpg`); 
  const imageRef1 = storageRef.child(`images/RA_${tendekiemtra}_${ngaydekiemtra}.jpg`);  
  if (tendekiemtra === "" || tendekiemtra === null || ngaydekiemtra === "" || ngaydekiemtra === null) {
    document.getElementById('firebaseImage').src = "/images.png"; 
    document.getElementById("comat").innerHTML = "Điền Thiếu Thông Tin";
    kiemtra.style.animation = "trangthai1 1s forwards"
    kiemtra.style.height = "32rem" 
    return; 
  }
  
 
  imageRef.getDownloadURL().then((url) => {
    document.getElementById('firebaseImage').src = url;
    document.getElementById("comat").innerHTML = `Có Mặt`
    kiemtra.style.animation = "trangthai1 1s forwards"
    kiemtra.style.height = "32rem"
  }).catch((error) => {
    console.error('Error fetching image:', error);
    document.getElementById('firebaseImage').src = "/images.png";
    document.getElementById("comat").innerHTML = "Không Có Mặt"
    kiemtra.style.animation = "trangthai1 1s forwards"
    kiemtra.style.height = "32rem"
 });
 imageRef1.getDownloadURL().then((url) => {
  document.getElementById('firebaseImageRA').src = url;
  document.getElementById("xuong").innerHTML = `Xuống`
  kiemtra.style.animation = "trangthai1 1s forwards"
  kiemtra.style.height = "32rem"
}).catch((error) => {
  console.error('Error fetching image:', error);
  document.getElementById('firebaseImage').src = "/images.png";
  document.getElementById("xuong").innerHTML = "Không Có Xuống"
  kiemtra.style.animation = "trangthai1 1s forwards"
  kiemtra.style.height = "32rem"
});
}

let count = 0
let countI = 0

home.onclick = function(){
        homepage.style.display = "block"
        line.style.display = "none"
        add.style.display = "none"
        tablecon.style.display = "none"
}
addnew.onclick = function(){
        tablecon.style.display = "none"
        add.style.display = "block"
        line.style.display = "none"
        homepage.style.display = "none"
}
infors.onclick = function(){
        line.style.display = "block"
        add.style.display = "none"
        homepage.style.display = "none"
        tablecon.style.display = "none"
}
table.onclick = function(){
        line.style.display = "none"
        add.style.display = "none"
        homepage.style.display = "none"
        tablecon.style.display = "block"
}


const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const purposenho = document.querySelector("#purposenho")
const howtonho = document.querySelector("#howtonho")


let count1 = 0
button1.onclick = function(){
count1 ++
    if(count1 % 2 !== 0){
        purposenho.style.display = "block"
    }
    else if(count1 % 2 ===0){
        purposenho.style.display = "none"
    }
}
    let count2 =0
        button2.onclick = function(){
        count2 ++
    if(count2 % 2 !== 0){
        howtonho.style.display = "block"
    }
    else if(count2 % 2 ===0){
        howtonho.style.display = "none"
    }
}



database.ref("/numPresent").on("value", function(snapshot) {
  var num = snapshot.val(); 
  document.getElementById("h3trangthai").innerHTML = `Đóng và Có ${num} người đã vô`
  document.getElementById("tablenum").innerHTML = `Hiện có: ${num}`
});


database.ref("/Present").on("value", function(snapshot) {
  var kiemtra = snapshot.val();
  var displayText = "";

  if (kiemtra) {
    Object.keys(kiemtra).forEach(function(key) {
      displayText += `${key}: ${kiemtra[key]}<br>`;
    });
  } else {
    displayText = "Trên xe không có ai cả";
  }

  document.getElementById("len").innerHTML = displayText;
});

