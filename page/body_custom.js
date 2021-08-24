var sound = new Audio("../sound/timer_sound.mp3");
sound.loop = true;
/*var sound_silent = new Audio("../sound/silence_64kb.mp3");
sound_silent.loop = true;
sound_silent.muted = "true";
sound_silent.play();*/
var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var start_wm = 0;
var start_ws = 0;
var yo_break = true;
var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');

//store a reference to a timer variable
var startTimer;
if (start){
    start.addEventListener('click', function(){
        if(startTimer === undefined){
            startTimer = setInterval(timer, 1000)
        } else {
            alert("Timer is already running");
        }
    })
}

if (reset){
    reset.addEventListener('click', function(){
        wm.innerText = 25;
        ws.innerText = "00";

        bm.innerText = 5;
        bs.innerText = "00";

        document.getElementById('counter').innerText = 0;
        stopInterval()
        startTimer = undefined;
    })
}

if (stop){
    stop.addEventListener('click', function(){
        stopInterval()
        startTimer = undefined;
    })
}

//Start Timer Function
function timer(){
    //Work Timer Countdown
    if(ws.innerText != 0){
        ws.innerText--;
    } else if(wm.innerText != 0 && ws.innerText == 0){
        ws.innerText = 59;
        wm.innerText--;
    }

    //Break Timer Countdown
    if(wm.innerText == 0 && ws.innerText == 0){
        if(bs.innerText != 0){
            bs.innerText--;
        } else if(bm.innerText != 0 && bs.innerText == 0){
            bs.innerText = 59;
            bm.innerText--;
        }
        if (yo_break){
            sound.play();
            alert("Yo take break!");
            sound.pause();
            yo_break = false;
        }
    }

    //Increment Counter by one if one full cycle is completed
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
        wm.innerText = 25;
        ws.innerText = "00";

        document.getElementById('counter').innerText++;
        if(document.getElementById('counter').innerText % 4 == 0){
            bm.innerText = 15;
            bs.innerText = "00";
        }
        else{
            bm.innerText = 5;
            bs.innerText = "00";
        }
        yo_break = true;
    }
}

//Stop Timer Function
function stopInterval(){
    clearInterval(startTimer);
}