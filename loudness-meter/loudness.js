const startBtn = document.getElementById('start-btn');
const dbValue = document.getElementById('db-value');
const loudnessLevel = document.getElementById('loudness-level');

let audioContext;

let analyser;
let dataArray;
let source;
let animationId;
let aWeightingFilter;

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

    // If A-weighting filter is present, use filtered output for dBA
    if (aWeightingFilter) {
        // Create a buffer to read filtered data
        const filteredBuffer = new Float32Array(analyser.fftSize);
        // Use getFloatTimeDomainData if available for higher precision
        if (analyser.getFloatTimeDomainData) {
            analyser.getFloatTimeDomainData(filteredBuffer);
        } else {
            // Fallback: convert Uint8 to Float32
            for (let i = 0; i < dataArray.length; i++) {
                filteredBuffer[i] = dataArray[i] / 128 - 1;
            }
        }
        const filteredRMS = calculateRMS(filteredBuffer);
        db = rmsToDb(filteredRMS);
    }

    if (!isFinite(db)) db = -60;
    db = Math.max(-60, Math.min(0, db));
    dbValue.textContent = db.toFixed(1) + ' dBA';
    // Map -60..0 dB to 0..100%
    const percent = ((db + 60) / 60) * 100;
    loudnessLevel.style.width = percent + '%';
    animationId = requestAnimationFrame(updateLoudness);
}

startBtn.onclick = async () => {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
        aWeightingFilter = null;
        startBtn.textContent = 'Start Measurement';
        dbValue.textContent = '-- dBA';
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

        // Create an IIRFilterNode for A-weighting
        // Coefficients from IEC 61672:1 for 48kHz sample rate
        // Source: https://github.com/endolith/waveform_analysis/blob/master/A_weighting/weighting_filters.py
        aWeightingFilter = audioContext.createIIRFilter(
            [0.255741125204258, -0.511482250408516, 0.255741125204258],
            [1.0, -0.647481794910190, 0.142873374441515]
        );
        source.connect(aWeightingFilter);
        aWeightingFilter.connect(analyser);

        startBtn.textContent = 'Stop Measurement';
        updateLoudness();
    } catch (err) {
        alert('Microphone access denied or unavailable.');
    }
};
