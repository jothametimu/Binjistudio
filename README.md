# Etimu Jotham — Portfolio

A one-page portfolio site. Plain HTML/CSS/JS — no build tools, no installs needed.

## Files

```
index.html      → all page content (text, images, project cards)
styles.css      → all visual design (fonts, colours, spacing, animation)
script.js       → interactions (menu, filters, project popup) — rarely needs editing
assets/images/  → your photos, renders, screenshots
assets/video/   → your video clips
robots.txt      → tells search engines they can crawl the site
sitemap.xml     → tells search engines what pages exist
```

## Editing content

Open `index.html` in any text editor (VS Code is a good free option). It's
heavily commented — look for `<!-- ... -->` notes above each section
explaining what to change.

- **Text:** change the words between tags, e.g. `<h1>ETIMU JOTHAM</h1>`.
- **Images:** replace files in `assets/images/` and update the matching
  `src="assets/images/your-file.jpg"` in the HTML.
- **Video:** add files to `assets/video/`, then in the relevant project
  card delete the `<img>` line and un-comment the `<video>` line, pointing
  it at your file.
- **Add/remove a project:** copy or delete one whole
  `<article class="work-card">...</article>` block in the WORK section.
  Keep `data-index` numbers in order (0, 1, 2, 3...).
- **Fonts/colours:** open `styles.css` and look for the `EASY CONTROLS`
  section near the top — every font and colour is defined once there.

## Placeholder images

Every `assets/images/placeholder-*.jpg` file is a generated stand-in
labelled with what should go there. Replace them with your real photos,
renders and screenshots — same filename, or update the `src` in the HTML
to match your new filename. Recommended: export images around 1600px on
the longest side and compress them (e.g. with squoosh.app) before adding,
so the site loads fast.

## Publishing for free with GitHub Pages

1. Create a free GitHub account at github.com if you don't have one.
2. Create a new repository — for a personal profile site, name it
   `YOUR-USERNAME.github.io` exactly (replace with your GitHub username).
   For any other name, it still works, just at a longer web address.
3. Upload all the files in this folder to that repository (drag-and-drop
   works on github.com, or use `git push` if you're comfortable with git).
4. In the repository, go to **Settings → Pages**, and under "Build and
   deployment" set Source to **Deploy from a branch**, branch `main`,
   folder `/ (root)`. Save.
5. Wait a minute or two, then your site is live at:
   - `https://YOUR-USERNAME.github.io/` (if you used the special repo name), or
   - `https://YOUR-USERNAME.github.io/REPO-NAME/` (any other repo name)

## Before you publish: replace the placeholder web address

Search every file for `YOUR-DOMAIN.example` and replace it with your real
address:
- `index.html` (several places — title tags, canonical link, structured data)
- `robots.txt`
- `sitemap.xml`

If you're using the free `github.io` address, use that as your domain
(e.g. `https://your-username.github.io/`). If you later buy a custom
domain, update these again to match.

Also replace `hello@YOUR-DOMAIN.example` in the CONTACT section of
`index.html` with your real email address.

## Custom domain (optional, not free)

GitHub Pages hosting itself stays free either way. A custom domain (like
`etimujotham.com`) is a separate purchase from a domain registrar
(Namecheap, Google Domains successor Squarespace Domains, etc. — typically
$10–15/year). Once you own one:

1. In your repo, add a file named `CNAME` (no extension) containing just
   your domain, e.g. `etimujotham.com`.
2. At your domain registrar, point the domain's DNS at GitHub Pages
   (GitHub's docs: "Managing a custom domain for your GitHub Pages site"
   have the exact records to add).
3. Back in **Settings → Pages**, enter the custom domain and enable
   "Enforce HTTPS" once it's verified.

If you'd rather not pay anything at all, the free `your-username.github.io`
address works fine for search visibility — Google doesn't rank a `.com`
above a `.github.io` on domain type alone; content and links matter more.

## SEO notes (getting found on Google)

- Keep `<title>` and the `description` meta tag accurate — they're what
  shows in Google's search results.
- Fill in real `alt="..."` text on every image (already set up on the
  placeholders — just update the wording if the image content changes).
- Once live, submit your site in **Google Search Console**
  (search.google.com/search-console) and submit `sitemap.xml` there —
  this is the single biggest thing that speeds up being findable.
- Since you offer services, consider adding a sentence or two naming the
  specific services and location in the ABOUT or SERVICES text (e.g.
  "3D modelling and motion graphics for clients in Kampala and remotely")
  — specific wording like this is what people actually search for.
