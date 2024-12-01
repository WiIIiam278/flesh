---
title: 'Translate William278.net'
description: 'Learn how you can help translate William278.net into different languages!'
locale: 'en'
---

Here's how to help translate William278.net (this site) into different languages. The site files are [located on GitHub](https://github.com/WiIIiam278/flesg). To get started, clone the site 
* *Example*: `git clone https://github.com/WiIIiam278/flesh.git`

Please note "joke" language translations are not accepted. English text on this site can be in either British/American English (I still accept PRs for typo corrections in English of course!).

## Site locales
Interface locales can be found [in `locales/en.json`](https://github.com/WiIIiam278/william278-site/blob/master/locales/en.json). To create new locales for a language:

* Create an interface locale file for the language code (copy `en.json` to get started) 
  * *Example*: `locales/zh-cn.json`
* Add a locale key to all existing files containing the language name
  * *Example*: `"language-zh-cn": "汉语"`
* Add the locale to the `locales` section of `nuxt.config.js` 
  * *Example*: `{ code: 'zh-cn', iso: 'zh-cn', file: 'locales/zh-cn.json', dir: 'ltr' },`

Then submit a pull request!