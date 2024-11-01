<template>
    <div>
        <Head>
            <Title>{{ $t('docs-home-title') }}</Title>
            <Meta name="og:title" :content="`${t('link-docs')} &ndash; ${t('index-title')}}`" />
            <Meta name="twitter:title" :content="`${t('link-docs')} &ndash; ${t('index-title')}}`" />
            <Meta name="og:image" content="/images/thumbnails/page/docs/card.png" />
            <Meta name="twitter:image" content="/images/thumbnails/page/docs/card.png" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
        <NuxtLayout>
            <article class="page-content">
                <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                <h1>{{ $t('docs-home-title') }}</h1>
                <p>{{ $t('docs-home-copy') }}</p>
                <div class="docs-sitemap">
                    <div class="project-section" v-for="{project, pages} in docPages">
                        <hr/>
                        <NuxtLink class="project-title" :href="`/docs/${project.slug}`">
                            <IconifiedProject :project="project" />
                        </NuxtLink>
                        <div class="project-links">
                            <NuxtLink v-for="entry in pages.filter(e => !e[0].startsWith('_') && e[0] !== 'home') ?? []"
                                :href="`/docs/${project.slug}/${entry[0]}`">
                                {{ entry[1] }}
                            </NuxtLink>
                        </div>
                        <div class="project-buttons">
                            <ButtonLink v-if="project.metadata.listDownloads" :href="`/project/${project.slug}#download`" icon="fa6-solid:download" hollow>
                                {{ $t('link-download') }}
                            </ButtonLink>
                            <ButtonLink v-if="project.metadata.github" :href="project.metadata.github" icon="fa6-brands:github" hollow>
                                {{ $t('project-link-repository') }}
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </article>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { t } = useI18n()
const docPages = ref([])

// Get doc pages
const projects = await useAllProjects();
projects.value?.filter(p => p.metadata.documentation)
    .sort((a, b) => b.stats?.downloadCount - a.stats?.downloadCount)
    .forEach(async (p) => docPages.value.push({ project: p, pages: await useDocsPageList(p.slug) }));
</script>

<style scoped>
.docs-sitemap {
    margin-bottom: 2rem;
}

.project-section {
    padding: 0.5rem 0;
}

.project-title {
    font-size: larger;
    font-weight: bold;
    color: white !important;
}

.project-links {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0.35rem;
}

.project-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.footer {
    margin-top: 2rem;
    font-size: small;
}

.page-content {
    margin-top: 1rem;
    max-width: 95vw;
    width: 1100px;
}

.page-content h1 {
    margin-top: 0;
}


/* Mobile columns */
@media screen and (max-width: 875px) {
    .project-links {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
}

@media screen and (max-width: 550px) {
    .project-links {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
    }
}
</style>