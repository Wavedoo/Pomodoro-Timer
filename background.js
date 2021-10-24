const states = {STUDYING: 'studying', ONBREAK: 'onBreak', NOTWORKING: 'notWorking'};
var state = states.NOTWORKING;

chrome.runtime.onMessage.addListener(function(message) {
    if(message.extension == "opened"){
        chrome.runtime.sendMessage(state);
        //Too lazy to add time display rn
        //chrome.runtime.sendMessage({time: minutes + "m " + seconds + "s"});
    } else if(message.function == "clickedButton"){
        clickedButton();
    } else if (message.function == "reset"){
        reset();
    }
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("Got an alarm!", alarm);
    if(alarm.name == "Studying"){
        chrome.alarms.clearAll();
        state = states.ONBREAK;
        chrome.notifications.create(
            "TakeABreak",
            {
                type: 'basic',
                iconUrl: 'random128.png',
                title: "Take A Break!",
                message: "Great job studying!"
            }
        );
        chrome.alarms.create("OnBreak", {delayInMinutes: 1});
    }else if(alarm.name == "OnBreak"){
        chrome.alarms.clearAll();
        state = states.STUDYING;
        chrome.notifications.create(
            "BackToStudying",
            {
                type: 'basic',
                iconUrl: 'random128.png',
                title: "Back To Studying!!",
                message: "Let's get back to work!"
            }
        );
        chrome.alarms.create("Studying", {delayInMinutes: 2});
    }
});

function clickedButton() {
    chrome.alarms.create("Studying", {delayInMinutes: 2});
    state = states.STUDYING;
}


function reset(){
    chrome.alarms.clearAll();
    state = states.NOTWORKING;
}
