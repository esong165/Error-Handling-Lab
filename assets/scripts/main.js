function setTextVolume(){
    document.getElementById("volume-number").value = document.getElementById("volume-slider").value;
    setVol();
}

function setSliderVolume(){
    document.getElementById("volume-slider").value = document.getElementById("volume-number").value;
    setVol();
}

function setVol(){
    let vol = document.getElementById("volume-number").value;
    let volIcon = document.getElementById("volume-image");
    if(vol == 0){
        volIcon.src = "./assets/media/icons/volume-level-0.svg";
        document.getElementById("honk-btn").disabled = true;
    }
    else if(vol <= 33){
        volIcon.src = "./assets/media/icons/volume-level-1.svg";
        document.getElementById("honk-btn").disabled = false;
    }
    else if(vol <= 66){
        volIcon.src = "./assets/media/icons/volume-level-2.svg";
        document.getElementById("honk-btn").disabled = false;
    }
    else{
        volIcon.src = "./assets/media/icons/volume-level-3.svg";
        document.getElementById("honk-btn").disabled = false;
    }
}

function setHorn(){
    let horn = document.querySelector("input[type=radio]:checked");
    let hornIcon = document.getElementById("sound-image");
    let hornSound = document.getElementById("horn-sound");
    if(horn.id == "radio-air-horn"){
        hornIcon.src = "./assets/media/images/air-horn.svg";
        hornIcon.alt = "Air Horn";
        hornSound.src = "./assets/media/audio/air-horn.mp3";
    }
    else if(horn.id == "radio-car-horn"){
        hornIcon.src = "./assets/media/images/car.svg";
        hornIcon.alt = "Car Horn";
        hornSound.src = "./assets/media/audio/car-horn.mp3";
    }
    else {
        hornIcon.src = "./assets/media/images/party-horn.svg";
        hornIcon.alt = "Party Horn";
        hornSound.src = "./assets/media/audio/party-horn.mp3";
    }
}

function playHorn(event){
    event.preventDefault();
    let audio = document.createElement("audio");
    audio.id = "horn";
    let source = document.createElement("source");
    source.src = document.getElementById("horn-sound").src;
    source.type = "audio/mpeg";
    try {
        const val = document.getElementById("volume-number").value;
        if(val < 0 || val > 100) {
            throw new InputError("Input must be between 0 and 100!");
        }
        audio.volume = document.getElementById("volume-number").value / 100;
    }
    catch (err) {
        alert('Invalid input: ' + err.message);
        console.error(err);
    }
    finally {
        console.log('Have a nice day.');
    }
    audio.appendChild(source);
    document.getElementsByTagName("main")[0].appendChild(audio);
    audio.play();
}

let volumeNum = document.getElementById("volume-number");
let volumeSlider = document.getElementById("volume-slider");
volumeNum.addEventListener("input", setSliderVolume);
//volumeNum.addEventListener("change", setSliderVolume);
volumeSlider.addEventListener("input", setTextVolume);

let horn = document.getElementById("audio-selection");
horn.addEventListener("input", setHorn);

let form = document.getElementById("party-horn-form");
form.addEventListener("submit", playHorn);

document.getElementById('log').addEventListener('click', function() {
    console.log("Current volume: " + volumeNum.value);
});

document.getElementById('error').addEventListener('click', function() {
    console.error("Current sound: " + document.getElementById("sound-image").alt);
});

document.getElementById('dir').addEventListener('click', function() {
    console.dir(document);
});

document.getElementById('dirxml').addEventListener('click', function() {
    console.dirxml(document.body);
});

document.getElementById('group').addEventListener('click', function() {
    console.group("console group demo");
});

document.getElementById('group-end').addEventListener('click', function() {
    console.groupEnd("console group demo");
});

document.getElementById('time').addEventListener('click', function() {
    console.log("Timer started!");
    console.time("console time demo");
});

document.getElementById('time-end').addEventListener('click', function() {
    console.log("Timer ended!");
    console.timeEnd("console time demo");
});

document.getElementById('table').addEventListener('click', function() {
    console.table([
        {
            name: "Volume Number",
            value: volumeNum.value,
        },
        {
            name: "Volume Slider",
            value: volumeSlider.value,
        },
    ]);
});

document.getElementById('trace').addEventListener('click', function() {
    const traceLevel3 = () => { traceLevel2(); };
    const traceLevel2 = () => { traceLevel1(); };
    const traceLevel1 = () => { console.trace(); };
    traceLevel3();
});

class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InputError";
    }
}

window.onerror = function(err) {
    console.log('Global error was thrown.');
    TrackJS.track(err);
}

document.getElementById('global-error').addEventListener('click', function() {
    console.log(ref);
});