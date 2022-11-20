<template>
    <NuxtLayout v-if="project" name="project">
        <Head>
            <Title>{{ project.name }} - {{ project.tagline }}</Title>
            <Meta name="description" :content="`${project.name} &mdash; ${project.tagline} &mdash; William278.net`" />
            <Meta name="og:description" :content="`${project.tagline} &mdash; William278.net`" />
            <Meta name="twitter:description" :content="`${project.tagline} &mdash; William278.net`" />
        </Head>
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Project', link: `/project/${project.id.toLowerCase()}` }]" />
        <article>
            <ContentDoc :head="false" />
        </article>
        <template #sidebar>
            <ProjectSidebar :project="project" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage code="404">Project not found: {{ $route.params.slug }}</ErrorPage>
    </NuxtLayout>
</template>

<script setup>
import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.slug.toLowerCase()))
</script>