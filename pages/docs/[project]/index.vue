<template>
    <NuxtLayout v-if="project && project.documentation" name="docs">
        <Head>
            <Title>{{ project.name }} Docs - William278.net</Title>
            <Meta name="og:title" :content="`${project.name} Docs &mdash; William278.net`" />
            <Meta name="twitter:title" :content="`${project.name} Docs &mdash; William278.net`" />
            <Meta name="description" :content="description" />
            <Meta name="og:description" :content="description" />
            <Meta name="twitter:description" :content="description" />
            <Meta v-if="project.icon && project.icon.png" name="og:image" :content="`/images/icons/${project.icon.png}`" />
            <Meta v-if="project.icon && project.icon.png" name="twitter:image" :content="`/images/icons/${project.icon.png}`" />
        </Head>
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs' }]" />
        <article>
            <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/home'"  />
        </article>
        <template #sidebar>
            <h1>
                <IconifiedProject :project="project" />
            </h1>
            <DocsSearch :project="project.id.toLowerCase()" />
            <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/_sidebar'" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage>
            Docs not found:&nbsp;
            <span>
                <NuxtLink to="/">Home</NuxtLink>
                <BreadcrumbDivider />
                <NuxtLink to="/docs/">Docs</NuxtLink>
                <BreadcrumbDivider />
                <InvalidPage v-if="project" :name="project.name" />
                <InvalidPage v-else :name="$route.params.project" />
            </span>
        </ErrorPage>
    </NuxtLayout>
</template>

<script setup>
import InvalidPage from '../../../components/InvalidPage.vue';
import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.project.toLowerCase()))
const description = computed(() => project.value ? `Welcome to the documentation for ${project.value.name} &mdash; ${project.value.tagline} &mdash; available on William278.net` : 'William278.net')
</script>