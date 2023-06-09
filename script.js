
const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ['Sea', 'Breathe', 'Green', 'Summer'];

// Keep Track of songs
let songIndex = 3;

// Initail Load Song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `./Music/${song}.mp3`
    cover.src = `./Images/${song}.jpg`
}

// Play Song
function playSong() {
musicContainer.classList.add('play');
playBtn.querySelector('i.fas').classList.remove('fa-play');
playBtn.querySelector('i.fas').classList.add('fa-pause');

audio.play();
}

// Pause Song
function pauseSong() {
musicContainer.classList.remove('play');
playBtn.querySelector('i.fas').classList.remove('fa-pause');
playBtn.querySelector('i.fas').classList.add('fa-play');

audio.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress
function updateProgress(e) {
   const {duration, currentTime} = e.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
}

// Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong()
    }
    else {
        playSong();
    }
})

// Change Song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Progress Event
audio.addEventListener('timeupdate', updateProgress);

// Progress Set
progressContainer.addEventListener('click', setProgress);

// Audio Loop
audio.addEventListener('ended', nextSong);