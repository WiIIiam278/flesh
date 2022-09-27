// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Modules
    buildModules: ['@nuxtjs/google-fonts'],

    // Fonts
    googleFonts: {
        families: {
            Nunito: [400, 700],
        }
    },

    // CSS and icons
    css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],

    gitHead: require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 7)
})