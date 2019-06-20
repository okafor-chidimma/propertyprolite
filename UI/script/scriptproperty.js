let checkbox = document.querySelector("input[type='checkbox']");
let divFraud = document.querySelector("#fraud_div");
// let map = document.querySelector("#myMap");
const displayFraudDiv=(obj)=>{
    let value =  event.target.value;
    // console.log(value);
    if(value==="0"){
        console.log(value);
        let checkyy = checkbox.getAttribute("checked");
        console.log(checkyy,"checkyyy");
        if(confirm("Are you sure you want to mark this property as fraudlent?")){
            checkbox.checked=true; 
            // map.classList.remove("hide");
            divFraud.classList.remove("hide");
            divFraud.classList.add("flex");
            checkbox.setAttribute("value","1"); 
            
        }else{
           checkbox.checked=false;     
        }
        
    }else{
        checkbox.checked=false;      
        divFraud.classList.remove("flex");
        divFraud.classList.add("hide");
        // map.classList.add("hide");
        checkbox.setAttribute("value","0"); 
        
    }
}

checkbox.addEventListener("click",displayFraudDiv);

