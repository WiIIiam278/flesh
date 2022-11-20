# [![William278.net Banner](public/images/banner.png)](https://github.com/WiIIiam278/William278.net)
[![Discord](https://img.shields.io/discord/818135932103557162.svg?label=&logo=discord&logoColor=fff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/tVYhJfyDWG)

Source for [my website](https://william278.net), built in Vue.js using Nuxt.js v3, hosted via Vercel. If you'd like to use this as a base for your site, it should be OK, but get in touch with me first!

## Usage
Navigate to the root directory and run `npm install` to get the packages, then run `npm run dev` to start the server. 
You can set the following environment variables to set the port and the hostname:

* `HOST` - The host the server will listen on. Defaults to `localhost`.
* `PORT` - The port the server will listen on. Defaults to `8000`.

To deploy for production, run `npm run build` to build the site, then you can deploy that through a node web server via `node .output/server/index.mjs`. Check the nuxt docs for more deployment options, etc.

---
&copy; [William278](https://william278.net/), 2022. All rights reserved.