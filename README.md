# e_music_tools

A small collection of in-browser music utilities built with pure HTML, CSS and the Web Audio API – no build tools or dependencies required.

## Apps

| App | File | Description |
|-----|------|-------------|
| 🥁 **Metronome** | `metronome/index.html` | BPM control (40–240), tap tempo, time-signature selector, visual pendulum & beat flash. Keyboard: `Space` start/stop, `T` tap, `↑/↓` adjust BPM. |
| 🎺 **Brass Tuner** | `tuner/index.html` | Microphone pitch detector using autocorrelation. Shows note name, frequency, cents deviation and a needle meter. Optimised for the range of brass instruments (tuba → trumpet). |
| 🎹 **Piano** | `piano/index.html` | Interactive two-octave on-screen keyboard (C4–B5 by default). Supports mouse, touch and computer-keyboard input. Octave shift, four waveforms, volume control. |
| 🪘 **Drum Kit** | `drumkit/index.html` | Eight synthesised pads (Kick, Snare, Hi-hat ×2, Tom ×3, Crash) playable by clicking or via keyboard shortcuts `A S D F G H J K`. |

## Live Demo

The site is deployed via GitHub Pages: **https://alexarje.github.io/e_music_tools/**

## Project Story

A Hugo-style blog post with YAML front matter is available at `content/posts/e-music-tools-journey.md`.

## Usage

Open `index.html` in any modern browser, or serve the directory with any static file server:

```bash
python3 -m http.server
# then open http://localhost:8000
```

All audio is generated in-browser using the Web Audio API. The Brass Tuner requires microphone permission.
