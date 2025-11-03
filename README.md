My Personal Portfolio Website

This repository contains the source code for my personal portfolio website, built to showcase my projects, skills, and professional experience.

### Troubleshooting

**Blank Page Issue:**
If the deployed site shows a blank page, check the following:
1.  Open the browser's developer console (F12). Look for `404 Not Found` errors.
2.  Ensure `vite.config.js` has `base: '/'` since this is a user page (`username.github.io`).
3.  Verify the GitHub Actions workflow (`.github/workflows/deploy.yml`) is correctly building the project and uploading the `./dist` directory.
4.  If using `react-router-dom`, consider switching from `BrowserRouter` to `HashRouter` to handle client-side routing on GitHub Pages.