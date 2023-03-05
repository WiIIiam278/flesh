<template>
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
                    <NuxtLink to="/">Home</NuxtLink>
                    <BreadcrumbDivider />
                    <InvalidPage :name="$route.params.topic" />
                </ErrorPage>
            </template>
        </ContentDoc>
    </NuxtLayout>
</template>

<script setup>
import InvalidPage from '../components/InvalidPage.vue';

</script>
