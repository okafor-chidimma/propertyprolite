// for the slider

let slideIndex = 0;
const plusSlides = n=>{
     showSlides(slideIndex += n);
}
const showSlides = () => {
    // console.log("i am slide");
        let slides = document.querySelectorAll(".mySlides");
        // console.log(slides,slides.length);
        for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }   
    slides[slideIndex-1].style.display = "block";  
   setTimeout(showSlides, 5000); // Change image every 2 seconds
}
showSlides();
// to view a single property
const getPropertyPage = () =>{
    // console.log("hello");
    // remember to pass the id as you are declaring this
    window.location.replace("../UI/properties.html");
    
}
const getRegisterPage = () =>{
    // console.log("hello");
    // remember to pass the id as you are declaring this
    window.location.replace("../UI/register.html");
    
}
let buttonsView = document.querySelectorAll(".view");
// console.log(buttons);
buttonsView.forEach(button=>{
    // console.log(button);
    button.addEventListener("click",getPropertyPage);
})

let buttonsLinks = document.querySelectorAll(".link");
// console.log(buttons);
buttonsLinks.forEach(buttonLink=>{
    // console.log(button);
    buttonLink.addEventListener("click",getRegisterPage);
})

