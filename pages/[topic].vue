<template>
    <div>
        <NuxtLayout>
            <Head>
                <Meta name="og:image" :content="`/images/thumbnails/page/${params.topic}/card.png`" />
                <Meta name="twitter:image" :content="`/images/thumbnails/page/${params.topic}/card.png`" />
                <Meta name="twitter:card" content="summary_large_image" />
                <Meta name="twitter:creator" content="@William27528" />
            </Head>
            <LazyContentDoc>
                <template v-slot="{ doc }">
                    <ContentRenderer :value="doc">
                        <article class="page-content">
                            <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                            <ContentRendererMarkdown :value="doc" />
                        </article>
                    </ContentRenderer>
                </template>
                <template #not-found>
                    <ErrorPage>
                        {{ $t('error-page-not-found') }} &nbsp;
                        <PathLine>
                            <NuxtLink to="/">{{ $t('link-home') }}</NuxtLink>
                            <BreadcrumbDivider />
                            <InvalidPage :name="$route.params.topic" />
                        </PathLine>
                    </ErrorPage>
                </template>
            </LazyContentDoc>
        </NuxtLayout>
    </div>
</template>

<script setup>
import InvalidPage from '../components/InvalidPage.vue';
import PathLine from '../components/content/PathLine.vue';

const { t } = useI18n()
</script>

<style scoped>
.page-content {
    margin-top: 1rem;
    max-width: 95vw;
    width: 1100px;
}
</style>