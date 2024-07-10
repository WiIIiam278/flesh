<template>
    <div>
        <NuxtLayout>
            <div>
                <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                <article>
                    <h1>My Account</h1>
                    <div class="account-grid">
                        <div class="library">
                            <h2>Library</h2>
                            <ul>
                                <li v-for="product in user.products" :key="product.id">
                                    <NuxtLink :to="`/project/${product.id}`">{{ product.name }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="profile">
                            <div class="name">{{ user.name }}</div>
                            <img class="avatar" :src="user.avatar" />
                            <div>
                                <ButtonLink href="/account/logout" hollow icon="fa6-solid:person-running">{{ t('link-log-out') }}</ButtonLink>
                                <ButtonLink @click="deleteAccount(auth)" class="delete-account" hollow icon="fa6-solid:trash-can">{{ t('delete-account') }}</ButtonLink>
                            </div>
                        </div>
                        <!-- todo: Support tickets -->
                    </div>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { t } = useI18n()
const auth = useAuth()?.value
const { data: user } = useAsyncData(
    'user', 
    () => $fetch(`${useRuntimeConfig().public.API_BASE_URL}/v1/user`, 
    { 
        method: 'GET',
        headers: {
            'Cookie': `JSESSIONID=${auth.startsWith("!") ? auth.slice(1) : auth}` 
        },
        credentials: 'include'
    })
)

const deleteAccount = (auth) => {
    if (confirm(t('delete-account-confirm'))) {
        $fetch(`${useRuntimeConfig().public.API_BASE_URL}/v1/user`, 
        { 
            method: 'DELETE',
            headers: {
                'Cookie': `JSESSIONID=${auth.startsWith("!") ? auth.slice(1) : auth}` 
            },
            credentials: 'include'
        }).then(() => {
            navigateTo('/account/logout')
        })
    }
}
 
definePageMeta({
    title: computed(() => t('account-title')),
    description: computed(() => t('account-description')),
    middleware: ['auth']
})
</script>

<style scoped>
.account-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
}

.delete-account:hover {
    cursor: pointer;
}
</style>