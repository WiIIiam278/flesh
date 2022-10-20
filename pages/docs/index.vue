<template>
    <NuxtLayout>
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }]" />
        <article>
            <ContentDoc />
        </article>
        <template #sidebar>
            <ContentDoc path="docs/sidebar" />
        </template>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    layout: 'docs'
});
</script>
