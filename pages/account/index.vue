<template>
    <div>
        <NuxtLayout>
            <div id="page-content">
                <article v-if="user" class="account-page">
                    <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                    <div class="account-grid">
                        <div class="profile grid-item shadow">
                            <h1 class="item-title">{{ $t('my-account') }}</h1>
                            <div class="profile-bg"></div>
                            <div class="item-body">
                                <div class="user-container shadow">
                                    <span>{{$t('logged-in-with-discord')}}</span>
                                    <div class="user-card">
                                        <img class="avatar shadow" :src="user.avatar" :alt="t('user-avatar-alt-text', {'name': user.name})" />
                                        <div class="user-details">
                                            <div class="name-role">
                                                <span class="name">{{ user.name }}</span>
                                                <Pill class="shadow" v-if="user.admin">{{ $t('user-role-admin') }}</Pill>
                                            </div>
                                            <div class="email" v-if="user.email">{{ user.email }}</div>
                                        </div>
                                    </div>
                                    <div class="management-buttons">
                                        <ButtonLink href="/account/logout" class="shadow" hollow icon="fa6-solid:person-running">{{ t('link-log-out') }}</ButtonLink>
                                        <ButtonLink @click="deleteAccount()" class="shadow" hollow color="red" icon="fa6-solid:trash-can">{{ t('delete-account') }}</ButtonLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="library grid-item">
                            <h2 class="item-title">{{ $t('my-purchases') }}</h2>
                            <div class="item-body">
                                <ul v-if="user.products?.length">
                                    <li v-for="product in user.products" :key="product.id">
                                        <NuxtLink :to="`/project/${product.id}`">{{ product.name }}</NuxtLink>
                                    </li>
                                </ul>
                                <IconifiedText v-else class="empty-notice" icon="fa6-solid:bag-shopping">{{ $t('no-products-notice') }}</IconifiedText>
                            </div>
                        </div>
                        <div class="tickets grid-item">
                            <h2 class="item-title">{{ $t('my-support-tickets') }}</h2>
                            <div class="item-body">
                                <IconifiedText class="empty-notice" icon="fa6-solid:ticket">{{ $t('no-support-tickets-notice') }}</IconifiedText>
                            </div>
                        </div>
                    </div>
                </article>
                <div v-else class="session-expired">
                    <h2>{{ $t('session-expired') }}</h2>
                    <p>{{ $t('session-expired-details') }}</p>
                    <ButtonLink href="/account/logout" class="shadow" hollow icon="fa6-solid:person-running">{{ t('link-log-out') }}</ButtonLink>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;

const { t } = useI18n()
const { auth, xsrf } = useAuth();
const { data: user } = await useFetch(`${BASE_URL}/v1/user`, {
    method: 'GET',
    credentials: auth ? 'include' : 'omit',
    headers: {
        'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
        'X-XSRF-TOKEN': xsrf
    }
});

const deleteAccount = () => {
    if (confirm(t('delete-account-confirm'))) {
        $fetch(`${BASE_URL}/v1/user`, 
        { 
            method: 'DELETE',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            }
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
#page-content {
    padding-top: 1.5rem;
}

.account-page {
    max-width: 95vw;
    min-width: 60vw;
}

.session-expired {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.account-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.account-grid .grid-item {
    display: flex;
    flex-direction: column;
}

.grid-item .item-title {
    margin-top: 0;
    background-color: var(--background);
}

.profile .item-body {
    height: 100%;
}

.grid-item .item-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

@keyframes slide {
  0% {
    transform: translate3d(0, -60vh, 0);
  }
  100% {
    transform: translate3d(-60vw, 0, 0); /* The image width */
  }
}

.profile .item-title {
    margin-bottom: 0;
}

.profile  {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    background: linear-gradient(180deg, #142B42 0%, #08111B 100%);
    height: 300px;
    border-radius: 0 0 0.5rem 0.5rem;
}

.profile .user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(33, 33, 33, 0.95);
    padding: 1rem;
    width: 40%;
    border-radius: 0.5rem;
    gap: 1rem;
}

.profile-bg {
    height: 100vh !important;
    width: 100vw !important;
    position: absolute;
    z-index: -1;
    background-image: url('/images/icons/promo-grid.png');
    background-size: 125px;
    animation: slide 120s linear infinite;
}

.user-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.user-card .name {
    font-size: 1.4rem;
    font-weight: 700;
}

.user-card .name-role {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.user-card .email {
    font-family: 'JetBrains Mono', monospace;
    color: var(--light-gray);
}

.user-card .avatar {
    border-radius: 50%;
    height: 75px;
    width: 75px;
}

.delete-account:hover {
    cursor: pointer;
}

.empty-notice {
    margin: 1rem 0;
    color: var(--light-gray)
}
</style>