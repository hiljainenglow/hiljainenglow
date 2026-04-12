// Soittimen toiminnallisuus
document.addEventListener('DOMContentLoaded', function() {
    const trackItems = document.querySelectorAll('.track-item');
    let currentlyPlaying = null;
    let currentButton = null;
    const nowPlayingDiv = document.querySelector('.now-playing');
    const nowPlayingText = document.querySelector('.now-playing-text');

    trackItems.forEach(item => {
        const audio = item.querySelector('.track-audio');
        const playBtn = item.querySelector('.play-btn');
        const playIcon = playBtn.querySelector('.play-icon');
        const pauseIcon = playBtn.querySelector('.pause-icon');
        const trackTitle = item.querySelector('.track-title').textContent;

        // Lataa metadata (kesto)
        audio.addEventListener('loadedmetadata', function() {
            const duration = formatTime(audio.duration);
            const durationSpan = item.querySelector('.track-duration');
            if (durationSpan && audio.duration) {
                durationSpan.textContent = duration;
            }
        });

        // Toisto/pysäytys
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Jos toinen kappale soi, pysäytä se
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                if (currentButton) {
                    const oldPlayIcon = currentButton.querySelector('.play-icon');
                    const oldPauseIcon = currentButton.querySelector('.pause-icon');
                    if (oldPlayIcon) oldPlayIcon.style.display = 'inline';
                    if (oldPauseIcon) oldPauseIcon.style.display = 'none';
                }
            }

            // Toista tai pysäytä nykyinen
            if (audio.paused) {
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                currentlyPlaying = audio;
                currentButton = playBtn;
                
                // Näytä "nyt soimassa"
                nowPlayingDiv.style.display = 'block';
                nowPlayingText.textContent = `Nyt: ${trackTitle}`;
            } else {
                audio.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
                nowPlayingDiv.style.display = 'none';
            }
        });

        // Kun kappale loppuu
        audio.addEventListener('ended', function() {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            currentlyPlaying = null;
            nowPlayingDiv.style.display = 'none';
        });
    });
});

// Ajan formatointi (sekunnit -> mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Sähköpostin kopiointi
function copyEmail() {
    const email = document.querySelector('.contact-email').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Kopioitu!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}