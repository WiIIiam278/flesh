<template>
    <div>
        <NuxtLayout>
            <div id="page-content">
                <article class="admin-page">
                    <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }, { name: $t('link-account'), link: '/account' }]" />
                    <h1>Admin Panel</h1>
                    <div>
                        <Tabs :tabs="tabs" v-model:selected="activeTab">
                            <div v-if="activeTab === 'projects'">
                                <ProjectEditor />
                            </div>
                            <div v-if="activeTab === 'upload'">
                                <VersionUploader />
                            </div>
                            <div v-if="activeTab === 'import'">
                                <VersionImporter />
                            </div>
                            <div v-if="activeTab === 'users'">
                                <UsersTable :user="user" />
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
const uploading = ref(true);
const user = await useUser();
const tabs = [];
if (useIsUserRole(user.value, 'staff')) {
    tabs.unshift({ id: 'tickets', name: 'Tickets' })
    tabs.unshift({ id: 'users', name: 'Users' })
}
if (useIsUserRole(user.value, 'admin')) {
    tabs.unshift({ id: 'import', name: 'Import' })
    tabs.unshift({ id: 'upload', name: 'Upload' })
    tabs.unshift({ id: 'projects', name: 'Projects' })
}
const activeTab = defineModel('activeTab')
activeTab.value = 'projects'

definePageMeta({
    middleware: ['staff']
})
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