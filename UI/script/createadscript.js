let durationElements =  document.querySelectorAll('#duration-label,#duration-inp');
// console.log(durationElements);
const displayDuration = (event)=>{
    let value = event.target.value;
    if(value==='rent'){
        durationElements.forEach((element,ind)=>{
            element.classList.remove('hide');
            durationElements[0].classList.add('label');
            durationElements[1].classList.add('input');
            durationElements[1].classList.add('full-width');
            
        })
    }else{
         durationElements.forEach((element,ind)=>{
            element.classList.add('hide');
        })
    }
}

let selectButton = document.querySelector('#adv_purp');
selectButton.addEventListener("change",displayDuration);


let uploadButton = document.querySelectorAll('.button-property');
let fileInfo = document.querySelectorAll('.file-info');
let realInput = document.querySelectorAll('.real-input');

uploadButton.forEach((button,index)=>{
    button.addEventListener('click', (e) => {
        realInput[index].click();
    });
})

realInput.forEach((realInput,ind)=>{
    realInput.addEventListener('change', () => {
        let name = realInput.value.split(/\\|\//).pop();
        let truncated = name.length > 20 
            ? name.substr(name.length - 20) 
            : name;
        
        fileInfo[ind].textContent = truncated;
    });
})
