const viedo_player = document.querySelector('#viedo_player'),
mainViedo = viedo_player.querySelector('#main-viedo'),
progressAreaTime = viedo_player.querySelector('.progressAreaTime'),
controls = viedo_player.querySelector('.controls'),
progressArea = viedo_player.querySelector('.progress-area'),
progress_Bar = viedo_player.querySelector('.progress-bar'),
fast_rewind = viedo_player.querySelector('.fast-rewind'),
play_btn = viedo_player.querySelector('.play_arrow'),
fast_forward = viedo_player.querySelector('.fast-forward'),
volume = viedo_player.querySelector('.volume'),
volume_range = viedo_player.querySelector('#volume_range'),
current = viedo_player.querySelector('.current'),
totalDuration = viedo_player.querySelector('.duration'),
auto_play = viedo_player.querySelector('.auto-play'),
settingsBtn = viedo_player.querySelector('.settingsBtn'),
picture_in_picture_alt = viedo_player.querySelector('.picture_in_picture_alt'),
fullscreen = viedo_player.querySelector('.fullscreen'),
settings = viedo_player.querySelector('#settings'),
playback = viedo_player.querySelectorAll('.playback li');

// Play Viedo
const playViedo = () => {
    mainViedo.play();
    play_btn.classList.remove("play_arrow");
    play_btn.classList.add("pause");
    play_btn.innerHTML = "pause";
    viedo_player.classList.add("paused");
}

// Pause Viedo
const pauseViedo = () => {
    mainViedo.pause();
    play_btn.classList.remove("pause");
    play_btn.classList.add("play_arrow");
    play_btn.innerHTML = "play_arrow";
    viedo_player.classList.remove("paused");
}

// toggle Functions for Play and Pause
play_btn.addEventListener("click", () => {
    const isViedoPaused = viedo_player.classList.contains("paused");
    isViedoPaused ? pauseViedo() : playViedo()
});

// Play video on click the video element
mainViedo.addEventListener("click", () => {
    const isViedoPaused = viedo_player.classList.contains("paused");
    isViedoPaused ? pauseViedo() : playViedo()
});

// fast rewind the viedo
fast_rewind.addEventListener("click", () => {
    mainViedo.currentTime -= 10;
});

// fast forward the viedo
fast_forward.addEventListener("click", () => {
    mainViedo.currentTime += 10;
});

// Viedo Duration
mainViedo.addEventListener("loadeddata", (e) => {
    let ViedoDuration = e.target.duration;
    let totalHour = Math.floor(ViedoDuration / 3600);
    let totalMin = Math.floor(ViedoDuration / 60);
    let totalSec = Math.floor(ViedoDuration % 60);

    // if seconds are less than 0
    totalHour < 1 ? totalHour = "0" + totalHour : totalHour;
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
    totalDuration.innerHTML = `${totalHour}:${totalMin}:${totalSec}`
});

// Current Duration
mainViedo.addEventListener("timeupdate", (e) => {
    let currentDurationTime = e.target.currentTime;
    let currentHour = Math.floor(currentDurationTime / 3600);
    let currentMin = Math.floor(currentDurationTime / 60);
    let currentSec = Math.floor(currentDurationTime % 60);
    currentHour < 1 ? currentHour = "0" + currentHour : currentHour;
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let currentViedoDration = e.target.duration;
    // progressbar 
    let progressWidth = (currentDurationTime / currentViedoDration) * 100;
    progress_Bar.style.width = `${progressWidth}%`
});

progressArea.addEventListener("click", (e) => {
    let ViedoDuration = mainViedo.duration;
    let progressWidthval = progressArea.clientWidth;
    let ClickOffsetX = e.offsetX;
    mainViedo.currentTime = (ClickOffsetX / progressWidthval) * ViedoDuration;
})

// change Volume
const changeVolume = () => {
    mainViedo.volume = volume_range.value / 100;
    if(volume_range.value == 0){
        volume.innerHTML = "volume_off"
    }else if(volume_range.value < 40){
        volume.innerHTML = "volume_down"
    }else{
        volume.innerHTML = "volume_up"
    }
}

// Mute Viedo
const muteVolume = () => {
    if(volume_range.value == 0){
        volume.innerHTML = "volume_up"
        volume_range.value = 85;
        mainViedo.volume = volume_range.value / 100;
    }else{
        volume.innerHTML = "volume_off"
        volume_range.value = 0;
        mainViedo.volume = 0;
    }
    
}

volume_range.addEventListener("change",() => {
    changeVolume();
});

volume.addEventListener("click", () => {
    muteVolume();
});

// ToolTip on hover the progressbar shows the timer
progressArea.addEventListener("mousemove", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let x = e.offsetX;
    progressAreaTime.style.setProperty('--x',`${x}px`);
    progressAreaTime.style.display = "block";
    let viedoDuration = mainViedo.duration;
    let progressTime = Math.floor((x/progressWidthval) * viedoDuration);
    let currentHour = Math.floor(progressTime / 3600);
    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);
    currentHour < 1 ? currentHour = "0" + currentHour : currentHour;
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
    progressAreaTime.innerHTML = `${currentHour}:${currentMin}:${currentSec}`
}); 

progressArea.addEventListener("mouseleave", () => {
    progressAreaTime.style.display = "none"
})

// Auto Play
auto_play.addEventListener("click", () => {
    auto_play.classList.toggle('active');
    if(auto_play.classList.contains('active')){
        auto_play.title = "Autoplay is on";
    }else{
        auto_play.title = "Autoplay is off";
    }
});

// Replay
mainViedo.addEventListener("ended",() => {
    if(auto_play.classList.contains('active')){
        playViedo();
    }else{
        play_btn.innerHTML = "replay";
    }
});

// Picture in Picture
picture_in_picture_alt.addEventListener("click",() => {
    mainViedo.requestPictureInPicture()
});

// Full Screen
fullscreen.addEventListener('click', () => {
    if(!viedo_player.classList.contains('openFullScreen')){
        viedo_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        viedo_player.requestFullscreen();
    }else{
        viedo_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();
    }
});

// open settings
settingsBtn.addEventListener("click", () => {
    settings.classList.toggle('active');
    settingsBtn.classList.toggle('active');
});

// Playback speed Rate
playback.forEach((event) => {
    event.addEventListener('click', () => {
        removeActiveClasses();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        mainViedo.playbackRate = speed;
    })
});

function removeActiveClasses(){
    playback.forEach(event => {
        event.classList.remove('active')
    })
}

//  Hide controls 
viedo_player.addEventListener('mouseover', () => {
    controls.classList.add('active');
});

viedo_player.addEventListener('mouseleave', () => {
    if(viedo_player.classList.contains('paused')){
        if(settingsBtn.classList.contains('active')){
            controls.classList.add('active');
        }else{
            controls.classList.remove('active');
        }
    }else{
        controls.classList.add('active');
    }
});

if(viedo_player.classList.contains('paused')){
    if(settingsBtn.classList.contains('active')){
        controls.classList.add('active');
    }else{
        controls.classList.remove('active');
    }
}else{
    controls.classList.add('active');
}