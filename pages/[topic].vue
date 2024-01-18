<template>
    <div>
        <NuxtLayout>
            <ContentDoc>
                <template v-slot="{ doc }">
                    <ContentRenderer :value="doc">
                        <div>
                            <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }]" />
                            <article>
                                <ContentRendererMarkdown :value="doc" />
                            </article>
                        </div>
                    </ContentRenderer>
                </template>
                <template #not-found>
                    <ErrorPage>
                        Page not found:&nbsp;
                        <PathLine>
                            <NuxtLink to="/">Home</NuxtLink>
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

</script>
