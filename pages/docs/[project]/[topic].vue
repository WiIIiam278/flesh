<template>
    <ContentDoc :path="'/docs/project/' + $route.params.project + '/' + $route.params.topic.toLowerCase()" :head="false" >
        <template v-slot="{ doc }">
            <Head>
                <Title>{{ doc.title }} - {{ project.name }} Docs - William278.net</Title>
                <Meta name="og:title" :content="`${doc.title} &mdash; ${project.name} Docs &mdash; William278.net`" />
                <Meta name="twitter:title" :content="`${doc.title} &mdash; ${project.name} Docs &mdash; William278.net`" />
                <Meta name="description" :content="doc.description" />
                <Meta name="og:description" :content="doc.description" />
                <Meta name="twitter:description" :content="doc.description" />
                <Meta v-if="project.icon && project.icon.png" name="og:image" :content="`/images/icons/${project.icon.png}`" />
                <Meta v-if="project.icon && project.icon.png" name="twitter:image" :content="`/images/icons/${project.icon.png}`" />
            </Head>
            <ContentRenderer :value="doc">
                <NuxtLayout name="docs">
                    <Overbar>
                        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs' }, { name: project.name, link: `/docs/${project.id}` }]" />
                        <ButtonLink hollow icon="fa6-solid:pencil" :link="`${project.repository}/tree/master/docs`">Edit</ButtonLink>
                    </Overbar>
                    <article>
                        <h1>{{ doc.title }}</h1>
                        <ContentRendererMarkdown :value="doc" />
                    </article>
                    <template #sidebar>
                        <h1 id="sidebar-title">
                            <NuxtLink :to="'/docs/' + project.id.toLowerCase()">
                                <IconifiedProject centered :project="project" />
                            </NuxtLink>
                        </h1>
                        <DocsSearch :project="project.id.toLowerCase()" />
                        <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/_sidebar'" />
                    </template>
                </NuxtLayout>
            </ContentRenderer>
        </template>
        <template #not-found>
            <NuxtLayout name="default">
                <ErrorPage>
                    Docs not found:&nbsp;
                    <span>
                        <NuxtLink to="/">Home</NuxtLink>
                        <BreadcrumbDivider />
                        <NuxtLink to="/docs/">Docs</NuxtLink>
                        <BreadcrumbDivider />
                        <NuxtLink v-if="project" :to="'/docs/' + project.id.toLowerCase()">{{ project.name }}</NuxtLink>
                        <InvalidPage v-else :name="$route.params.project" />
                        <BreadcrumbDivider />
                        <InvalidPage :name="$route.params.topic" />
                    </span>
                </ErrorPage>
            </NuxtLayout>
        </template>
    </ContentDoc>
</template>

<script setup>
import BreadcrumbDivider from '../../../components/BreadcrumbDivider.vue';
import InvalidPage from '../../../components/InvalidPage.vue';
import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.project.toLowerCase()))
</script>

<style scoped>
.invalid-page {
    color: var(--light-gray);
    text-decoration: line-through;
}
</style>