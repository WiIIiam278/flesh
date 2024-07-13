<template>
    <div>
        <NuxtLayout v-if="project" name="project">
            <LazyContentDoc v-slot="{ doc }" :head="false">
                <Head>
                    <Title>{{ $t('project-title', {'project': project.metadata.name, 'tagline': project.metadata.tagline})}}</Title>
                    <Meta name="og:description" :content="`${t('project-title', {'project': project.metadata.name, 'tagline': project.metadata.tagline})}`" />
                    <Meta name="twitter:description" :content="`${t('project-title', {'project': project.metadata.name, 'tagline': project.metadata.tagline})}`" />
                    <Meta name="og:title" :content="`${project.metadata.name} &mdash; ${t('index-title')}`" />
                    <Meta name="twitter:title" :content="`${project.metadata.name} &mdash; ${t('index-title')}`" />
                    <Meta v-if="project.metadata.icons['PNG']" name="og:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
                    <Meta v-if="project.metadata.icons['PNG']" name="twitter:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
                </Head>
                <div v-if="project.metadata.archived" class="archived">
                    <Icon class="icon" name="fa6-solid:box-archive" />
                    <span class="text">
                        {{ $t('project-archived-header', {'project': project.metadata.name}) }}
                        <span class=grayed>{{$t('project-archived-details')}}</span>
                    </span>
                </div>
                <Tabs :tabs="tabs" v-model:selected="selectedTab">
                    <article v-if="selectedTab === 'about'">
                        <ContentRenderer :value="doc" />
                    </article>
                    <div v-if="selectedTab === 'download'">
                        <DownloadsMenu :project="project" />
                    </div>
                    <div v-if="selectedTab === 'play'">
                        <!-- todo revisit -->
                        <DsEmulator :game-name="project.metadata.name" game-core="desmume2015"
                            :game-url="`/emulator-js/roms/${project.metadata.name}`" />
                    </div>
                </Tabs>
            </LazyContentDoc>
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

// Setup tabs
const tabs = [{ id: 'about', name: t('tab-about') }];
const selectedTab = defineModel('selectedTab')
selectedTab.value = 'about';
// if (project.value?.releases) {
//     tabs.push({ id: 'download', name: t('tab-download') }); 
// }
// if (project.value?.emulator) {
//     tabs.unshift({ id: 'play', name: t('tab-play') });
//     selectedTab.value = 'play';
// }
// todo revisit
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