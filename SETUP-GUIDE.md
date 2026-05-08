# Pareto Website — Setup Guide
## Everything you need to do to go live

This guide covers every third-party account you need to create and the exact steps to connect them to your website. Total time: approximately 2–3 hours. Each section is independent — you can do them in any order.

---

## 0. Before You Start

You need:
- A **GitHub account** (free) — for hosting the website
- Your **existing Google account** — for Meet and Calendar
- A **photo** of yourself for the About page (phone photo is fine)

---

## 1. GitHub Pages — Host Your Website (Free)

This puts your website online. No monthly fees, ever.

### Steps:
1. Go to **github.com** and create a free account
2. Click the **+** icon (top right) → **New repository**
3. Name it: `pareto-website`
4. Set it to **Public**
5. Click **Create repository**
6. Click **uploading an existing file** (link on the empty repo page)
7. Drag and drop ALL files from your `pareto-website/` folder:
   - `index.html`, `about.html`, `resources.html`, `book.html`
   - `style.css`, `animations.js`
   - The `assets/` folder
8. Click **Commit changes**
9. Go to **Settings** → **Pages** (left sidebar)
10. Under **Source**, select **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
11. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/pareto-website/`

### Connect your custom domain (optional, ~$12/year):
1. Buy your domain at **namecheap.com** or **porkbun.com** (search for `pareto.education` or `paretolearn.com`)
2. In GitHub Pages settings, enter your domain in the **Custom domain** field
3. Follow Namecheap/Porkbun's DNS instructions to point the domain at GitHub

---

## 2. Cal.com — Booking Calendar (Free)

This handles your availability, student bookings, and auto-generates Google Meet links.

### Steps:
1. Go to **cal.com** and sign up for free
2. Connect your **Google Calendar** (Settings → Calendars → Connect)
3. Connect **Google Meet** (Settings → Video → Google Meet → Enable)
4. Create 4 event types:

| Event Name | Duration | Price (shown in description) |
|---|---|---|
| 1-to-1 Tutoring Session | 60 min | $55 |
| Group Session | 90 min | $30/student |
| Internal Assessment Support | 60 min | $65 |
| Extended Essay — Premium | 60 min | $75 |

5. For each event: set your available hours (e.g., Mon–Sat, 9am–7pm CET)
6. Copy the **embed code** for each event type: Event → Share → Embed → iFrame

### Connect to the website:
In `book.html`, find this comment:
```html
<!-- REPLACE: embed your Cal.com widget here. -->
```
Replace the entire `<div class="calendar-wrapper__placeholder">...</div>` block with:
```html
<iframe src="https://cal.com/YOUR-USERNAME/1to1-economics"
  style="width:100%;height:700px;border:none;border-radius:12px;"
  title="Book a session">
