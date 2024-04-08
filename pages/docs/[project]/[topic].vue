<template>
    <div>
        <ContentDoc :path="'/docs/project/' + $route.params.project + '/' + locale + '/' + $route.params.topic.toLowerCase()" :head="false">
            <template v-slot="{ doc }">
                <Head>
                    <Title>{{ doc.title }} &mdash; {{ $t('docs-title', {'project': project.name}) }} &mdash; {{ $t('index-title') }}</Title>
                    <Meta name="og:title" :content="`${doc.title} &mdash; ${t('docs-title', {'project': project.name})} &mdash; ${t('index-title')}`" />
                    <Meta name="twitter:title" :content="`${doc.title} &mdash; ${t('docs-title', {'project': project.name})} &mdash; ${t('index-title')}`" />
                    <Meta name="description" :content="description" />
                    <Meta name="og:description" :content="description" />
                    <Meta name="twitter:description" :content="description" />
                    <Meta v-if="project.icon && project.icon.png" name="og:image"
                        :content="`/images/icons/${project.icon.png}`" />
                    <Meta v-if="project.icon && project.icon.png" name="twitter:image"
                        :content="`/images/icons/${project.icon.png}`" />
                </Head>
                <ContentRenderer :value="doc">
                    <NuxtLayout name="docs">
                        <Overbar>
                            <Breadcrumbs
                                :crumbs="[{ name: t('link-home'), link: '/' }, { name: t('link-docs'), link: '/docs' }, { name: project.name, link: `/docs/${project.id}` }]" />
                            <ButtonLink hollow icon="fa6-solid:pencil" :link="`${project.repository}/tree/master/docs`">Edit
                            </ButtonLink>
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
                            <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/' + locale + '/_sidebar'" />
                        </template>
                    </NuxtLayout>
                </ContentRenderer>
            </template>
            <template #not-found>
                <NuxtLayout name="default">
                    <ErrorPage>
                        {{ $t('error-page-not-found') }}&nbsp;
                        <PathLine>
                            <NuxtLink to="/">{{ $t('link-home') }}</NuxtLink>
                            <BreadcrumbDivider />
                            <NuxtLink to="/docs/">{{ $t('link-docs') }}</NuxtLink>
                            <BreadcrumbDivider />
                            <NuxtLink v-if="project" :to="'/docs/' + project.id.toLowerCase()">{{ project.name }}</NuxtLink>
                            <InvalidPage v-else :name="$route.params.project" />
                            <BreadcrumbDivider />
                            <InvalidPage :name="$route.params.topic" />
                        </PathLine>
                    </ErrorPage>
                </NuxtLayout>
            </template>
        </ContentDoc>
    </div>
</template>

<script setup>
import BreadcrumbDivider from '../../../components/BreadcrumbDivider.vue';
import InvalidPage from '../../../components/InvalidPage.vue';
import PathLine from '../../../components/content/PathLine.vue';
import projects from '/assets/data/projects.json'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.project.toLowerCase()))
</script>