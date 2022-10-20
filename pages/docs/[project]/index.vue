<template>
    <NuxtLayout v-if="projects.find(project => project.id === $route.params.project && project.documentation)">
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/' }]" />
            <article>
            <ContentDoc :path="'/docs/project/' + $route.params.project + '/home'"  />
        </article>
        <template #sidebar>
            <ContentDoc :path="'/docs/project/' + $route.params.project + '/_sidebar'" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage code=404>Documentation not found for: {{ $route.params.project }}</ErrorPage>
    </NuxtLayout>
</template>

<script setup>
import projects from '../../../assets/data/projects.json';

definePageMeta({
    layout: 'docs'
});

</script>
