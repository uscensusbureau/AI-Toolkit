# AI Tookit
A proof-of-concept React + Vite website for the AI Toolkit. In its current state this application is not intended for production deployment.

## Status
**This repository has been archived and is no longer maintained.**

The code is provided for historical reference and may contain unpatched or unknown
vulnerabilities.

It should not be used in production systems.

## Installation

In the project directory, run:

### `npm install`

To run the app in development mode, run:

### `npm run dev`

## Deployment

Deployments are made to GitHub Pages via the `pages.yml` action that automatically deploys with each push to the `main` branch. Builds are located in the `gh-pages` branch.

## Future Updates

As noted above, this application is not currently meant for production deployment. A few ideas for further development include:
* breaking up `src/App.jsx` into other files of separate methods and components
* Increasing modularity and flexibility of the codebase by moving references to specific documents and regulatory notes to separate, interchangable files
* removing the `StrictMode` Component (or conditionally using it only during development)
