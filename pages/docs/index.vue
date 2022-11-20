<template>
    <NuxtLayout name="docs">
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }]" />
        <article>
            <ContentDoc />
        </article>
        <template #sidebar>
            <h1>Projects</h1>
            <DocsSearch />
            <ContentDoc :head="false" path="docs/sidebar" />
        </template>
    </NuxtLayout>
</template>