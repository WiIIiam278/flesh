<template>
    <NuxtLayout v-if="projects.find(project => project.id === $route.params.slug)">
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Project', link: `/project/${$route.params.slug}`}]" />
        <article>
            <ContentDoc />
        </article>
        <template #sidebar>
            <ProjectSidebar :project="projects.find(project => project.id === $route.params.slug)" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage code=404>Project not found: {{ $route.params.slug }}</ErrorPage>
    </NuxtLayout>
</template>

<script setup>
import projects from '/assets/data/projects.json'

definePageMeta({
    layout: 'project'
});
</script>
