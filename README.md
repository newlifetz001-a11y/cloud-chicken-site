# Cloud Chicken Static Website

This repository contains the Cloud Chicken temporary static website for testing on Netlify.

Cloud Chicken is a crispy chicken restaurant website built with simple HTML, CSS, and vanilla JavaScript. It does not use WordPress, React, Vue, Next.js, Tailwind, Bootstrap, Shopify, Wix, or any CMS.

## Where The Website Files Are

All public website files are inside:

```text
public/
```

The main homepage file is:

```text
public/index.html
```

Other public files and folders include:

```text
public/404.html
public/about/
public/family-meals/
public/menu/
public/visit-us/
public/assets/
public/data/
public/robots.txt
public/sitemap.xml
```

## Netlify Deployment Settings

Use these Netlify settings:

```text
Build command: leave blank
Publish directory: public
```

The repository also includes `netlify.toml`, which tells Netlify to publish the `public` folder without running a build command.

## Temporary Test Site Notes

This is still a temporary test deployment because the final production domain is not ready yet.

Do not remove this from the HTML pages yet:

```html
<meta name="robots" content="noindex,nofollow">
```

Do not treat these files as final SEO files yet:

```text
public/robots.txt
public/sitemap.xml
```

After the real production domain is purchased, update:

- `public/robots.txt`
- `public/sitemap.xml`
- canonical URLs, if added
- Open Graph URLs, if added
- the `noindex,nofollow` meta robots tags

## What Not To Change Yet

- Do not add fake reviews, fake awards, fake media logos, fake prices, or unverified claims.
- Do not invent business information.
- Do not add a framework or CMS.
- Do not submit the sitemap until the final domain is live.
