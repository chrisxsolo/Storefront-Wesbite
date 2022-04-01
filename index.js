//Initializing and delaring variables 
var modal = document.querySelector('.modal-1');
var previews = document.querySelectorAll(".index-image");
var original = document.querySelector(".full-image");

//A for each that creates a function for all the individual images
previews.forEach(function(preview){
    //When clicked on an image in the gallery it will execute what is in the function 
    preview.addEventListener("click", function(){
        //displays the skeleton of the modal 
        modal.classList.add("open");
        // Displays the animation and styles of the full res image
         original.classList.add("open");
        //initializing and declaring the source of the images 
        var originalSource= preview.getAttribute("data");
        //Returns the individual images tag 
        original.src = originalSource;
    });
});

//A function that executes when the modal is clicked
modal.addEventListener("click", function(e){
    //if what is clicked is a modal(target) it will close the modal and the image
    if(e.target.classList.contains("modal-1")){
        modal.classList.remove("open");
        original.classList.remove("open");
    }
});

//Login-Register Form Variables
                var x = document.getElementById("login");
                var y = document.getElementById("register");
                var z = document.getElementById("btn");
                //Register Function
                function register(){
                    x.style.left = "-400px";
                    y.style.left = "50px"
                    z.style.left= "110px";
                }
                //Login Function
                function login(){
                    x.style.left = "50px";
                    y.style.left = "450px"
                    z.style.left= "0";
                }
