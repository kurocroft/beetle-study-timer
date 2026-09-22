
// sets base starting values -- will change once we can edit this.
let startingHours = 0;
let startingMinutes = 0;
let startingSeconds = 0;
let time = 0;

// interval control
const countdownElem = document.getElementById('countdown');
var start;

// button trackers
var started = false;
var paused = false;

const startbtn = document.getElementById('startbtn');
const pausebtn = document.getElementById("pausebtn");
const cancelbtn = document.getElementById("cancelbtn");
const continuebtn = document.getElementById("continuebtn");

const presets = document.getElementById('presets'); 

// event listeners
document.getElementById("startbtn").addEventListener('click', () => {
    startTimer()
})
document.getElementById("pausebtn").addEventListener('click', () => {
    pauseTimer()
})
document.getElementById("cancelbtn").addEventListener('click', () => {
    cancelTimer()
})
document.getElementById("continuebtn").addEventListener('click', () => {
    continueTimer()
})


// preset times
document.getElementById("quickSearch").addEventListener('click', () => {
    quickSearch()
})
document.getElementById("mediumSearch").addEventListener('click', () => {
    mediumSearch()
})
document.getElementById("longerSearch").addEventListener('click', () => {
    longerSearch()
})


//onclick event functions
function startTimer() {
    if (startingHours==0 && startingMinutes==0 && startingSeconds==0) {
        alert("cannot countdown to nothing brochacho");
    } else {
        calcTime(startingHours, startingMinutes, startingSeconds)
        start = setInterval(updateCountdown, 1000);
        started = true;
        btnDisplay();
    }
}

function pauseTimer() {
    clearInterval(start);
    paused = true;
    btnDisplay();
}

function cancelTimer() {
    startingHours = 0;
    startingMinutes = 0;
    startingSeconds = 0;
    displayCountdown(startingHours, startingMinutes, startingSeconds);

    started = false;
    paused = false;
    btnDisplay();
}

function continueTimer() {
    start = setInterval(updateCountdown, 1000);
    paused = false;
    btnDisplay();
}

function quickSearch() {
    startingHours = 0;
    startingMinutes = 0;
    startingSeconds = 5;
    displayCountdown(startingHours, startingMinutes, startingSeconds);
}


function mediumSearch() {
       startingHours = 1;
        startingMinutes = 0;
        startingSeconds = 0;
        displayCountdown(startingHours, startingMinutes, startingSeconds);
}

function longerSearch() {
        startingHours = 1;
        startingMinutes = 30;
        startingSeconds = 0;
        displayCountdown(startingHours, startingMinutes, startingSeconds);
}

// calculate the total time (once time has been set) -- function called before timer started.
function calcTime(hr, min, sec) {
    // we minus 1 so there is no initial delay
    time = ((min * 60) + (hr * 3600) + sec) - 1;
}

// sorts out the display of singular digits (helper function for displayCountdown)
function displayDigitsCorrect(comp) {
    comp = comp < 10 ? '0' + comp : comp
    return comp;
}

//this function is called either by the setup for the timer or the update of the timer
function displayCountdown(hr, min, sec) {
    min = displayDigitsCorrect(min);
    sec = displayDigitsCorrect(sec);
    countdownElem.innerHTML = `${hr}:${min}:${sec}`;
}

// when a button is pressed, controls what is hidden and what is visible
function btnDisplay() {
    if (started) {
        if (paused) {
            // started + paused
            startbtn.style.display="none";
            pausebtn.style.display="none";
            cancelbtn.style.display="inline";
            continuebtn.style.display="inline";
            presets.style.visibility="hidde ";
        } else {
            // started + not paused
            startbtn.style.display="none";
            pausebtn.style.display="inline";
            cancelbtn.style.display="none";
            continuebtn.style.display="none";
            presets.style.visibility="hidden";
        }
    } else {
            // not started not paused (default)
            startbtn.style.display="inline";
            pausebtn.style.display="none";
            cancelbtn.style.display="none";
            continuebtn.style.display="none";
            presets.style.visibility="visible";
    }
}




// update Countdown (intervals)
function updateCountdown() {
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time/60) % 60);
    // seconds are the modulus of time % 60.
    let seconds = time % 60;

    //makes it display not weird
    displayCountdown(hours, minutes, seconds);

    if (time < 0) {
        alert("TIMER FINISHED!");
        pauseTimer();
        cancelTimer();
    }

    time--;
}

