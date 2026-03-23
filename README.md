# e_music_tools

A small collection of in-browser music utilities built with pure HTML, CSS and the Web Audio API – no build tools or dependencies required.

## Apps

| App | File | Description |
|-----|------|-------------|
| 🥁 **Metronom** | `metronome/index.html` | BPM control (40–240), tap tempo, time-signature selector, beat flash, and a tempo guide (Largo → Prestissimo) that highlights the active range. Keyboard: `Space` start/stop, `T` tap, `↑/↓` adjust BPM. |
| 🎺 **Stemming** | `tuner/index.html` | Microphone pitch detector using autocorrelation. Shows note name, frequency, cents deviation and a needle meter. Optimised for brass instruments (tuba → trumpet). |
| 🎸 **Gitarstemming** | `guitar-tuner/index.html` | Microphone tuner for standard guitar tuning (E2 A2 D3 G3 B3 E4) with nearest-string card highlighting and cents sharp/flat feedback. |
| 🎹 **Piano** | `piano/index.html` | Interactive on-screen keyboard spanning two octaves plus a top C (C4–C6 by default). Supports mouse, touch and computer-keyboard input. Octave shift, four waveforms, volume control. |
| 🪘 **Trommesett** | `drumkit/index.html` | Eight synthesised pads (Stortromme, Skarptromme, Hi-hat ×2, Tom ×3, Crash) playable by clicking or via keyboard shortcuts `A S D F G H J K`. |

## Live Demo

The site is deployed via GitHub Pages: **https://alexarje.github.io/e_music_tools/**

## Project Story

Read [a blog post](https://www.arj.no/2026/03/22/agent-coding-music-tools/) about this project.

## Usage

Open `index.html` in any modern browser, or serve the directory with any static file server:

```bash
python3 -m http.server
# then open http://localhost:8000
```

All audio is generated in-browser using the Web Audio API. The tuners require microphone permission.
