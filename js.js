const slides = document.querySelector(".slider").children;
const prev_btn = document.querySelector(".pre");
const next_btn = document.querySelector(".next");

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


