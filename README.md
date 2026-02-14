# In Game / Site Visit Recruiting Sheet

Web form hosted on GitHub Pages that submits to Formspree, emailing the recruiting report to whatever addresses the scout enters.

## Live URL
- **https://topdawg619.github.io/recruiting-form-app/**

## Stack
- Frontend: static HTML/CSS/JS (`docs/`)
- Form submission: [Formspree](https://formspree.io/) endpoint `https://formspree.io/f/xeelgjal`

## Local dev
```bash
npm install
npx servor docs 8080  # or any static server
```

## Form behavior
- Collects scout info, prospect vitals, visit notes, and email recipients.
- Requires at least one email field.
- On submit it POSTs JSON to Formspree and shows success/failure messaging inline.

## Formspree setup (already done)
- Endpoint: `https://formspree.io/f/xeelgjal`
- Form submits JSON (via fetch) — see `docs/script.js`
- Update destination email addresses inside Formspree dashboard if needed.

## Notes
- Previous Nodemailer/Netlify backend is retained for reference under `netlify/functions/` but is no longer required.
- If you prefer serverless email again, swap the endpoint in `docs/script.js` back to your own API.
