function hide1(){
    document.getElementById("square").style.display = "none";
}
function hide2(){    
    const element = document.getElementById('square');
        element.parentNode.removeChild(element);
}
function hide3(){
    document.getElementById("square").classList.add('hidden');
}
function hideAndShow(){
    if(document.getElementById("square").classList.contains("hidden")){
        document.getElementById("square").classList.remove('hidden');
    }else{
        document.getElementById("square").classList.add('hidden');
    }
}
function hideAndShowAll(){
    let squares = document.querySelectorAll('.square');
    for(let square of squares){
        if(square.classList.contains("hidden")){
            square.classList.remove('hidden');
        }else{
            square.classList.add('hidden');
        }
    }
}
function hideAndShowInputed(){
    let squares = document.querySelectorAll('.'+document.getElementById("selector").value);
    for(let square of squares){
        if(square.classList.contains("hidden")){
            square.classList.remove('hidden');
        }else{
            square.classList.add('hidden');
        }
    }
}
document.getElementById("yellowSquare").addEventListener("click",sayHello)
function hide(e){
    e.target
    if(e.target.classList.contains("hidden")){
        e.target.classList.remove('hidden');
    }else{
        e.target.classList.add('hidden');
    }
}
function sayHello(e){
    alert("HELLOO");
    document.getElementById("yellowSquare").removeEventListener('click',sayHello);
    document.getElementById("yellowSquare").addEventListener("click",hide)
}
const button = document.getElementById('showRedSquare-btn');

button.addEventListener('mouseover', () => {
    document.getElementById("redSquare").classList.remove('hidden');
});

button.addEventListener('mouseout', () => {
    document.getElementById("redSquare").classList.add('hidden');
});
const input = document.getElementById('selector');
input.addEventListener('focus',function(){
    document.getElementById("greenRectangle").classList.remove('hidden');
})
input.addEventListener('input',function(){
    document.getElementById("greenRectangle").classList.add('hidden');
})
function showImg(){
    let srces = document.getElementById("srcImg").value.split("\n");
    const div = document.getElementById("images")
    for (let i = 0; i < srces.length; i++) {
        let img = document.createElement('img');
        img.src = srces[i];
        div.appendChild(img);
    }
    //document.getElementById("img1").src=src;
}
const coord = document.getElementById("coord");
document.addEventListener('mousemove',function(e){
    coord.innerText = "X:"+e.clientX+" Y:"+e.clientY;
})
const lang = document.getElementById("lang");
lang.innerText = "lang= "+navigator.language;
// const pos = document.getElementById("pos");
// navigator.geolocation.getCurrentPosition(function(possition){
//     pos.innerText = "Ш: "+possition.coords.latitude+" Д:"+possition.coords.longitude;
// })



let choosenInput = null;
let inputs = document.querySelectorAll('.input');
for(let input of inputs){
    input.addEventListener('click',function(){
        choosenInput = input;
        document.querySelector('.choosen')?.classList.remove("choosen");
        choosenInput.classList.add("choosen");
    })
}


document.getElementById("input1").innerText = localStorage.getItem('info');
document.getElementById("input2").innerText = getCookie('info');
document.getElementById("input3").innerText = sessionStorage.getItem('info');
document.addEventListener('keypress',function(e){
    console.log(choosenInput+" "+document.getElementById("input2"))
    if(choosenInput===document.getElementById("input1")){
        choosenInput.innerText+=e.key;
        localStorage.setItem('info', choosenInput.innerText);
    }else
    if(choosenInput===document.getElementById("input2")){
        choosenInput.innerText+=e.key;
        setCookie('info', choosenInput.innerText, 7);
    }else
    if(choosenInput===document.getElementById("input3")){
        choosenInput.innerText+=e.key;
        sessionStorage.setItem('info', choosenInput.innerText);
    }
})


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



window.addEventListener('scroll', function(e){
    if(this.window.scrollY === 0){
        this.document.getElementById("up").classList.add("hidden");
    }else{
        this.document.getElementById("up").classList.remove("hidden");
    }
});
document.getElementById("up").addEventListener("click",function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.document.getElementById("up").classList.add("hidden");
})


document.querySelector(".bigDiv").addEventListener("click",function(){
    alert("big");
})
document.querySelector(".smallDiv").addEventListener("click",function(e){
    e.stopPropagation();
    alert("small");
})
function showOverlay(){
    document.getElementById("overlay").classList.add("overlay");
    document.body.style.overflow = 'hidden';
}
document.getElementById("overlay").addEventListener("click",function(e){
    e.target.classList.remove("overlay");
    document.body.style.overflow = 'auto';
})
document.getElementById("GO").addEventListener("click",function(e){
    e.preventDefault();
})



document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const dropZoneText = document.getElementById('dropZoneText');

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.classList.remove('dragover');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            dropZoneText.textContent = `Вибрано файл: ${files[0].name}`;
            dropZone.classList.add('file-selected');
        }
    }
});