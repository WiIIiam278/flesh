<template>
    <div>
        <Head>
            <Title>William278.net &ndash; Posts</Title>
            <Meta name="description" content="Latest news and update posts from William278.net." />
            <Meta name="og:image" content="/images/thumbnails/page/Posts/card.png" />
            <Meta name="twitter:image" content="/images/thumbnails/page/Posts/card.png" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
        <NuxtLayout>
            <article class="page-content">
                <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                <h1>Posts</h1>
                <div class="posts">
                    <PostPreview v-for="post of posts.value.content" type="stack" :post="post" />
                </div>
                <Pagination v-if="posts.value" :data="posts.value" v-on:update="(page, perPage) => updatePosts(page, perPage)" />
            </article>
        </NuxtLayout>
    </div>
</template>

<script setup>
const pageNumber = ref(1);
const itemsPerPage = ref(15);
const posts = ref(null);
const searchText = ref('');

const updatePosts = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    posts.value = await useAllPosts(pageNumber.value - 1, itemsPerPage.value, searchText.value);
});
await updatePosts(pageNumber.value, itemsPerPage.value);
</script>

<style scoped>
.page-content {
    margin: 1rem 0;
    max-width: 95vw;
    width: 1000px;
}

.page-content h1 {
    margin-top: 0;
}

.posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>