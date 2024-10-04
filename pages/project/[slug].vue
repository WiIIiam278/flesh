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
                    <div v-if="meta.archived" class="archived">
                        <Icon class="icon" name="fa6-solid:box-archive" />
                        <span class="text">
                            {{ $t('project-archived-header', {'project': meta.name}) }}
                            <span class=grayed>{{$t('project-archived-details')}}</span>
                        </span>
                    </div>
                    <Tabs :tabs="tabs" v-model:selected="selectedTab">
                        <MDC v-if="selectedTab === 'about'" :value="readme" tag="article" />
                        <div v-if="selectedTab === 'download'">
                            <DownloadsMenu :project="project" />
                        </div>
                        <div v-if="selectedTab === 'play'">
                            <DsEmulator :game-name="meta.name" :game-core="useProjectProperty(project, 'emulator_core') ?? 'desmume2015'"
                                :game-url="`/emulator-js/roms/${project.slug}`" />
                        </div>
                    </Tabs>
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

// Setup tabs
const tabs = [{ id: 'about', name: t('tab-about') }];
const selectedTab = defineModel('selectedTab')
selectedTab.value = 'about';
if (meta?.listDownloads) {
    tabs.unshift({ id: 'download', name: t('tab-download') });
    selectedTab.value = 'download';
}
if (useProjectProperty(project.value, 'emulator_rom')) {
    tabs.unshift({ id: 'play', name: t('tab-play') });
    selectedTab.value = 'play';
}
</script>

<style scoped>
.archived {
    display: flex;
    align-items: center;
    padding: 1rem;
    color: var(--light-gray);
    border: 0.2rem solid var(--light-gray);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.archived .icon {
    font-size: 2rem;
    margin-right: 1rem;
}
</style>