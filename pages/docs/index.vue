<template>
    <div>
        <NuxtLayout name="docs">
            <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }]" />

            <Head>
                <Title>{{ $t('link-docs') }}</Title>
                <Meta name="og:title" :content="`${t('link-docs')} &ndash; ${t('index-title')}}`" />
                <Meta name="twitter:title" :content="`${t('link-docs')} &ndash; ${t('index-title')}}`" />
            </Head>
            <article>
                <LazyContentDoc :path="`/docs/home/${locale}`"  />
            </article>
            <template #sidebar>
                <h1>{{ $t('link-projects') }}</h1>
                <LazyContentDoc :head="false" path="/docs/sidebar" />
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { locale, t } = useI18n()
const localePath = useLocalePath()
</script>