const slides = document.querySelector(".slider").children;
const prev_btn = document.querySelector(".pre");
const next_btn = document.querySelector(".next");
const slideIndicator = document.querySelector(".slideIndicator");
const submenu_btn = document.querySelector(".submenu-btn");
const submenu = document.querySelector(".submenu");
const burger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const close_btn = document.querySelector(".close-btn");

// slides
let slideLength = 3; //totalno of slides
let index = 0;

prev_btn.addEventListener("click", ()=>{
    previousSlide();
    UpdateIndicatorBtns();
    resetTimer();
});

next_btn.addEventListener("click", ()=>{
    nextSlide();
    UpdateIndicatorBtns();
    resetTimer();
});

function previousSlide(){
    if(index==0){
        index =slideLength-1;
    }
    else{
        index--;
    }
    changeSlide();
}

function nextSlide(){
    if(index == slideLength-1){
        index = 0;
    }
    else{
        index++;
    }
    changeSlide();
}

function changeSlide(){
    for(let i=0; i<slideLength;i++){
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
    UpdateIndicatorBtns();
}
let autoplay_interval = setInterval(autoplay, 9000);

// slide indicators
function IndicatorBtns(){
    for(let i=0; i<3; i++){
        const div = document.createElement("div");
        div.innerHTML = i+1;
        div.setAttribute("onclick", "slideIndicatorfunc(this)");
        div.id = i;
        if(i==0){
            div.className = "active";
        }
        slideIndicator.appendChild(div);

    }
}
IndicatorBtns();

// on click to indicator btn changeSlide
function slideIndicatorfunc(ele){
    index = ele.id;
    changeSlide();
    UpdateIndicatorBtns();
    resetTimer();
}


function UpdateIndicatorBtns(){
    for(let i = 0; i< slideIndicator.children.length; i++){
        slideIndicator.children[i].classList.remove("active");
    }
    slideIndicator.children[index].classList.add("active");
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










