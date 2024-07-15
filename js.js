let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
let savedTime = 0;

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    startTime = 0;
    running = false;
    lapCount = 0;
    startStopButton.textContent = 'Start';
    display.textContent = '00:00:00.0';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    display.textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' + 
        milliseconds;
}
