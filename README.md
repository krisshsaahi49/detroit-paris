# Detroit Paris Vue/Three.js Experience

An animated Vue/Vite rebuild inspired by the Detroit Paris homepage. The site uses
Three.js for a full-bleed hero scene, local media assets, scroll-linked motion,
magnetic hover states, card spotlight actions, shuffle interactions, and a
GitHub-backed Vercel deployment.

## Live Site

- Production: https://detroit-paris-bay.vercel.app
- Repository: https://github.com/krisshsaahi49/detroit-paris

## Tech Stack

- Vue 3
- Vite
- Three.js
- CSS animations and responsive layout
- Vercel deployment connected to GitHub

## Local Development

```sh
npm install
npm run dev
```

Open the local Vite URL printed in the terminal.

## Build

```sh
npm run build
```

The production output is generated in `dist/`.

## Codex Build Prompt

This project was built through an iterative Codex workflow. The effective prompt
trail was:

```text
Create a clone of https://www.detroit.paris/, push it to github and deploy it to vercel.

Alright, now this website is bland without any actions, I need animations and actions to make it very lively.

Why don't you use Vue.js to make it a live website with 3D animation, scrolling, zoom effects to make a very very lively action website. Users should be mesmerized.
```

Codex interpreted that as:

```text
Rebuild the Detroit Paris-inspired static clone as a Vue/Vite website with a
full-bleed Three.js hero, scroll-linked motion, zoom/parallax effects, magnetic
hover interactions, animated menu transitions, project/talent spotlight actions,
shuffle controls, responsive mobile framing, and a GitHub-backed Vercel
deployment.
```

## Deployment Notes

The Vercel project is connected to the GitHub repository, so pushes to `main`
trigger production deployments automatically.
