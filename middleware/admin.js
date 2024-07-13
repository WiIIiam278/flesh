export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useUser();
    if (!user.value) {
        return navigateTo('/logout');
    }
    if (!user.value.admin) {
        return navigateTo('/account');
    }
})