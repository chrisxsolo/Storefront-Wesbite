var content1 = document.getElementById("content1");
var content2 = document.getElementById("content2");
var content3 = document.getElementById("content3");
var button1 = document.getElementById("button-1");
var button2 = document.getElementById("button-2");
var button3 = document.getElementById("button-3");

function openAbout(){
    content1.style.transform = "translateX(0)";
    content2.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(100%)";
    button1.style.color ="darkgoldenrod";
    button2.style.color="black";
    button3.style.color="black";
    content1.style.transitionDelay="0.1s";
    content2.style.transitionDelay="0s";
    content3.style.transitionDelay="0s";

}

function openAwards(){
    content1.style.transform = "translateX(100%)";
    content2.style.transform = "translateX(0)";
    content3.style.transform = "translateX(100%)";
    button1.style.color ="black";
    button2.style.color="darkgoldenrod";
    button3.style.color="black";
    content1.style.transitionDelay="0s";
    content2.style.transitionDelay="0.1s";
    content3.style.transitionDelay="0s";
}

function openDonate(){
    content1.style.transform = "translateX(100%)";
    content2.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(0)";
    button1.style.color ="black";
    button2.style.color="black";
    button3.style.color="darkgoldenrod";
    content1.style.transitionDelay="0s";
    content2.style.transitionDelay="0s";
    content3.style.transitionDelay="0.1s";
}