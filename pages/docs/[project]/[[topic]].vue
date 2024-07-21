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
                    <Meta v-if="meta.icons['PNG']" name="og:image" :content="`/images/icons/${meta.icons['PNG']}`" />
                    <Meta v-if="meta.icons['PNG']" name="twitter:image" :content="`/images/icons/${meta.icons['PNG']}`" />
                </Head>
                <Overbar>
                    <Breadcrumbs :crumbs="breadcrumbs" />
                    <span class="translate-edit">
                        <ButtonLink hollow icon="fa6-solid:pencil" :link="`${meta.repository}/tree/master/docs`">{{ $t('docs-edit-button') }}</ButtonLink>
                        <ButtonLink hollow icon="fa6-solid:language" link="/translate">{{ $t('docs-translate-button') }}</ButtonLink>
                    </span>
                </Overbar>
                <article>
                    <h1 v-if="params.topic">{{ title }}</h1>
                    <MDC :value="content" tag="article" />
                </article>
            </template>
            <template #sidebar>
                <h1 id="sidebar-title">
                    <NuxtLink :to="'/docs/' + project.slug">
                        <IconifiedProject centered :project="project" />
                    </NuxtLink>
                </h1>
                <MDC :value="sidebar" tag="article" />
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
.translate-edit {
    display: flex;
    gap: 0.35rem;
    margin: 0.5rem 0;
}
</style>