</iframe>
```
Change `YOUR-USERNAME` and the event slug to match your actual Cal.com URL.

---

## 3. Gumroad — Sell Resources (Free)

Gumroad handles file hosting, payment, and instant delivery. They take 10% of each sale (no monthly fee).

### Steps:
1. Go to **gumroad.com** and create a free account
2. Click **+ New Product** for each resource

### For FREE resources (email gate):
1. Product type: **Digital product**
2. Upload your PDF file
3. Set price to **$0**
4. Enable **"Require email to download"** in settings
5. This automatically collects emails you can export to Mailchimp

### For PAID resources:
1. Product type: **Digital product**
2. Upload your PDF file
3. Set your price ($10–$45 depending on the resource)
4. In **Content → Preview**, upload the first 2 pages as a separate PDF — this is what students see before paying
5. Publish and copy the product URL

### Connect to the website:
In `resources.html`, find all instances of:
```html
href="https://gumroad.com"
```
Replace each with your actual product URL, e.g.:
```html
href="https://yourusername.gumroad.com/l/ia-checklist"
```

---

## 4. Stripe — Accept Direct Payments (Free to set up)

Stripe processes card payments. They charge 2.9% + $0.30 per transaction — no monthly fee.

### Steps:
1. Go to **stripe.com** and create a free account
2. Complete identity verification (required to receive payouts)
3. Go to **Payment Links** → **+ New payment link**
4. Create one link per session type:

| Session | Price | What to name it |
|---|---|---|
| 1-to-1 Tutoring | $55 | "1-to-1 Tutoring Session" |
| Group Session | $30 | "Group Session (per student)" |
| IA Support | $65 | "Internal Assessment Support" |
| Extended Essay | $75 | "Extended Essay — Premium" |

5. Copy each payment link URL

### How it works with Cal.com:
In your Cal.com event confirmation email settings, add the Stripe payment link in the email body:
> "Please complete your payment to confirm your booking: [STRIPE LINK]"

Students book → receive email → pay via Stripe → their booking is confirmed.

---

## 5. Mailchimp — Email List (Free up to 500 contacts)

Mailchimp collects emails from your free Gumroad downloads and lets you send updates, tips, and promotions.

### Steps:
1. Go to **mailchimp.com** and create a free account
2. Create an **Audience** (your email list)
3. Go to **Gumroad** → Settings → Integrations → Mailchimp
4. Connect your Mailchimp account and select your audience
5. Now every student who downloads a free resource is automatically added to your list

### Write a welcome email:
1. In Mailchimp: **Automations → Welcome new subscribers**
2. Set up a 3-email sequence:
   - **Email 1** (immediate): "Welcome to Pareto — your free resource is attached"
   - **Email 2** (day 3): "3 things IB Economics students get wrong about Paper 1"
   - **Email 3** (day 7): "Book a session — I'll show you the examiner's view"

---

## 6. About Page — Replace Placeholder Content

Open `about.html` and replace every `<!-- REPLACE -->` section:

| Placeholder | Replace with |
|---|---|
| `[SURNAME]` | Your surname |
| `[Your Degree & University]` | e.g., "MSc Economics, LSE" |
| `[YEAR]` | The year you became an IB examiner |
| Photo placeholder | Your photo at `assets/images/tutor-photo.jpg` |

### To add your photo:
1. Save your photo as `tutor-photo.jpg`
2. Place it in the `assets/images/` folder
3. In `about.html`, find:
```html
<div class="about-photo__placeholder">
  ...
</div>
```
Replace with:
```html
<img src="assets/images/tutor-photo.jpg" alt="[Your name], IB Examiner and Economics Tutor" />
```

---

## 7. Privacy Policy (Required — GDPR)

You are based in Italy (EU) and will be collecting emails. A Privacy Policy is legally required.

### Steps:
1. Go to **iubenda.com** and create a free account
2. Create a new Privacy Policy
3. Add these data processing activities:
   - Email marketing (Mailchimp)
   - Payment processing (Stripe, Gumroad)
   - Booking management (Cal.com)
4. Copy the generated Privacy Policy text
5. Create a new file `privacy.html` in your website folder (same structure as other pages)
6. Paste the policy text into the page content area

---

## 8. Google Search Console — SEO Tracking (Free)

This shows you which Google searches bring people to your site.

### Steps:
1. Go to **search.google.com/search-console**
2. Click **Add property** → URL prefix → enter your website URL
3. Verify ownership by downloading the HTML file Google gives you and uploading it to your GitHub repo
4. Wait 2–3 days for Google to index your site
5. Come back weekly to check which search terms are bringing visitors

---

## Quick Reference — All Accounts to Create

| Account | URL | Free? | Time to set up |
|---|---|---|---|
| GitHub | github.com | ✅ | 10 min |
| Cal.com | cal.com | ✅ | 20 min |
| Gumroad | gumroad.com | ✅ | 15 min |
| Stripe | stripe.com | ✅ | 20 min |
| Mailchimp | mailchimp.com | ✅ | 10 min |
| iubenda | iubenda.com | ✅ | 10 min |
| Google Search Console | search.google.com/search-console | ✅ | 10 min |
| Domain (optional) | namecheap.com | ~$12/year | 15 min |

**Total cost to go live: $0**
**Total cost with custom domain: ~$12/year**

---

## Ongoing Maintenance — What You Need to Do

| Task | Frequency | Time |
|---|---|---|
| Check Cal.com bookings | Daily | 2 min |
| Check Mailchimp email stats | Weekly | 5 min |
| Check Stripe payouts | Weekly | 5 min |
| Update Google Search Console | Monthly | 15 min |
| Add new resources to Gumroad | As needed | 20 min |
| Update About page content | As needed | 10 min |

Everything else runs automatically.

---

*Questions? Ask Claude Code for help with any step in this guide.*
