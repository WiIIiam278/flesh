export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useUser();
    if (!user.value) {
        return navigateTo(`${useRuntimeConfig().public.API_BASE_URL}/login`, { external: true })
    }
})