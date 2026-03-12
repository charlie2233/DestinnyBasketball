# DestinnyBasketball

Static landing page for Team Destiny Basketball.

The site is live at [destinybasketball.us](https://destinybasketball.us) and is deployed with GitHub Pages from the `main` branch.

## What This Site Does

- Presents Team Destiny as an AAU basketball club in Orange County, CA
- Highlights the official Instagram: [@destinyyouthbasketball](https://www.instagram.com/destinyyouthbasketball/)
- Uses the black and ivory logo treatments as the main visual system
- Includes local discovery SEO for Orange County, Fullerton, Anaheim, and Irvine

## Current Public Facts

- Team size: 8 players
- Founded: November 2025
- Region: Orange County, CA
- Cities served: Fullerton, Anaheim, Irvine

## Project Structure

- `index.html`: page content, metadata, SEO tags, and JSON-LD
- `styles.css`: layout, visual system, responsive styles, motion styling
- `script.js`: scroll reveal and interaction behavior
- `assets/`: logo files, icons, and social share image
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow
- `CNAME`: custom domain for GitHub Pages

## Local Development

This project has no build step.

Run a local static server from the repo root:

```bash
python3 -m http.server 4174
```

Then open:

```text
http://127.0.0.1:4174
```

## Deployment

- Pushes to `main` trigger the GitHub Pages workflow
- GitHub Pages publishes the repo contents as a static site
- The production domain is `https://destinybasketball.us`

## Notes For Content Updates

- Keep public facts accurate and avoid adding unverified claims
- Use modern SEO fields in `index.html`; do not add deprecated `meta keywords`
- If team facts change, update both visible page copy and metadata together
