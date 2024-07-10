export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookie = useCookie('JSESSIONID');
    if (cookie.value.startsWith(" ")) {
        cookie.value = cookie.value.substring(1);
    }
    return navigateTo(`${useRuntimeConfig().public.API_BASE_URL}/logout`, { external: true })
})