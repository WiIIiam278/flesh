<template>
    <div>
        <Head>
            <Title>William278.net &ndash; Posts &ndash; {{ post.title }}</Title>
            <Meta name="description" content="Latest news and update posts from William278.net." />
            <Meta name="og:image" content="/images/thumbnails/page/Posts/card.png" />
            <Meta name="twitter:image" content="/images/thumbnails/page/Posts/card.png" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
        <NuxtLayout v-if="post">
            <article class="page-content">
                <BreadcrumbsBar>
                    <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }, { name: $t('link-posts'), link: '/posts' }]" />
                    <ButtonLink icon="fa6-solid:chevron-left" type="red" to="/posts">{{ $t('link-back') }}</ButtonLink>
                </BreadcrumbsBar>
                <h1>{{ post.title }}</h1>
                <div class="details">
                    <div class="time-n-tag">
                        <NuxtLink v-if="associated" class="project" :to="`/project/${associated.slug}`">
                            <IconifiedProject :project="associated" />
                        </NuxtLink>
                        <IconifiedText icon="fa6-solid:tag" class="time">{{ $t(`post-category-${post.category}`) }}</IconifiedText>
                        <IconifiedText icon="fa6-solid:calendar" class="time">{{ useTimeFormat(post.timestamp, true) }}</IconifiedText>
                    </div>
                    <div class="author">
                        <img :src="post.authorAvatar ?? '/images/icons/william278.svg'" />
                        <span>{{ post.authorName ? useCapitalized(post.authorName) : 'Staff' }}</span>
                    </div>
                </div>
                <MDC class="body" :value="post.body" />
                <div class="buttons">
                    <ButtonLink icon="fa6-solid:chevron-left" :to="`/posts`">{{ $t('link-more-posts') }}</ButtonLink>
                    <ButtonLink v-if="associated && (post.category === 'changelogs')" icon="fa6-solid:download" type="primary" :to="`/project/${associated.slug}/download`">{{ $t('link-download') }}</ButtonLink>
                </div>
            </article>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage :code="404">{{ $t('error-transcript-not-found') }}</ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { slug } = useRoute()?.params;
const post = await usePost(slug);
const associated = post.value.associatedProject ? await useProject(post.value.associatedProject) : null;
</script>

<style scoped>
.page-content {
    margin-top: 1rem;
    max-width: 95vw;
    width: 1000px;
}

.page-content h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;;
}

.details {
    display: flex;
    justify-content: space-between;
    color: var(--light-gray)
}

.details .time-n-tag, .details .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.details .time-n-tag {
    gap: 1.25rem !important;
}

.author img {
    width: 32px;
    border-radius: 50%;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    margin-top: 1.5rem;
}
</style>