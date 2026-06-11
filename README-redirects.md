Redirects and hosting notes

Netlify:
- Place the `_redirects` file at the project root. Netlify will honor the rules and serve `/` as `index.html` and `/gr` as `/gr/index.html`.

Apache:
- Upload the `.htaccess` file; ensure `mod_rewrite` is enabled. Rules map `/gr` to `/gr/index.html` and the root to `/index.html`.

Nginx:
- Use `nginx.conf.sample` as a starting point; set `root` to your site's directory and enable the server block.

Notes:
- For production, configure the host so `example.com` serves English and `example.com/gr/` serves Greek.
- For language-specific domains (e.g., `example.gr`), configure DNS + vhost to point to the `gr/` directory.
