// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Modules
    buildModules: ['@nuxtjs/google-fonts'],
    modules: ['nuxt-icon', '@nuxt/content'],

    // Fonts
    googleFonts: {
        families: {
            'Nunito': [400, 700],
            'JetBrains Mono': [400, 700]
        }
    },

    // SEO and meta
    app: {
        head: {
            charset: 'utf-16',
            title: 'William278.net - Open source Minecraft server software & game projects.',
            meta: [
                { name: 'description', content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games!' },
                { name: 'theme-color', content: '#00fb9a' },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: '@William27528' },
                { name: 'twitter:title', content: 'William278.net' },
                { name: 'twitter:description', content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games!' },
                { name: 'twitter:image', content: '/images/icons/huskhelp.png' },
                { name: 'twitter:image:alt', content: 'William278.net and HuskHelp logo' },
                { name: 'og:title', content: 'William278.net' },
                { name: 'og:description', content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games!' },
                { name: 'og:image', content: '/images/icons/huskhelp.png' },
                { name: 'og:url', content: 'https://william278.net' },
                { name: 'og:site_name', content: 'William278.net - Open source Minecraft server software & game projects' },
                { name: 'og:type', content: 'website' },
                { name: 'og:locale', content: 'en_GB' },
                { name: 'og:locale:alternate', content: 'en_US' },
            ],
        }
    },

    // Runtime components
    runtimeConfig: {
        public: {
            GIT_HASH: require('child_process').execSync('git rev-parse --short HEAD').toString().trim(),
        }
    },

    // Build config
    build: {
        transpile: ['discord-markdown'],
    },

    // Content config (https://content.nuxtjs.org/api/configuration)
    content: {
        highlight: {
            theme: 'github-dark-dimmed',
            preload: ['js', 'java', 'yaml', 'xml', 'groovy']
        }
    },

    // Run on startup
    hooks: {
        'build:done': () => {
            require('./hooks/fetch-readmes').getContent()
            require('./hooks/fetch-documentation').pullDocumentation()
        }
    }
})