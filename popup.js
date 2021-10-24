var mainButton = document.getElementById("MainButton");
var resetButton = document.getElementById("reset");
var time = document.getElementById("time");
var currentState = document.getElementById("CurrentState");
var endTime;
//var port = chrome.runtime.connect({name: "timer"});

const states = {STUDYING: 'studying', ONBREAK: 'onBreak', NOTWORKING: 'notWorking'}
var state = states.NOTWORKING;

chrome.runtime.sendMessage({extension: "opened"});
    chrome.runtime.onMessage.addListener(function(message) {
        //Fixes: Fixed comments from last time not being helpful
        
        if(message == states.STUDYING){
            state = states.STUDYING;
            mainButton.innerHTML = "No Touchy Timer";
            currentState.innerHTML = "Good luck studying!"
            currentState.style.color = "black";
            time.style.color = "black";
            mainButton.disabled = true;
        }else if(message == states.ONBREAK){
            state = state.ONBREAK;
            mainButton.innerHTML = "Break time!";
            currentState.innerHTML = "No Touchy Timer";
            mainButton.disabled = true;
        }else if(message == states.NOTWORKING){
            state = states.NOTWORKING;
            mainButton.innerHTML = "Not working!";
            currentState.innerHTML = "Start Timer";
        }/*else if(message.time != null){
            endTime = message.time;
        }*/
    });
    
mainButton.onclick = function() {
    chrome.runtime.sendMessage({function: "clickedButton"});
    state = states.STUDYING;
    mainButton.innerHTML = "No Touchy Timer";
    currentState.innerHTML = "Good luck studying!"
    currentState.style.color = "black";
    time.style.color = "black";
    mainButton.disabled = true;
}

resetButton.onclick = function() {
    state = states.NOTWORKING;
    currentState.innerHTML = "Not studying";
    currentState.style.color = "black";
    mainButton.disabled = false;
    chrome.runtime.sendMessage({function: "reset"});
}