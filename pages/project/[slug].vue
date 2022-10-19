<template>
    <NuxtLayout v-if="projects.find(project => project.id === $route.params.slug)">
        <Breadcrumbs :crumbs="crumbs" />
        <ProjectReadme :project="projects.find(project => project.id === $route.params.slug)" />
        <template #sidebar>
            <ProjectSidebar :project="projects.find(project => project.id === $route.params.slug)" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage code=404>Project not found: {{ $route.params.slug }}</ErrorPage>
    </NuxtLayout>
</template>

<style scoped>

</style>

<script setup>
import projects from '/assets/data/projects.json'
import Breadcrumbs from '../../components/Breadcrumbs.vue';
import ErrorPage from '../../components/ErrorPage.vue';

definePageMeta({
    layout: 'project'
});

const crumbs = [{ name: 'Projects', link: '/' }];
</script>
