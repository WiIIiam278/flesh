<template>
    <NuxtLayout>
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }]" />
        <article>
            <ContentDoc />
        </article>
        <template #sidebar>
            <h1>Projects</h1>
            <DocsSearch />
            <ContentDoc path="docs/sidebar" />
        </template>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    layout: 'docs'
});
</script>
