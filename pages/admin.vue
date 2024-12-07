<template>
    <div>
        <NuxtLayout>
            <div id="page-content">
                <article class="admin-page">
                    <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                    <h1>{{ $t('admin-panel') }}</h1>
                    <div>
                        <Tabs :tabs="tabs" v-model:selected="activeTab">
                            <div v-if="activeTab === 'projects'">
                                <ProjectEditor />
                            </div>
                            <div v-if="activeTab === 'pages'">
                                <ProjectPageEditor />
                            </div>
                            <div v-if="activeTab === 'upload'">
                                <VersionUploader />
                            </div>
                            <div v-if="activeTab === 'import'">
                                <VersionImporter />
                            </div>
                            <div v-if="activeTab === 'users'">
                                <UsersTable :user="user" @show-tickets="showTickets" />
                            </div>
                            <div v-if="activeTab === 'tickets'">
                                <TicketsTable />
                            </div>
                        </Tabs>
                    </div>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const user = await useUser();
const tabs = [];
if (useIsUserRole(user.value, 'staff')) {
    tabs.unshift({ id: 'tickets', name: 'Tickets', path: '/admin#tickets' })
    tabs.unshift({ id: 'users', name: 'Users', path: '/admin#users' })
}
if (useIsUserRole(user.value, 'admin')) {
    tabs.unshift({ id: 'import', name: 'Import', path: '/admin#import' })
    tabs.unshift({ id: 'upload', name: 'Upload', path: '/admin#upload' })
    tabs.unshift({ id: 'pages', name: 'Pages', path: '/admin#pages' })
    tabs.unshift({ id: 'projects', name: 'Projects', path: '/admin#projects' })
}
const activeTab = defineModel('activeTab')
activeTab.value = 'projects'

definePageMeta({
    middleware: ['staff']
})

const showTickets = (user) => {
    navigateTo(`/admin?user=${user}#tickets`, { external: true });
}
</script>

<style scoped>
#page-content {
    margin-top: 1rem;
}

.admin-page {
    width: 1200px;
    max-width: 95vw;
}
</style>