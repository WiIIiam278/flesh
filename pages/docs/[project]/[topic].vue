<template>
    <NuxtLayout v-if="projects.find(project => project.id === $route.params.project && project.documentation)">
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs' }, { name: projects.find(project => project.id === $route.params.project).name, link: `/docs/${$route.params.project}` }]" />
        <article>
            <ContentDoc :path="'/docs/project/' + $route.params.project + '/' + $route.params.topic.toLowerCase()">
                <template v-slot="{ doc }">
                    <h1>{{ doc.title }}</h1>
                    <ContentRenderer :value="doc" />
                </template>
            </ContentDoc>
        </article>
        <template #sidebar>
            <h1>
                <IconifiedProject :project="projects.find(project => project.id === $route.params.project)" />
            </h1>
            <DocsSearch :project="$route.params.project" />
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
    layout: 'docs',
    // link: [
    //     {
    //         rel: 'canonical',
    //         href: 'https://william278.net/docs/' + $route.params.project + '/' + $route.params.topic.toLowerCase()
    //     }
    // ]
});

</script>
