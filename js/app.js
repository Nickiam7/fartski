const fartEmojis = {
    toot: '🎺',
    ripper: '💥',
    plop: '💩',
    squit: '💦',
    raspberry: '👅',
    squat: '🏋️',
    tuppence: '💷',
    liftoff: '🚀',
    trumpet: '🎺',
    fizzler: '✨',
    windy: '🌬️',
    eine: '🇩🇪',
    fartception: '🌀',
    fartpoint1: '📍'
};

const fartFiles = {
    toot: 'fart1',
    ripper: 'fart2',
    plop: 'fart3',
    squit: 'fart4',
    raspberry: 'fart5',
    squat: 'fart6',
    tuppence: 'fart7',
    liftoff: 'fart8',
    trumpet: 'fart9',
    fizzler: 'fart10',
    windy: 'fart11',
    eine: 'fart12',
    fartception: 'fart13',
    fartpoint1: 'fart14'
};

const audioCache = {};
let audioContext;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function preloadSounds() {
    Object.keys(fartFiles).forEach(fartName => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = `https://www.jsfart.com/farts/${fartFiles[fartName]}.mp3`;
        audioCache[fartName] = audio;
    });
}

preloadSounds();

const fartGrid = document.getElementById('fartGrid');

Object.keys(fartFiles).forEach(fartName => {
    const button = document.createElement('button');
    button.className = 'fart-button';
    button.innerHTML = `
        <span class="emoji">${fartEmojis[fartName] || '💨'}</span>
        ${fartName}
    `;

    const playFart = function(e) {
        e.preventDefault();
        
        initAudioContext();
        
        document.querySelectorAll('.fart-button').forEach(btn => {
            btn.classList.remove('playing');
        });

        this.classList.add('playing');

        const audio = audioCache[fartName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(err => {
                console.error('Error playing sound:', err);
            });
            
            audio.onended = () => {
                this.classList.remove('playing');
            };
        }
    };

    button.addEventListener('touchstart', playFart, {passive: false});
    button.addEventListener('click', function(e) {
        if (e.detail === 0) return;
        playFart.call(this, e);
    });

    fartGrid.appendChild(button);
});