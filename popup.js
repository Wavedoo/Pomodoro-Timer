var mainButton = document.getElementById("MainButton");
var resetButton = document.getElementById("reset");
var time = document.getElementById("time");
var minutes = 2;
var seconds = 0;
var onBreak = false;
var paused = false; //YOu know for like keeping track of which state it is in.
var currentState = document.getElementById("CurrentState");
//var port = chrome.runtime.connect({name: "timer"});

const states = {PAUSED: 'paused', STUDYING: 'studying', ONBREAK: 'onBreak', NOTWORKING: 'notWorking'}
var state = states.NOTWORKING;

chrome.runtime.sendMessage({extension: "opened"});
    chrome.runtime.onMessage.addListener(function(message) {
        //Gets state of crap
        if(message.state == states.STUDYING){
            state = states.STUDYING;
            mainButton.innerHTML = "Pause timer";
            currentState.innerHTML = "Good luck studying!"
            currentState.style.color = "black";
            time.style.color = "black";
        }else if(message.state == states.PAUSED){
            state = state.PAUSED;
            mainButton.innerHTML = "Continue Timer";
            currentState.innerHTML = "Paused.";
        }else if(message.state == states.ONBREAK){
            state = state.ONBREAK;
            mainButton.innerHTML = "Break time!";
            currentState.innerHTML = "Continue Timer";
        }else if(message.state == states.NOTWORKING){
            state = states.NOTWORKING;
            mainButton.innerHTML = "Not working!";
            currentState.innerHTML = "Start Timer";
        }else if(message.time != null){
            time.innerHTML = message.time;
        }else if(message.function == "breakOver"){
            BreakOverAlert();
        }else if(message.function == "longBreak"){
            LongBreakAlert();
        }
    });
    
mainButton.onclick = function() {
    chrome.runtime.sendMessage({function: "clickedButton"});
}

resetButton.onclick = function() {
    state = states.NOTWORKING;
    currentState.innerHTML = "Not studying";
    currentState.style.color = "black";
    chrome.runtime.sendMessage({function: "reset"});
}


function BreakOverAlert(){
    currentState.innerHTML = "Your break is over"

}
function LongBreakAlert(){
    currentState.innerHTML = "Your break is going a little long."
    currentState.style.color = "red";
    time.style.color = "red";
}
