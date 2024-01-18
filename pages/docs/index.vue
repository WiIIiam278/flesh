<template>
    <div>
        <NuxtLayout name="docs">
            <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }]" />

            <Head>
                <Title>Docs</Title>
                <Meta name="og:title" content="Docs &mdash; William278.net" />
                <Meta name="twitter:title" content="Docs &mdash; William278.net" />
            </Head>
            <article>
                <ContentDoc />
            </article>
            <template #sidebar>
                <h1>Projects</h1>
                <ContentDoc :head="false" path="docs/sidebar" />
            </template>
        </NuxtLayout>
    </div>
</template>