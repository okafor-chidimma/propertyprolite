// to view a single property
const getPropertyPage = () =>{
    // console.log("hello");
    window.location.replace("./property.html");
    
}
let buttons = document.querySelectorAll(".button-property");
// console.log(buttons);
buttons.forEach(button=>{
    // console.log(button);
    button.addEventListener("click",getPropertyPage);
})