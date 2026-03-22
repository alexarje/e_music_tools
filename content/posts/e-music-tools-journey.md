---
title: "From Idea to Deployment: Building e_music_tools"
date: 2026-03-22T08:30:00Z
author: "Alex"
draft: false
tags:
  - web-audio
  - javascript
  - html
  - css
  - github-pages
categories:
  - engineering
  - devlog
description: "How e_music_tools went from concept sketches to a live GitHub Pages deployment."
---

## Why build e_music_tools?

I wanted a lightweight set of browser-based music utilities that require no installation and no backend. The goal was simple: open a URL and start practicing.

The project idea became four focused apps:

1. A metronome for timing practice.
2. A tuner for pitch accuracy.
3. A playable piano for note exploration.
4. A drum kit for rhythm and groove drills.

## Ideation and scope

During ideation, I constrained the project to pure front-end technologies:

- HTML for structure.
- CSS for layout and styling.
- Vanilla JavaScript with the Web Audio API for sound.

This constraint kept complexity low and made deployment trivial. It also ensured the tools run on most modern browsers without a build pipeline.

## Building the apps

### Metronome

The metronome uses a scheduler loop based on the Web Audio clock so clicks stay stable. UI updates (pendulum, beat flash, beat dots) are timed to match scheduled beats.

Key features:

- BPM range from 40 to 240.
- Tap tempo for quick calibration.
- Time signatures (2/4, 3/4, 4/4, 6/8).
- Keyboard shortcuts for start/stop and tap.

### Brass tuner

The tuner uses `getUserMedia` for microphone input and autocorrelation for pitch detection. It displays:

- Note name.
- Frequency in Hz.
- Cents deviation from nearest semitone.
- Needle meter with in-tune feedback.

A silence gate avoids unstable readings when no clear pitch is present.

### Piano

The piano renders two octaves dynamically and supports:

- Mouse and touch interaction.
- Computer keyboard mappings.
- Octave shifting.
- Waveform selection (`triangle`, `sine`, `square`, `sawtooth`).
- Volume control.

Each active note is synthesized in real time with a simple envelope for smoother playability.

### Drum kit

The drum kit synthesizes percussion sounds in-browser:

- Kick, snare, closed/open hi-hat, high/mid/low toms, crash.
- Clickable pads and keyboard shortcuts.
- Immediate visual pad feedback.
- Adjustable master volume.

Noise buffers and filtered oscillators provide distinct per-instrument timbres.

## Refactor: folder organization

After the first version, the app pages lived at the repository root. I reorganized the structure so each app has its own folder:

- `metronome/index.html`
- `tuner/index.html`
- `piano/index.html`
- `drumkit/index.html`

This made navigation paths cleaner and keeps each app ready for app-specific assets later.

## Deployment to GitHub Pages

Deployment is automated via GitHub Actions:

1. Checkout repository.
2. Configure GitHub Pages.
3. Upload repository as Pages artifact.
4. Deploy artifact to Pages.

One subtle issue appeared during deployment: using a non-existent action version for checkout. Updating to `actions/checkout@v4` fixed the workflow.

## Lessons learned

- Web Audio scheduling should rely on audio time, not UI timers.
- Small projects benefit from explicit folder organization early.
- Static sites can deliver rich, interactive music tools with no backend.
- GitHub Pages + Actions is a reliable deployment path for frontend-only apps.

## What is next?

Potential follow-ups include:

1. Recording and loop playback features.
2. Preset saving (BPM, waveform, volume).
3. Accessibility upgrades and extended keyboard mappings.
4. Optional PWA support for offline use.

This project proved that focused scope and browser-native APIs are enough to ship useful music tools quickly.
