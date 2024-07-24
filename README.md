# Flesh
#### Frontend Vue App for William278.net

Source for the frontend for William278.net, written in Vue.js / Nuxt (v3). All Rights Reserved
Please get in touch if you wish to use this frame for your own personal website.

See also: [bones](https://github.com/WiIIiam278/bones), the corresponding backend service.

## Translations
Check the [translations page](/content/translate.md) for information about how you can help translate this site!

## Setup
Navigate to the root directory and run `npm install` to get the packages, then run `npm run dev` to start the server. 
You can set the following environment variables to set the port and the hostname:

* `HOST` - The host the server will listen on. Defaults to `localhost`.
* `PORT` - The port the server will listen on. Defaults to `8000`.

To deploy for production, run `npm run build` to build the site, then you can deploy that through a node web server via `node .output/server/index.mjs`. Check the nuxt docs for more deployment options, etc.

---
&copy; [William278](https://william278.net/), 2022. All rights reserved.
