# Houston Article Scraper

This is a tiny Node.js script that, when run, will pick one article from a set of Houston news listing pages and save it as a text file inside the `articles/` folder.

## No External Dependencies

This project does not require any external Node.js packages. All code uses only built-in Node.js modules. You do not need to install node_modules.

## Setup

1. Run the scraper:

```powershell
node index.js
```

2. Run the backup:

```powershell
node upload.js
```

Notes

- The scraper uses heuristics and may not always extract clean article text for every site. It prefers elements like `<article>` or common article body classes.
- If `articles/` doesn't exist, it will be created automatically.
- If a site blocks automated requests, consider running the script occasionally or adding delays.

License: MIT
