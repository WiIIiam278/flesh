<template>
    <div>
        <NuxtLayout v-if="project" name="project">
            <template #default>
                <div>
                    <Head>
                        <Title>{{ $t('project-title', {'project': meta.name, 'tagline': meta.tagline})}}</Title>
                        <Meta name="og:description" :content="`${t('project-title', {'project': meta.name, 'tagline': meta.tagline})}`" />
                        <Meta name="twitter:description" :content="`${t('project-title', {'project': meta.name, 'tagline': meta.tagline})}`" />
                        <Meta name="og:title" :content="`${meta.name} &ndash; ${t('index-title')}`" />
                        <Meta name="twitter:title" :content="`${meta.name} &ndash; ${t('index-title')}`" />
                        <Meta name="og:image" :content="`/images/thumbnails/project/${project.slug}/card.png`" />
                        <Meta name="twitter:image" :content="`/images/thumbnails/project/${project.slug}/card.png`" />
                        <Meta name="twitter:card" content="summary_large_image" />
                        <Meta name="twitter:creator" content="@William27528" />
                    </Head>
                    <ArchivalNotice v-if="meta.archived" :name="meta.name" />
                    <BreadcrumbsBar>
                        <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                        <ButtonLink v-if="meta?.listDownloads" :link="`/project/${project.slug}/download`" icon="fa6-solid:download" type="primary">
                            {{ $t('link-download') }}
                        </ButtonLink>
                    </BreadcrumbsBar>
                    <ProjectPage :project="project" />
                </div>
            </template>
            <template #sidebar>
                <ProjectSidebar :project="project" />
            </template>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage code="404">
                {{ $t('error-page-not-found') }}&nbsp;
                <PathLine>
                    <NuxtLink to="/">{{ $t('link-home') }}</NuxtLink>
                    <BreadcrumbDivider />
                    <InvalidPage :name="$route.params.slug" />
                </PathLine>
            </ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { t } = useI18n()
const { params } = useRoute()
const project = await useProject(params.slug.toLowerCase());
const { metadata: meta } = project.value || {};
</script>