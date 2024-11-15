---
title: 'Translate William278.net'
description: 'Learn how you can help translate William278.net into different languages!'
locale: 'en'
---

Here's how to help translate William278.net (this site) into different languages. The site files are [located on GitHub](https://github.com/WiIIiam278/william278-site). To get started, clone the site 
* *Example*: `git clone https://github.com/WiIIiam278/william278-site`

Please note "joke" language translations are not accepted. English text on this site can be in either British/American English (I still accept PRs for typo corrections in English of course!).

## Site locales
Interface locales can be found [in `locales/en.json`](https://github.com/WiIIiam278/william278-site/blob/master/locales/en.json). To create new locales for a language:

* Create an interface locale file for the language code (copy `en.json` to get started) 
  * *Example*: `locales/zh-cn.json`
* Add a locale key to all existing files containing the language name
  * *Example*: `"language-zh-cn": "汉语"`
* Add the locale to the `locales` section of `nuxt.config.js` 
  * *Example*: `{ code: 'zh-cn', iso: 'zh-cn', file: 'locales/zh-cn.json', dir: 'ltr' },`

Additionally, you can translate the index page and docs homepage if you wish:

* To translate the homepage, create a markdown file `/content/index/` (e.g. `/content/index/zh-cn.md`). Copy the contents of `en.md` and translate accordingly.
* And to translate the documentation homepage, do the same for `/content/docs/home/en.md` (e.g. `/content/docs/home/zh-cn.md`)

Then submit a pull request!

## Project docs
The most valuable part of translating the site is to allow for international translations of project documentation.

Project docs for each language are located on each project repo within `/docs/<language_code>/...` (English-language locales are in the root directory).

To create locales for a language, you'll need to `git clone` the project repository and:
* Navigate to `/docs/` and create a folder for the language 
  * *Example*: `/docs/zh-cn/`
* Copy the English locales located in the root `/docs` directory. Do *not* change the file names!
* Delete `__Footer.md`.
* Translate each file and add a `---` header section (see below)
* In the `Home.md` file, please add your name under a `Translation Credits` section. 
  * You can include your username ✅
  * You can link your website and social media page ✅
  * You can link to localized distributions in `Home` and in the `__Sidebar.md` (e.g. MCBBS, etc.) ✅
    * You must declare that links are not official when linking to unofficial links
  * You must not link to free distributions of my premium resources ❌

> **Warning:** Documentation file names must be the same! To change the name of the locale, you may simply add a `---` header section (as below)

For each doc file, you should add a documentation header supplying a localized file name and locale. Add this to the top of each file, leaving a one-line space.
```yaml
---
title: 'Translated Page Title'
locale: 'zn-cn' # replace this with your lang code
---

```

### Projects with docs
::project-doc-list
::