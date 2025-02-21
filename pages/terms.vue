<template>
    <div>
        <Head>
            <Title>William278.net &ndash; Terms, Conditions, & Privacy Notice</Title>
            <Meta name="description" content="Terms, conditions, and privacy notice for William278.net." />
            <Meta name="og:image" content="/images/thumbnails/page/Terms%2C%20Conditions%2C%20%26%20Privacy%20Notice/card.png" />
            <Meta name="twitter:image" content="/images/thumbnails/page/Terms%2C%20Conditions%2C%20%26%20Privacy%20Notice/card.png" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
        <NuxtLayout>
            <article class="page-content">
                <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                <h1>Terms, Conditions & Privacy Notice</h1>
                <Tabs class="tabs" :tabs="tabs" v-model:selected="selectedTab">
                    <LazyContentDoc :head="false" :path="`/legal/${selectedTab}`" />
                </Tabs>
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
.page-content {
    margin-top: 1rem;
    max-width: 95vw;
    width: 1100px;
}

.page-content h1 {
    margin-top: 0;
}
</style>