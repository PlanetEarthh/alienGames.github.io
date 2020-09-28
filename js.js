const slides = document.querySelector(".slider").children;
const prev_btn = document.querySelector(".pre");
const next_btn = document.querySelector(".next");
const submenu_btn = document.querySelector(".submenu-btn");
const submenu = document.querySelector(".submenu");
const burger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const close_btn = document.querySelector(".close-btn");


// slides
let index = 0;

prev_btn.addEventListener("click", ()=>{
    previousSlide();
});

next_btn.addEventListener("click", ()=>{
    nextSlide();
});

function previousSlide(){
    if(index==0){
        index =slides.length-1;
    }
    else{
        index--;
    }
    changeSlide();
}

function nextSlide(){
    if(index == slides.length-1){
        index = 0;
    }
    else{
        index++;
    }
    changeSlide();
}

function changeSlide(){
    for(let i=0; i<slides.length;i++){
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");
}



// Submenu
submenu_btn.addEventListener("click", ()=>{
    submenu.classList.toggle("showSubmenu");

    let anywhere = document.querySelectorAll(".slide");
    let i = 0;
    while(i < anywhere.length)
    {
        anywhere[i].addEventListener("click", ()=>{
            submenu.classList.remove("showSubmenu");
        });
        i++;
    }
});


// sidebar
burger.addEventListener("click",() =>{
    sidebar.classList.toggle("show-sidebar");

    let anywhere = document.querySelectorAll(".slide");
    let i = 0;
    while(i < anywhere.length)
    {
        anywhere[i].addEventListener("click", ()=>{
            sidebar.classList.remove("show-sidebar");
        });
        i++;
    }

});

close_btn.addEventListener("click", ()=>{
    sidebar.classList.remove("show-sidebar");
});

