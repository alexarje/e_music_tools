const startBtn = document.getElementById('start-btn');
const dbValue = document.getElementById('db-value');
const loudnessLevel = document.getElementById('loudness-level');

let audioContext;
let analyser;
let dataArray;
let source;
let animationId;

function calculateRMS(buffer) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
        const val = buffer[i] / 128 - 1;
        sum += val * val;
    }
    return Math.sqrt(sum / buffer.length);
}

function rmsToDb(rms) {
    // dBFS: 0 dB is max, negative values below
    return 20 * Math.log10(rms);
}

function updateLoudness() {
    analyser.getByteTimeDomainData(dataArray);
    const rms = calculateRMS(dataArray);
    let db = rmsToDb(rms);
    if (!isFinite(db)) db = -60;
    db = Math.max(-60, Math.min(0, db));
    dbValue.textContent = db.toFixed(1) + ' dB';
    // Map -60..0 dB to 0..100%
    const percent = ((db + 60) / 60) * 100;
    loudnessLevel.style.width = percent + '%';
    animationId = requestAnimationFrame(updateLoudness);
}

startBtn.onclick = async () => {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
        startBtn.textContent = 'Start Measurement';
        dbValue.textContent = '-- dB';
        loudnessLevel.style.width = '0%';
        cancelAnimationFrame(animationId);
        return;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        dataArray = new Uint8Array(analyser.fftSize);
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        startBtn.textContent = 'Stop Measurement';
        updateLoudness();
    } catch (err) {
        alert('Microphone access denied or unavailable.');
    }
};
