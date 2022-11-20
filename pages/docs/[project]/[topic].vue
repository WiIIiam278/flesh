<template>
    <ContentDoc :path="'/docs/project/' + $route.params.project + '/' + $route.params.topic.toLowerCase()">
        <template v-slot="{ doc }">
            <ContentRenderer :value="doc">
                <NuxtLayout name="docs">
                    <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' },
                    { name: 'Docs', link: '/docs' },
                    { name: project.name, link: `/docs/${project.id}` }]" />
                    <article>
                        <h1>{{ doc.title }}</h1>
                        <ContentRendererMarkdown :value="doc" />
                    </article>
                    <template #sidebar>
                        <h1>
                            <NuxtLink :to="'/docs/' + project.id.toLowerCase()">
                                <IconifiedProject :project="project" />
                            </NuxtLink>
                        </h1>
                        <DocsSearch :project="project.id.toLowerCase()" />
                        <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/_sidebar'" />
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
import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.project.toLowerCase()))
</script>