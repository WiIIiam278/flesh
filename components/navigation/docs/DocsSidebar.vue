<template>
    <div>
        <div class="sidebar-top">
            <NuxtLink class="project-title" :to="`/docs/${project.slug}`">
                <IconifiedProject centered :project="project" />
            </NuxtLink>
            <div class="project-buttons">
                <ButtonLink v-if="meta.listDownloads" :href="`/project/${project.slug}/download`" icon="fa6-solid:download" >
                    {{ $t('link-download') }}
                </ButtonLink>
                <ButtonLink v-if="meta.github" :href="meta.github" icon="fa6-brands:github" >
                    {{ $t('project-link-github') }}
                </ButtonLink>
            </div>
        </div>
        <DocsNavigation v-if="navigation?.length" :navigation="navigation" :project="project" />
        <DocsContentSidebar v-else-if="sidebar" :sidebar="sidebar" :project="project" />
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
})
const { metadata: meta } = project;
const { documentationNav: navigation } = meta || {};
const { content: sidebar } = !navigation?.length && project ? await useDocsPage(project.slug.toLowerCase(), '_sidebar') : '';
</script>

<style scoped>
.sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar-top .project-title {
    color: white !important;
    font-size: x-large;
    font-weight: bold;
}

.sidebar-top .project-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}
</style>