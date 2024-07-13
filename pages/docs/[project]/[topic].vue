<template>
    <div>
        <LazyContentDoc :path="'/docs/project/' + $route.params.project + '/' + locale + '/' + $route.params.topic.toLowerCase()" :head="false">
            <template v-slot="{ doc }">
                <Head>
                    <Title>{{ doc.title }} &mdash; {{ $t('docs-title', {'project': project.metadata.name}) }} &mdash; {{ $t('index-title') }}</Title>
                    <Meta name="og:title" :content="`${doc.title} &mdash; ${t('docs-title', {'project': project.metadata.name})} &mdash; ${t('index-title')}`" />
                    <Meta name="twitter:title" :content="`${doc.title} &mdash; ${t('docs-title', {'project': project.metadata.name})} &mdash; ${t('index-title')}`" />
                    <Meta name="description" :content="description" />
                    <Meta name="og:description" :content="description" />
                    <Meta name="twitter:description" :content="description" />
                    <Meta v-if="project.metadata.icons['PNG']" name="og:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
                    <Meta v-if="project.metadata.icons['PNG']" name="twitter:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
                </Head>
                <ContentRenderer :value="doc">
                    <NuxtLayout name="docs">
                        <Overbar>
                            <Breadcrumbs
                                :crumbs="[{ name: t('link-home'), link: '/' }, { name: t('link-docs'), link: '/docs' }, { name: project.metadata.name, link: `/docs/${project.slug}` }]" />
                                <span>
                                    <ButtonLink hollow icon="fa6-solid:pencil" :link="`${project.metadata.repository}/tree/master/docs`">{{ $t('docs-edit-button') }}</ButtonLink>
                                    <ButtonLink hollow icon="fa6-solid:language" link="/translate">{{ $t('docs-translate-button') }}</ButtonLink>
                                </span>
                        </Overbar>
                        <article>
                            <h1>{{ doc.title }}</h1>
                            <ContentRendererMarkdown :value="doc" />
                        </article>
                        <template #sidebar>
                            <h1 id="sidebar-title">
                                <NuxtLink :to="'/docs/' + project.slug">
                                    <IconifiedProject centered :project="project" />
                                </NuxtLink>
                            </h1>
                            <LazyContentDoc :head="false" :path="'/docs/project/' + project.slug + '/' + locale + '/_sidebar'" />
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
                            <NuxtLink v-if="project" :to="'/docs/' + project.slug.toLowerCase()">{{ project.metadata.name }}</NuxtLink>
                            <InvalidPage v-else :name="$route.params.project" />
                            <BreadcrumbDivider />
                            <InvalidPage :name="$route.params.topic" />
                        </PathLine>
                    </ErrorPage>
                </NuxtLayout>
            </template>
        </LazyContentDoc>
    </div>
</template>

<script setup>
import BreadcrumbDivider from '../../../components/BreadcrumbDivider.vue';
import InvalidPage from '../../../components/InvalidPage.vue';
import PathLine from '../../../components/content/PathLine.vue';

const { locale, t } = useI18n()
const { params } = useRoute()
const project = await useProject(params.project.toLowerCase());
</script>