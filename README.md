# In Game / Site Visit Recruiting Sheet

Web form + Netlify Function that emails the recruiting report through Gmail.

## Stack
- Frontend: static HTML/CSS/JS (`docs/`), designed for GitHub Pages or Netlify.
- Backend: Netlify Function (`netlify/functions/send-email.js`) using Nodemailer to send mail via Gmail SMTP.

## Local dev
```bash
npm install
npm run dev   # runs netlify dev (needs Netlify CLI)
```

## Deployment (Netlify)
1. Create a Netlify site pointing to this repo.
2. Set environment variables on Netlify:
   - `GMAIL_USER` – `iamjarvisbot619@gmail.com`
   - `GMAIL_APP_PASSWORD` – `jlfs bvdm zykn ftmg`
3. Deploy. Form submissions POST to `/.netlify/functions/send-email` automatically.

## GitHub Pages
- GitHub Pages is configured to serve from the `docs/` folder on the `master` branch.
- Pages URL: `https://topdawg619.github.io/recruiting-form-app/`

## Form behavior
- Collects scout info, prospect vitals, visit notes, and email recipients.
- Requires at least one email field.
- Success/failure messaging shown in-page.

## Security
- App password is single-purpose; rotate via Google Account → Security → App passwords.
- Netlify hides env vars; frontend never sees the Gmail password.
