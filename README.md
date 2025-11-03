My Personal Portfolio Website

This repository contains the source code for my personal portfolio website, built to showcase my projects, skills, and professional experience.

## Deployment

This site is deployed on GitHub Pages.

### Deploy Steps:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

3. Your site will be available at: `https://saitdundar.github.io`

### Auto-deployment with GitHub Actions (Optional):

If you want automatic builds, the included `.github/workflows/deploy.yml` will handle deployment automatically on every push to main branch.