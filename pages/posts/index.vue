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
                <BreadcrumbsBar>
                    <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }]" />
                    <ButtonLink v-if="canEdit" type="primary" icon="fa6-solid:plus" @click="createPost()">{{ $t('post-action-new') }}</ButtonLink>
                </BreadcrumbsBar>
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
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const SLUG_REGEX = new RegExp(/^[a-z0-9]+(?:.-[a-z0-9]+)*$/);

const pageNumber = ref(1);
const itemsPerPage = ref(15);
const posts = ref(null);
const searchText = ref('');

const { t } = useI18n()
const { auth, xsrf } = useAuth();

const user = await useUser();
const canEdit = user.value ? useIsUserRole(user.value, 'admin') : false;

const updatePosts = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    posts.value = await useAllPosts(pageNumber.value - 1, itemsPerPage.value, searchText.value);
});
await updatePosts(pageNumber.value, itemsPerPage.value);

const validateSlug = (slug) => SLUG_REGEX.test(slug);

const createPost = async () => {
    useInput(t('post-enter-slug'), t('post-action-edit-slug', { 'url': FRONTEND_URL }),
            '', (input) => validateSlug(input), async (confirm, slug) => {
        if (!confirm) return;
        await putPost(slug);
        navigateTo(`/posts/${slug}`);
    })
}

const putPost = async (slug) => {
    await $fetch(`${BASE_URL}/v1/posts/${slug}`, 
    { 
        method: 'PUT',
        credentials: auth ? 'include' : 'omit',
        headers: {
            'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
            'X-XSRF-TOKEN': xsrf
        },
        body: JSON.stringify({
            slug: slug,
            title: useCapitalized(slug.replaceAll('-', ' ')),
            body: 'Lorem ipsum',
            category: 'news'
        })
    });
}
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