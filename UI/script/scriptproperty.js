let checkbox = document.querySelector("input[type='checkbox']");
let divFraud = document.querySelector("#fraud_div");
let map = document.querySelector("#myMap");
const displayFraudDiv=(obj)=>{
    let value =  event.target.value;
    console.log(value);
    if(value==="0"){
        console.log(value);
        let checkyy = checkbox.getAttribute("checked");
        console.log(checkyy,"checkyyy");
        if(confirm("Are you sure you want to mark this property as fraudlent?")){
            checkbox.checked=true; 
            map.classList.remove("hide");
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
        map.classList.add("hide");
        checkbox.setAttribute("value","0"); 
        
    }
}

checkbox.addEventListener("click",displayFraudDiv);

// for the google map

function initMap() {
         
    var map = new google.maps.Map(document.getElementById("myMap"), {
    center: new google.maps.LatLng(42.3601,-71.0589),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, "load", function () {
    var infoWindow = new google.maps.InfoWindow();
    function createMarker(options, html) {
        var marker = new google.maps.Marker(options);
        if (html) {
        google.maps.event.addListener(marker, "click", function () {
            infoWindow.setContent(html);
            infoWindow.open(options.map, this);
        });
        }
        return marker;
    }

    var newMarker = createMarker({
        position: new google.maps.LatLng(42.3601,-71.0589),
        map: map,
        }, "<h1>Location</h1><p>This is the red flag location </p>");
 });

    // listen for the window resize event & trigger Google Maps to update too
    window.onresize = function() {
    var currCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
    };
}
        