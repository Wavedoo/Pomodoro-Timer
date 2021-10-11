var minutes = 1;
var seconds = 0;
const states = {PAUSED: 'paused', STUDYING: 'studying', ONBREAK: 'onBreak', NOTWORKING: 'notWorking'};
var state = states.NOTWORKING;

chrome.runtime.onMessage.addListener(function(message) {
  if(message.extension == "opened"){
    chrome.runtime.sendMessage(state);
    chrome.runtime.sendMessage({time: minutes + "m " + seconds + "s"});
  } else if(message.function == "clickedButton"){
      clickedButton();
  } else if (message.function == "reset"){
      reset();
  }

});

function clickedButton() {
  countDown();
  if(state == states.NOTWORKING || state == states.ONBREAK || state == states.PAUSED){
      state = states.STUDYING;
  }else if(state = states.STUDYING){
      states = states.PAUSED;
  }
}

function countDown(){
  var timer = setInterval(function(){
      if(state == states.STUDYING){
          if(seconds == 0 ){
              seconds = 59;
              if(minutes == 0){
                  BreakTime();
              }else{
                  minutes -= 1;
              }
          }else{
              seconds -= 1;
          }
      } else if(state == states.ONBREAK){
          if(seconds == 59){
              seconds = 0;
              minutes +=1;
              if(minutes == 4){
                  BreakOverAlert();
              }else if(minutes == 5){
                  LongBreakAlert();
              }
          }else{
              seconds += 1;
          }
      } else if(state == states.PAUSED || state == states.NOTWORKING){
          clearInterval(timer);
      }
      let timerText = minutes + "m " + seconds + "s";
      chrome.runtime.sendMessage({time: timerText});
  },1000);
}

function reset(){
    minutes = 25;
    seconds = 0;
}

function BreakTime(){
    state = states.ONBREAK;
    minutes = 5;
    seconds = 0;
}

function breakNotification(){
    chrome.notifications.create(
        "TakeABreak",
        {
            title: "Take A Break!",
            message: "Great job studying!"
        }
    );
}