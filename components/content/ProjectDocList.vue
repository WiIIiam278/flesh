<template>
    <div class="project-docs-grid">
        <NuxtLink v-for="project in projects.filter(p => p.metadata.documentation)" :key="project.slug" :to="`/docs/${project.slug}`">
            <IconifiedProject :project="project" />
        </NuxtLink>
    </div>
</template>

<script setup>
const { value: projects } = await useAllProjects();
</script>

<style scoped>
.project-docs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 0 0.25rem;
}
</style>