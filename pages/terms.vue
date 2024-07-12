<template>
    <div>
        <Head>
            <Title>William278.net &ndash; Terms, Conditions, & Privacy Notice</Title>
            <Meta name="description" content="Terms, conditions, and privacy notice for William278.net." />
        </Head>
        <NuxtLayout>
            <article class="page-content">
                <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                <h1>Terms, Conditions & Privacy Notice</h1>
                <Tabs class="tabs" :tabs="tabs" v-model:selected="selectedTab">
                    <ContentDoc :head="false" :path="`/legal/${selectedTab}`" />
                </Tabs>
                <div class="footer">
                    <p>Last updated: July 12th, 2024</p>
                </div>
            </article>
        </NuxtLayout>
    </div>
</template>

<script setup>
const tabs = [
    { id: 'terms-and-conditions', name: 'Terms & Conditions' },
    { id: 'privacy-notice', name: 'Privacy Notice' },
    { id: 'discord-rules', name: 'Discord Rules' }
]
const selectedTab = defineModel('selectedTab')
selectedTab.value = 'terms-and-conditions'
</script>

<style scoped>
.footer {
    margin-top: 2rem;
    font-size: small;
}

.page-content {
    margin-top: 1rem;
    max-width: 95vw;
    width: 1100px;
}

.page-content h1 {
    margin-top: 0;
}
</style>