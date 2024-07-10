export default defineNuxtRouteMiddleware(async (to, from) => {
    const { auth } = useAuth()
    if (!auth) {
        return navigateTo(`${useRuntimeConfig().public.API_BASE_URL}/login`, { external: true })
    }
})