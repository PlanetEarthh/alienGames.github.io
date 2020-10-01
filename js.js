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
    resetTimer();
});

next_btn.addEventListener("click", ()=>{
    nextSlide();
    resetTimer();
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

// auto play slides
function resetTimer(){
    clearInterval(autoplay_interval);
    autoplay_interval = setInterval(autoplay, 9000);
}

function autoplay(){
    nextSlide();
}

let autoplay_interval = setInterval(autoplay, 9000);


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


// search bar script

function myFunction()
{
    let input, filter, ul, li, a, i, txtValue, search_results;

    input = document.querySelector('.search-txt');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }

    // showing search results with javascript
    search_results = document.querySelector(".search-result");
    search_results.style.display = "block";

    search_results.addEventListener("mouseleave", ()=>{
        search_results.style.display = "none";
    });

    if(input.value != ""){
        search_results.style.display = "block";
    }
    else{
        search_results.style.display = "none";
    }

    let anywhere = document.querySelectorAll(".slide");
    anywhere.forEach(item => {
        item.addEventListener("mouseenter", ()=>{
            search_results.style.display = "none";
        });
    });
}










