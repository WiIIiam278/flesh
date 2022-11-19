<template>
    <ContentDoc :path="'/docs/project/' + $route.params.project + '/' + $route.params.topic.toLowerCase()">
        <template v-slot="{ doc }">
            <ContentRenderer :value="doc">
                <NuxtLayout>
                    <Breadcrumbs
                        :crumbs="[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs' }, { name: projects.find(project => project.id === $route.params.project).name, link: `/docs/${$route.params.project}` }]" />
                    <article>
                        <h1>{{ doc.title }}</h1>
                        <ContentRendererMarkdown :value="doc" />
                    </article>
                    <template #sidebar>
                        <h1>
                            <NuxtLink :to="'/docs/' + $route.params.project">
                                <IconifiedProject
                                    :project="projects.find(project => project.id === $route.params.project)" />
                            </NuxtLink>
                        </h1>
                        <DocsSearch :project="$route.params.project" />
                        <ContentDoc :path="'/docs/project/' + $route.params.project + '/_sidebar'" />
                    </template>
                </NuxtLayout>
                <template #empty>
                    <NuxtLayout name="default">
                        <ErrorPage>Page not found.</ErrorPage>
                    </NuxtLayout>
                </template>
            </ContentRenderer>
        </template>
    </ContentDoc>
</template>

<script setup>
import projects from '../../../assets/data/projects.json';

definePageMeta({
    layout: 'docs'
});
</script>
