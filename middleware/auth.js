export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!useAuth().value) {
        return navigateTo(`${useRuntimeConfig().public.API_BASE_URL}/login`, { external: true })
    }
})