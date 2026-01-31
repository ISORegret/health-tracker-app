# Set up Gumroad for PepTalk ($1.50)

## 1. Create a Gumroad account

1. Go to **https://gumroad.com** and click **Start selling**.
2. Sign up with email or Google.
3. Complete your creator profile if prompted (name, etc.).

---

## 2. Create the PepTalk product

1. In Gumroad, click **+ New product** (or **Products** → **New product**).
2. **Product type:** Choose **Digital product** (file download).
3. **Upload file:** Upload your **PepTalk.apk** (from `android/app/build/outputs/apk/release/PepTalk.apk`).
4. **Product name:** `PepTalk` (or “PepTalk — Health Tracker for Android”).
5. **Price:** Set to **$1.50**.
6. **URL/slug:** Your link is **`https://peptalk.gumroad.com/l/PepTalk`** (already set on the website).
7. **Description:** You can paste a short blurb, e.g.  
   *Track weight, injections, body measurements, and get reminders. Peptides, hormones, insights, and body phase — all in one private app.*
8. **Cover image:** Optional; you can use your app icon or a screenshot.
9. Click **Save** / **Publish**.

---

## 3. Your product link

- Your link: **`https://peptalk.gumroad.com/l/PepTalk`** (already used on the website).
- To change it later: edit **`website/index.html`**, search for **`peptalk.gumroad.com`**, and replace with your new link.

---

## 5. Redeploy the website

- If you use **Netlify**: drag the **website** folder (with the updated `index.html`) into Netlify again.
- If you use **Git**: commit and push the changes.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Sign up at gumroad.com |
| 2 | New product → Digital → Upload PepTalk.apk, name it, set price **$1.50**, slug **peptalk** |
| 3 | Your link: `https://peptalk.gumroad.com/l/PepTalk` |
| 4 | To change link: edit `index.html` and replace the Gumroad URL |
| 5 | Redeploy the site |

After that, “Buy for $1.50” on your site will take customers to Gumroad to pay and download the APK.
