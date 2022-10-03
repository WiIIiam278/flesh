// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Modules
    buildModules: ['@nuxtjs/google-fonts'],
    modules: ['nuxt-icon'],

    // Fonts
    googleFonts: {
        families: {
            Nunito: [400, 700],
        }
    },

    // Runtime components
    runtimeConfig: {
        public: {
            GIT_HASH: require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 7) || 'unknown'
        }
    }
})