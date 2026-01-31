# Deploy PepTalk website to Cloudflare Pages (free)

## Before you start

1. **APK size:** Cloudflare allows **25 MB per file**. If your `PepTalk.apk` is larger than 25 MB, the upload will fail. Check the file size; if it’s over, host the APK elsewhere (e.g. Google Drive) and update the download link in `index.html`.
2. **Folder to deploy:** Everything that should be on the site must be inside the **`website`** folder:
   - `index.html`
   - `PepTalk.apk` (copy from `android/app/build/outputs/apk/release/PepTalk.apk`)
   - `screenshots/` (with your PNGs if you use them)
   - Any other files you added (e.g. `CUSTOMIZE.md` is optional and can be omitted when deploying)

---

## Option 1: Direct Upload (no Git, like Netlify drag-and-drop)

1. **Go to Cloudflare Pages**  
   Open **[dash.cloudflare.com](https://dash.cloudflare.com)** and log in (or create a free account).

2. **Create a Pages project**  
   - In the left sidebar, click **Workers & Pages**.  
   - Click **Create** → **Pages** → **Connect to Git** or **Upload assets**.  
   - Choose **Upload assets** (Direct Upload).

3. **Name the project**  
   - Project name: e.g. **peptalk** (your site will be `peptalk.pages.dev` or similar).

4. **Upload the site**  
   - **Drag and drop** the **contents** of your `website` folder (not the folder itself):  
     - `index.html`  
     - `PepTalk.apk`  
     - `screenshots` folder (if you have one)  
   - Or use **Select from computer** and choose all of those.  
   - Wait for the upload to finish.

5. **Deploy**  
   - Click **Deploy site**.  
   - Cloudflare will give you a URL like **`https://peptalk-xxxx.pages.dev`**.

6. **Custom domain (optional)**  
   - In the project, go to **Custom domains** → **Set up a custom domain** and add your domain (e.g. `peptalk.io`).  
   - Cloudflare will show you what DNS records to add at your domain registrar.

---

## Option 2: Deploy with Git (GitHub)

1. **Push the website to GitHub**  
   - Create a new repo (e.g. `peptalk-website`).  
   - Put **only** the contents of the `website` folder in the repo root (`index.html`, `PepTalk.apk`, `screenshots/`, etc.).  
   - Push to GitHub.

2. **Connect to Cloudflare Pages**  
   - In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.  
   - Choose your GitHub repo.

3. **Build settings**  
   - **Framework preset:** None (or “Static”).  
   - **Build command:** leave empty.  
   - **Build output directory:** `/` (root).  
   - Click **Save and Deploy**.

4. **APK in Git**  
   - If `PepTalk.apk` is over 100 MB, GitHub will reject it. If it’s under 100 MB but over 25 MB, Cloudflare will still reject it at deploy time — then host the APK elsewhere and link to it from `index.html`.

---

## Updating the site later

- **Direct Upload:** In the Cloudflare Pages project, open the latest deployment, click **Create deployment** (or **Upload new version**), and upload the contents of your `website` folder again with the updated files.
- **Git:** Commit and push changes to the repo; Cloudflare will automatically redeploy (counts toward the 500 builds/month limit).

---

## Summary

| Step | Action |
|------|--------|
| 1 | Make sure `PepTalk.apk` is in the `website` folder and under 25 MB |
| 2 | Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages |
| 3 | Create → Pages → **Upload assets** |
| 4 | Drag the **contents** of the `website` folder (index.html, PepTalk.apk, screenshots/) |
| 5 | Deploy → get your `*.pages.dev` URL |
| 6 | (Optional) Add a custom domain under **Custom domains** |

Your live site will be at the URL Cloudflare gives you (e.g. `https://peptalk.pages.dev`).
