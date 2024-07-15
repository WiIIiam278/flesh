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
                            <div v-if="activeTab === 'versions'">
                                <VersionImporter />
                            </div>
                            <div v-if="activeTab === 'users'">
                                <UsersTable />
                            </div>
                        </Tabs>
                    </div>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const tabs = [
    { id: 'projects', name: 'Projects' },
    { id: 'versions', name: 'Versions' },
    { id: 'users', name: 'Users' },
]
const activeTab = defineModel('activeTab')
activeTab.value = 'projects'

definePageMeta({
    middleware: ['admin']
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