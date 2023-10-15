<template>
    <NuxtLayout v-if="project" name="project">
        <ContentDoc v-slot="{doc}" :head="false">
            <Head>
                <Title>{{ project.name }} - {{ project.tagline }}</Title>
                <Meta name="description" :content="doc" />
                <Meta name="og:description" :content="`${project.name} &mdash; ${project.tagline}`" />
                <Meta name="twitter:description" :content="`${project.name} &mdash; ${project.tagline}`" />
                <Meta name="og:title" :content="`${project.name} &mdash; William278.net`" />
                <Meta name="twitter:title" :content="`${project.name} &mdash; William278.net`" />
                <Meta v-if="project.icon && project.icon.png" name="og:image" :content="`/images/icons/${project.icon.png}`" />
                <Meta v-if="project.icon && project.icon.png" name="twitter:image" :content="`/images/icons/${project.icon.png}`" />
            </Head>
            <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Project', link: `/project/${project.id.toLowerCase()}` }]" />
            <article>
                <ContentRenderer :value="doc" />
            </article>
        </ContentDoc>
        <template #sidebar>
            <ProjectSidebar :project="project" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage code="404">
            Project not found:&nbsp;
            <PathLine>
                <NuxtLink to="/">Home</NuxtLink>
                <BreadcrumbDivider />
                <InvalidPage :name="$route.params.slug" />
            </PathLine>
        </ErrorPage>
    </NuxtLayout>
</template>

<script setup>
import PathLine from '../../components/content/PathLine.vue';
import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.slug.toLowerCase()))
</script>