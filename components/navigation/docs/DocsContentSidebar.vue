<template>
    <div class="content-sidebar">
        <MDC :value="sidebar" class="content" tag="article" />
        <div class="sidebar-bottom">
            <ButtonLink v-for="link in meta.links" 
                :key="link.url" :link="link.url" :icon="useLinkIcon(link)"></ButtonLink>
        </div>
    </div>
</template>

<script setup>
const { sidebar, project } = defineProps({
    sidebar: {
        type: Object,
        required: true
    },
    project: {
        type: Object,
        required: true
    }
})
const { metadata: meta } = project;
</script>

<style scoped>
.sidebar-bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1.5rem 0 0.25rem 0;
    gap: 0.5rem;
}

.content-sidebar:deep(h1), .content-sidebar:deep(h2), .content-sidebar:deep(h3) {
    margin-bottom: 1rem;
}
</style>