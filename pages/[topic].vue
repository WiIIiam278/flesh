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
                    <template #empty>
                        <ErrorPage>Page not found: /{{ $route.params.topic }}</ErrorPage>
                    </template>
                </ContentRenderer>
            </template>
        </ContentDoc>
    </NuxtLayout>
</template>

<script setup>
</script>
