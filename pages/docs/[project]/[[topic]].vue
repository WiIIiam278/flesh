<template>
    <div>
        <NuxtLayout v-if="content" name="docs">
            <template #default>
                <Head>
                    <Title>{{ title }} &ndash; {{ $t('docs-title', {'project': meta.name}) }} &ndash; {{ $t('index-title') }}</Title>
                    <Meta name="og:title" :content="`${title} &ndash; ${t('docs-title', {'project': meta.name})} &ndash; ${t('index-title')}`" />
                    <Meta name="twitter:title" :content="`${title} &ndash; ${t('docs-title', {'project': meta.name})} &ndash; ${t('index-title')}`" />
                    <Meta name="description" :content="description" />
                    <Meta name="og:description" :content="description" />
                    <Meta name="twitter:description" :content="description" />
                    <Meta name="og:image" :content="`/images/thumbnails/docs/${project.slug}/${params.topic ?? 'home'}/card.png`" />
                    <Meta name="twitter:image" :content="`/images/thumbnails/docs/${project.slug}/${params.topic ?? 'home'}/card.png`" />
                    <Meta name="twitter:card" content="summary_large_image" />
                    <Meta name="twitter:creator" content="@William27528" />
                </Head>
                <ArchivalNotice v-if="meta.archived" :name="meta.name" />
                <Overbar>
                    <Breadcrumbs :crumbs="breadcrumbs" />
                </Overbar>
                <article>
                    <h1 v-if="params.topic">{{ title }}</h1>
                    <MDC :value="content" tag="article" />
                </article>
            </template>
            <template #sidebar class="sidebar">
                <div class="sidebar-top">
                    <NuxtLink class="project-title" :to="'/docs/' + project.slug">
                        <IconifiedProject centered :project="project" />
                    </NuxtLink>
                    <div class="project-buttons">
                        <ButtonLink v-if="project.metadata.listDownloads" :href="`/project/${project.slug}#download`" icon="fa6-solid:download" hollow>
                            {{ $t('link-download') }}
                        </ButtonLink>
                        <ButtonLink v-if="project.metadata.github" :href="project.metadata.github" icon="fa6-brands:github" hollow>
                            {{ $t('project-link-repository') }}
                        </ButtonLink>
                    </div>
                </div>
                <MDC :value="sidebar" tag="article" />
                <div class="sidebar-bottom">
                    <ButtonLink v-for="link in meta.links" 
                        :key="link.url" :link="link.url" :icon="useLinkIcon(link)"></ButtonLink>
                </div>
            </template>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage>
                {{ $t('error-page-not-found') }}&nbsp;
                <PathLine>
                    <NuxtLink to="/">{{ $t('link-home') }}</NuxtLink>
                    <BreadcrumbDivider />
                    <NuxtLink to="/docs/">{{ $t('link-docs') }}</NuxtLink>
                    <BreadcrumbDivider />
                    <NuxtLink v-if="project" :to="'/docs/' + project.slug.toLowerCase()">{{ meta.name }}</NuxtLink>
                    <InvalidPage v-else :name="$route.params.project" />
                    <BreadcrumbDivider v-if="$route.params.topic" />
                    <InvalidPage v-if="$route.params.topic" :name="$route.params.topic" />
                </PathLine>
            </ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { locale, t } = useI18n()
const { params } = useRoute()
const { content: sidebar } = await useDocsPage(params.project.toLowerCase(), '_sidebar');
const project = await useProject(params.project.toLowerCase());
const { metadata: meta } = project.value || {};
const { title, content } = await useDocsPage(params.project.toLowerCase(), params.topic ? params.topic.toLowerCase() : 'home', locale);
const description = computed(() => {
    let desc = content.replace(/<[^>]+>/g, '');
    if (desc.includes('\n')) {
        desc = desc.split('\n')[0];
    }
    return desc.length > 128 ? `${desc.slice(0, 128)}...` : desc;
});

// Breadcrumbs
const breadcrumbs = [{ name: t('link-home'), link: '/' }, { name: t('link-docs'), link: '/docs' }];
if (params.topic) {
    breadcrumbs.push({ name: meta.name, link: `/docs/${project.value.slug}` });
}
</script>

<style scoped>
.sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar-top .project-title {
    color: white !important;
    font-size: x-large;
    font-weight: bold;
}

.sidebar-top .project-buttons {
    display: flex;
    gap: 0.5rem;
}

.sidebar-bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1.5rem 0 0.25rem 0;
    gap: 0.5rem;
}
</style>