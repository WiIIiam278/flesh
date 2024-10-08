<template>
    <div>
        <NuxtLayout>
            <div id="page-content">
                <article class="account-page">
                    <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                    <div class="account-grid">
                        <div class="profile grid-item shadow">
                            <h1 class="item-title">{{ $t('your-account') }}</h1>
                            <div class="profile-bg"></div>
                            <div class="item-body">
                                <div class="user-container shadow">
                                    <span>{{$t('logged-in-with-discord')}}</span>
                                    <div class="user-card">
                                        <img class="avatar shadow" :src="user.avatar" :alt="t('user-avatar-alt-text', {'name': user.name})" />
                                        <div class="user-details">
                                            <div class="name-role">
                                                <span class="name">{{ user.name }}</span>
                                                <Pill class="shadow" v-if="useIsUserRole(user, 'staff')">{{ $t(`user-role-${user.role.toLowerCase()}`) }}</Pill>
                                            </div>
                                            <div class="email" v-if="user.email">{{ user.email }}</div>
                                        </div>
                                    </div>
                                    <div class="management-buttons">
                                        <ButtonLink href="/account/logout" class="shadow" hollow icon="fa6-solid:person-running">{{ t('link-log-out') }}</ButtonLink>
                                        <ButtonLink v-if="useIsUserRole(user, 'staff')" href="/account/admin" class="shadow" hollow icon="fa6-solid:gear">{{ t('admin-panel') }}</ButtonLink>
                                        <ButtonLink @click="deleteAccount()" class="shadow" hollow color="red" icon="fa6-solid:trash-can">{{ t('delete-account') }}</ButtonLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tabs class="tabs grid-item" :tabs="tabs" v-model:selected="activeTab">
                            <div v-if="activeTab === 'your-purchases'" class="item-body library">
                                <div v-if="user.purchases.length">
                                    <ProjectCard v-for="product in restricted.filter(r => user.purchases.includes(r.slug))" 
                                        :key="product.slug" :project="product" />
                                </div>
                                <IconifiedText v-else class="empty-notice" icon="fa6-solid:bag-shopping">{{ $t('no-products-notice') }}</IconifiedText>
                            </div>
                            <div v-if="activeTab === 'your-support-tickets'" class="item-body tickets">
                                <TicketsTable :user="user" />
                            </div>
                        </Tabs>
                    </div>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;

const { t } = useI18n()
const { auth, xsrf } = useAuth();
const user = await useUser();
const restricted = await useRestrictedProjects();

const deleteAccount = () => {
    useConfirm(t('delete-account-confirm'), t('delete-account'), async (confirm) => {
        if (!confirm) return;
        try {
            await $fetch(`${BASE_URL}/v1/users/@me`, 
            { 
                method: 'DELETE',
                credentials: auth ? 'include' : 'omit',
                headers: {
                    'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                    'X-XSRF-TOKEN': xsrf
                }
            });
            navigateTo('/account/logout')
        } catch (err) {
            
        }
    })
}

const tabs = [
    { id: 'your-purchases', name: t('your-purchases') },
    { id: 'your-support-tickets', name: t('your-support-tickets') }
];
const activeTab = defineModel('activeTab');
activeTab.value = 'your-purchases';

definePageMeta({
    title: computed(() => t('account-title')),
    description: computed(() => t('account-description')),
    middleware: ['auth']
})
</script>

<style scoped>
#page-content {
    margin-top: 1rem;
}

.account-page {
    width: 1200px;
    max-width: 95vw;
}

.account-grid {
    display: flex;
    flex-direction: column;
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

.profile .management-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.item-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

@keyframes slide {
  0% {
    transform: translate3d(0, -52vh, 0);
  }
  100% {
    transform: translate3d(-30vw, 0, 0); /* The image width */
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
    min-width: 500px;
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
    animation: slide 60s linear infinite;
}

/* Mobile user container */
@media screen and (max-width: 550px) {
    .profile-bg {
        visibility: hidden;
    }
    
    .profile {
        height: fit-content !important;
        background: none;
    }

    .profile .user-container {
        width: 100%;
        background-color: transparent;
    }

    /* management buttons */
    .profile .management-buttons {
        flex-direction: column;
        align-items: center;
    }
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
    margin: 2rem 0;
    color: var(--light-gray)
}
</style>