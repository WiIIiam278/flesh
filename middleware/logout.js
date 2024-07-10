export default defineNuxtRouteMiddleware(async (to, from) => {
    return navigateTo(`${useRuntimeConfig().public.API_BASE_URL}/logout`, { external: true })
})