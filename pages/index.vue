<template>
    <div>
        <NuxtLayout>
            <div id="page-content">
                <div id="left-column">
                    <ProjectGrid />
                </div>
                <div id="right-column">
                    <ContentDoc :head="false" :path="`/${locale}`" />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { locale, t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
    title: computed(() => t('index-title')),
    description: computed(() => t('index-description')),
    layout: 'home'
})
</script>

<style scoped>
#page-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    padding-top: 1.5rem;
    max-width: 1400px;
    width: 95vw;
}

#left-column {
    flex: 1;
    padding: 0 1rem;
}

#right-column {
    flex: 1;
    padding: 0 1rem;
}

/* Less than 725px */
@media screen and (max-width: 725px) {
    #page-content {
        flex-direction: column-reverse;
        max-width: 85vw;
        margin: 0 auto;
    }

    #left-column {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }

    #right-column {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }
}
</style>