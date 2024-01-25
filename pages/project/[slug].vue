<template>
    <div>
        <NuxtLayout v-if="project" name="project">
            <ContentDoc v-slot="{ doc }" :head="false">
                <Head>
                    <Title>{{ project.name }} - {{ project.tagline }}</Title>
                    <Meta name="og:description" :content="`${project.name} &mdash; ${project.tagline}`" />
                    <Meta name="twitter:description" :content="`${project.name} &mdash; ${project.tagline}`" />
                    <Meta name="og:title" :content="`${project.name} &mdash; William278.net`" />
                    <Meta name="twitter:title" :content="`${project.name} &mdash; William278.net`" />
                    <Meta v-if="project.icon && project.icon.png" name="og:image"
                        :content="`/images/icons/${project.icon.png}`" />
                    <Meta v-if="project.icon && project.icon.png" name="twitter:image"
                        :content="`/images/icons/${project.icon.png}`" />
                </Head>
                <div v-if="project.discontinued" class="discontinued">
                    <Icon class="icon" name="fa6-solid:box-archive" />
                    <span class="text">
                        {{ project.name }} has been discontinued. <span class="grayed">I won't be releasing any more updates for it, 
                        and won't be able to answer related support questions&mdash;sorry about that!</span>
                    </span>
                </div>
                <ProjectTabs v-model:selected="activeTab" :project="project">
                    <article v-if="activeTab === 'about'">
                        <ContentRenderer :value="doc" />
                    </article>
                    <div v-if="activeTab === 'download'">
                        <DownloadsMenu :project="project" />
                    </div>
                    <div v-if="activeTab === 'play'">
                        <DsEmulator :game-name="project.name" :game-core="project.emulator.core"
                            :game-url="`/emulator-js/roms/${project.id}`" />
                    </div>
                </ProjectTabs>
            </ContentDoc>
            <template #sidebar>
                <ProjectSidebar :project="project" />
            </template>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage code="404">
                Project not found:&nbsp;
                <PathLine>
                    <NuxtLink to="/">Home</NuxtLink>
                    <BreadcrumbDivider />
                    <InvalidPage :name="$route.params.slug" />
                </PathLine>
            </ErrorPage>
        </NuxtLayout>
    </div>
</template>

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

<script setup>
import PathLine from '../../components/content/PathLine.vue';
import DsEmulator from '../../components/content/DsEmulator.vue';
import DownloadsMenu from '../../components/content/DownloadsMenu.vue';

import projects from '/assets/data/projects.json'

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.slug.toLowerCase()))

const activeTab = defineModel('activeTab')
</script>