<template>
    <div>
        <NuxtLayout v-if="project && project.documentation" name="docs">
            <Head>
                <Title>{{ $t('docs-title', {'project': project.name}) }}</Title>
                <Meta name="og:title" :content="`${t('docs-title', {'project': project.name})} &mdash; ${t('index-title')}`" />
                <Meta name="twitter:title" :content="`${t('docs-title', {'project': project.name})} &mdash; ${t('index-title')}`" />
                <Meta name="description" :content="description" />
                <Meta name="og:description" :content="description" />
                <Meta name="twitter:description" :content="description" />
                <Meta v-if="project.icon && project.icon.png" name="og:image"
                    :content="`/images/icons/${project.icon.png}`" />
                <Meta v-if="project.icon && project.icon.png" name="twitter:image"
                    :content="`/images/icons/${project.icon.png}`" />
            </Head>
            <Overbar>
                <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }, { name: t('link-docs'), link: '/docs' }]" />
                <ButtonLink hollow icon="fa6-solid:pencil" :link="`${project.repository}/tree/master/docs`">
                    {{ $t('docs-edit-button') }}
                </ButtonLink>
            </Overbar>
            <article>
                <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/home'" />
            </article>
            <template #sidebar>
                <h1>
                    <IconifiedProject centered :project="project" />
                </h1>
                <ContentDoc :head="false" :path="'/docs/project/' + project.id.toLowerCase() + '/_sidebar'" />
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
                    <InvalidPage v-if="project" :name="project.name" />
                    <InvalidPage v-else :name="$route.params.project" />
                </PathLine>
            </ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
import InvalidPage from '../../../components/InvalidPage.vue';
import PathLine from '../../../components/content/PathLine.vue';
import projects from '/assets/data/projects.json'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { params } = useRoute()
const project = computed(() => projects.find(project => project.id.toLowerCase() === params.project.toLowerCase()))
const description = computed(() => project.value ? `Welcome to the documentation for ${project.value.name} &mdash; ${project.value.tagline} &mdash; available on William278.net` : 'William278.net')
</script>