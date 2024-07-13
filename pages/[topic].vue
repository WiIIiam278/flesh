<template>
    <div>
        <NuxtLayout>
            <LazyContentDoc>
                <template v-slot="{ doc }">
                    <ContentRenderer :value="doc">
                        <div>
                            <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />
                            <article>
                                <ContentRendererMarkdown :value="doc" />
                            </article>
                        </div>
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
