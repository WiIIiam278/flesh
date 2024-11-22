<template>
    <div>
        <NuxtLayout v-if="project" name="project">
            <template #default>
                <div>
                    <Head>
                        <Title>{{ $t('download-project-title', {'project': meta.name, 'tagline': meta.tagline})}}</Title>
                        <Meta name="og:description" :content="`${t('download-project-title', {'project': meta.name, 'tagline': meta.tagline})}`" />
                        <Meta name="twitter:description" :content="`${t('download-project-title', {'project': meta.name, 'tagline': meta.tagline})}`" />
                        <Meta name="og:title" :content="`${meta.name} &ndash; ${t('index-title')}`" />
                        <Meta name="twitter:title" :content="`${meta.name} &ndash; ${t('index-title')}`" />
                        <Meta name="og:image" :content="`/images/thumbnails/project/${project.slug}/card.png`" />
                        <Meta name="twitter:image" :content="`/images/thumbnails/project/${project.slug}/card.png`" />
                        <Meta name="twitter:card" content="summary_large_image" />
                        <Meta name="twitter:creator" content="@William27528" />
                    </Head>
                    <ArchivalNotice v-if="meta.archived" :name="meta.name" />
                    <div class="menu">
                        <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }, { name: meta.name, link: `/project/${project.slug}/download`}]" />
                        <NuxtLink class="back-button" :href="`/project/${project.slug}/`">
                            <span>{{ $t('link-back') }}</span>
                        </NuxtLink>
                    </div>
                    <DownloadsMenu :project="project" />
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
const readme = computed(() => {
    let body = meta.readmeBody;
    if (!body) return body;

    // Replace relative links and images with GitHub links
    const rawGithub = meta.github.replace('github.com', 'raw.githubusercontent.com');
    body = body.replace(/\]\((?!http)([^)]+)\)/g, `](${meta.github}/master/$1)`);
    body = body.replace(/!\[(.*?)\]\((?!http)([^)]+)\)/g, `![$1](${rawGithub}/master/$2)`);
    body = body.replace(/<img([^>]+)src="(?!http)([^"]+)"([^>]*)>/g, `<img$1src="${rawGithub}/master/$2"$3>`);
    return body;
})
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.back-button {
    height: min-content;
    padding: 0.35rem 0.85rem;
    border: 0.15rem solid var(--gray);
    border-radius: 0.5rem;
    background-color: var(--gray);
    color: var(--accent);
    cursor: pointer;
    display: flex;
    margin-right: 0.5rem;
}

.back-button:hover {
    background-color: var(--background);
    text-decoration: none;
}
</style>