<template>
    <div>
        <NuxtLayout>
            <ContentDoc>
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
            </ContentDoc>
        </NuxtLayout>
    </div>
</template>

<script setup>
import InvalidPage from '../components/InvalidPage.vue';
import PathLine from '../components/content/PathLine.vue';

const { locale, t } = useI18n()
const localePath = useLocalePath()
</script>
