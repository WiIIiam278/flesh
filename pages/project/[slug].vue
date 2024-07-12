<template>
    <div>
        <NuxtLayout v-if="project" name="project">
            <ContentDoc v-slot="{ doc }" :head="false">
                <Head>
                    <Title>{{ $t('project-title', {'project': project.name, 'tagline': project.tagline})}}</Title>
                    <Meta name="og:description" :content="`${t('project-title', {'project': project.name, 'tagline': project.tagline})}`" />
                    <Meta name="twitter:description" :content="`${t('project-title', {'project': project.name, 'tagline': project.tagline})}`" />
                    <Meta name="og:title" :content="`${project.name} &mdash; ${t('index-title')}`" />
                    <Meta name="twitter:title" :content="`${project.name} &mdash; ${t('index-title')}`" />
                    <Meta v-if="project.icon && project.icon.png" name="og:image"
                        :content="`/images/icons/${project.icon.png}`" />
                    <Meta v-if="project.icon && project.icon.png" name="twitter:image"
                        :content="`/images/icons/${project.icon.png}`" />
                </Head>
                <div v-if="project.discontinued" class="discontinued">
                    <Icon class="icon" name="fa6-solid:box-archive" />
                    <span class="text">
                        {{ $t('project-archived-header', {'project': project.name}) }}
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
                        <DsEmulator :game-name="project.name" :game-core="project.emulator.core"
                            :game-url="`/emulator-js/roms/${project.id}`" />
                    </div>
                </Tabs>
            </ContentDoc>
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
import projects from '/assets/data/projects.json'
const { t } = useI18n()
const { params } = useRoute()

// Get the project
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.slug.toLowerCase()))

// Setup tabs
const tabs = [{ id: 'about', name: t('tab-about') }];
const selectedTab = defineModel('selectedTab')
selectedTab.value = 'about';
if (project.value?.releases) {
    tabs.push({ id: 'download', name: t('tab-download') }); 
}
if (project.value?.emulator) {
    tabs.unshift({ id: 'play', name: t('tab-play') });
    selectedTab.value = 'play';
}
</script>

<style scoped>
.discontinued {
    display: flex;
    align-items: center;
    padding: 1rem;
    color: var(--light-gray);
    border: 0.2rem solid var(--light-gray);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.discontinued .icon {
    font-size: 2rem;
    margin-right: 1rem;
}
</style>