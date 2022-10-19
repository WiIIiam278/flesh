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

    // Runtime components
    runtimeConfig: {
        public: {
            GIT_HASH: require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 7) || 'unknown'
        }
    },

    // Content config (https://content.nuxtjs.org/api/configuration)
    content: {
        documentDriven: true,
        highlight: {
            theme: 'github-dark-dimmed',
            preload: [
                'java',
                'yaml',
                'json'
            ]
        }
    },

    // Run on startup
    hooks: {
        'build:done': () => {
            require('./hooks/download-content.js').getContent()
        }
    }
})