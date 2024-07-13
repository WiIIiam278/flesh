<template>
    <div>
        <NuxtLayout v-if="project && project.metadata.documentation" name="docs">
            <Head>
                <Title>{{ $t('docs-title', {'project': project.metadata.name}) }}</Title>
                <Meta name="og:title" :content="`${t('docs-title', {'project': project.metadata.name})} &mdash; ${t('index-title')}`" />
                <Meta name="twitter:title" :content="`${t('docs-title', {'project': project.metadata.name})} &mdash; ${t('index-title')}`" />
                <Meta name="description" :content="description" />
                <Meta name="og:description" :content="description" />
                <Meta name="twitter:description" :content="description" />
                <Meta v-if="project.metadata.icons['PNG']" name="og:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
                <Meta v-if="project.metadata.icons['PNG']" name="twitter:image" :content="`/images/icons/${project.metadata.icons['PNG']}`" />
            </Head>
            <Overbar>
                <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }, { name: t('link-docs'), link: '/docs' }]" />
                <span>
                    <ButtonLink hollow icon="fa6-solid:pencil" :link="`${project.metadata.repository}/tree/master/docs`">{{ $t('docs-edit-button') }}</ButtonLink>
                    <ButtonLink hollow icon="fa6-solid:language" link="/translate">{{ $t('docs-translate-button') }}</ButtonLink>
                </span>
            </Overbar>
            <article>
                <LazyContentDoc :head="false" :path="'/docs/project/' + project.slug + '/' + locale + '/home'" />
            </article>
            <template #sidebar>
                <h1>
                    <IconifiedProject centered :project="project" />
                </h1>
                <LazyContentDoc :head="false" :path="'/docs/project/' + project.slug + '/' + locale + '/_sidebar'" />
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
                    <InvalidPage v-if="project" :name="project.metadata.name" />
                    <InvalidPage v-else :name="$route.params.project" />
                </PathLine>
            </ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
import InvalidPage from '../../../components/InvalidPage.vue';
import PathLine from '../../../components/content/PathLine.vue';

const { locale, t } = useI18n()
const { params } = useRoute()

const project = await useProject(params.project.toLowerCase());
const description = computed(() => project.value ? `Welcome to the documentation for ${project.value.metadata.name} &mdash; ${project.value.metadata.tagline} &mdash; available on William278.net` : 'William278.net')
</script>