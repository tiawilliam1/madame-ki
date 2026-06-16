Redirects and hosting notes

Canonical domain:
- Use `https://madameki.eu` as the canonical domain in SEO meta tags, sitemap, and structured data.
- Redirect `https://www.madameki.eu/*` to `https://madameki.eu/*` to avoid duplicate indexed URLs.
- Keep the old `.html` filenames as redirects only; the indexable pages use SEO-friendly names like `vintage-tops.html`.

Netlify:
- Place the `_redirects` file at the project root. Netlify will honor the canonical domain and old-page redirects, then serve `/` as `index.html`.

Apache:
- Upload the `.htaccess` file; ensure `mod_rewrite` is enabled. Rules redirect `www` to the canonical domain, redirect old page names, and map the root to `/index.html`.

Nginx:
- Use `nginx.conf.sample` as a starting point; set `root` to your site's directory and enable the server blocks.

Notes:
- For GitHub Pages, the old HTML files remain as `noindex,follow` meta-refresh redirects because GitHub Pages does not support server rewrite rules.
