let audio = new Audio();
const tracks = [
    "sons/Whispers of the Wanderer.mp3", // Track 1
    "sons/Whispers of the Ancient Plains.mp3", // Track 2
    "sons/Waves of Fortune.mp3", // Track 3
    "sons/Gats.mp3" // Track 4
];
let currentTrackIndex = 0;

// Load saved state from localStorage
function loadMusicState() {
    const savedTrackIndex = localStorage.getItem("currentTrackIndex");
    const savedVolume = localStorage.getItem("volume");
    const savedMuted = localStorage.getItem("muted");
    const savedPaused = localStorage.getItem("paused");

    if (savedTrackIndex !== null) {
        currentTrackIndex = parseInt(savedTrackIndex, 10);
        audio.src = tracks[currentTrackIndex];
    } else {
        audio.src = tracks[currentTrackIndex]; // Default track
    }

    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        document.getElementById("volumeSlider").value = audio.volume;
    }

    if (savedMuted !== null) {
        audio.muted = savedMuted === "true";
        document.getElementById("muteButton").textContent = audio.muted ? "🔊" : "🔇";
    }

    // Automatically play or pause based on the saved state
    if (savedPaused === "true") {
        audio.pause();
        document.getElementById("playPauseButton").textContent = "▶️";
    } else {
        audio.play();
        document.getElementById("playPauseButton").textContent = "⏸️";
    }

    // Save the initial state in case it's not already saved
    saveMusicState();
}

// Initialize audio
audio.loop = true; // Loop the audio
loadMusicState(); // Load saved state

// Save current state to localStorage
function saveMusicState() {
    localStorage.setItem("currentTrackIndex", currentTrackIndex);
    localStorage.setItem("volume", audio.volume);
    localStorage.setItem("muted", audio.muted);
    localStorage.setItem("paused", audio.paused);
}

// Initialize audio
audio.loop = true; // Loop the audio
loadMusicState(); // Load saved state

// Event listeners to save state on changes
audio.addEventListener("play", saveMusicState);
audio.addEventListener("pause", saveMusicState);
audio.addEventListener("volumechange", saveMusicState);

function toggleMute() {
    audio.muted = !audio.muted;
    document.getElementById("muteButton").textContent = audio.muted ? "🔊" : "🔇";
    saveMusicState();
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById("playPauseButton").textContent = "⏸️";
    } else {
        audio.pause();
        document.getElementById("playPauseButton").textContent = "▶️";
    }
    saveMusicState();
}

function changeTrack() {
    const selectedTrack = document.getElementById("musicSelector").value;
    currentTrackIndex = tracks.indexOf(selectedTrack);
    if (currentTrackIndex !== -1) {
        audio.pause(); // Stop the current track
        audio.src = tracks[currentTrackIndex]; // Set the new track
        audio.play(); // Play the new track
        document.getElementById("playPauseButton").textContent = "⏸️"; // Update button
        saveMusicState();
    }
}

function changeVolume() {
    const volume = document.getElementById("volumeSlider").value;
    audio.volume = volume;
    saveMusicState();
}

function enableAudioPlayback() {
    // Vérifie si l'audio est en pause et le démarre
    if (audio.paused) {
        audio.play().then(() => {
            document.getElementById("playPauseButton").textContent = "⏸️";
        }).catch((error) => {
            console.error("Erreur lors de la lecture automatique :", error);
        });
    }

    // Supprime l'écouteur après la première interaction
    document.removeEventListener("click", enableAudioPlayback);
    document.removeEventListener("touchstart", enableAudioPlayback);
}

// Ajoute un écouteur pour démarrer la musique dès la première interaction utilisateur
document.addEventListener("click", enableAudioPlayback);
document.addEventListener("touchstart", enableAudioPlayback);

// Initialize audio
audio.loop = true; // Loop the audio
loadMusicState(); // Load saved state