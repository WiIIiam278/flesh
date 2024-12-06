<template>
    <div>
        <Head>
            <Title>William278.net &ndash; {{ $t('posts-title') }} &ndash; {{ post.title }}</Title>
            <Meta name="description" content="Latest news and update posts from William278.net." />
            <Meta name="og:image" content="/images/thumbnails/page/Post/card.png" /> <!-- todo -->
            <Meta name="twitter:image" content="/images/thumbnails/page/Post/card.png" /> <!-- todo -->
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
        <NuxtLayout v-if="post">
            <article class="page-content">
                <BreadcrumbsBar>
                    <Breadcrumbs :crumbs="[{ name: $t('link-home'), link: '/' }, { name: $t('link-posts'), link: '/posts' }]" />
                    <div class="controls">
                        <ButtonLink v-if="canEdit" :icon="`fa6-solid:${editing ? 'floppy-disk' : 'pencil'}`" type="primary"  @click="savePost()">{{ $t(`post-action-${editing ? 'save' : 'edit'}`) }}</ButtonLink>
                        <ButtonLink v-if="!editing" icon="fa6-solid:chevron-left" type="red" to="/posts">{{ $t('link-back') }}</ButtonLink>
                        <ButtonLink v-if="editing" icon="fa6-solid:wrench" @click="editSlug()">{{ $t('post-action-edit-slug') }}</ButtonLink>
                        <ButtonLink v-if="editing" type="red" icon="fa6-solid:trash" @click="deletePost()">{{ $t('post-action-delete') }}</ButtonLink>
                    </div>
                </BreadcrumbsBar>
                <h1 v-if="!editing">{{ post.title }}</h1>
                <input class="title-editor" v-else v-model="post.title" :placeholder="t('post-title')">
                <div class="details">
                    <div class="time-n-tag row">
                        <NuxtLink v-if="!editing && post.associatedProject" class="project" :to="`/project/${post.associatedProject.slug}`">
                            <IconifiedProject :project="post.associatedProject" />
                        </NuxtLink>
                         <IconifiedText v-else-if="editing" icon="fa6-solid:box" class="project">
                            <select v-model="associated" :placeholder="t('post-category')">
                                <option :value="null">{{ $t('post-no-associated-project') }}</option>
                                <option v-for="project of allProjects" :value="project.slug">{{ project.metadata.name }}</option>
                            </select>
                        </IconifiedText>
                        <IconifiedText icon="fa6-solid:tag" class="time">
                            <span v-if="!editing">{{ $t(`post-category-${post.category}`) }}</span>
                            <select v-else v-model="post.category" :placeholder="t('post-category')">
                                <option value="changelogs">{{ $t('post-category-changelogs') }}</option>
                                <option value="news">{{ $t('post-category-news') }}</option>
                                <option value="promotions">{{ $t('post-category-promotions') }}</option>
                            </select>
                        </IconifiedText>
                        <IconifiedText icon="fa6-solid:calendar" class="time">{{ useTimeFormat(post.timestamp, true) }}</IconifiedText>
                    </div>
                    <div class="author row">
                        <img :src="post.authorAvatar ?? '/images/icons/william278.svg'" />
                        <span>{{ post.authorName ? useCapitalized(post.authorName) : 'Staff' }}</span>
                    </div>
                </div>
                <MDC v-if="!editing" class="body" :value="post.body.length ? post.body : '<br/>'" />
                <textarea class="body" v-model="post.body" :placeholder="t('post-body')" v-else></textarea>
                <Notice title="Warning" type="warning" v-if="editing && post.versionUpdate">{{ $t('post-version-update-edit-warning') }}</Notice>
                <div class="buttons">
                    <ButtonLink icon="fa6-solid:chevron-left" :to="`/posts`">{{ $t('link-more-posts') }}</ButtonLink>
                    <ButtonLink v-if="post.versionUpdate && post.associatedProject" icon="fa6-solid:download" type="primary" :to="`/project/${post.associatedProject.slug}/download`">{{ $t('link-download') }}</ButtonLink>
                </div>
            </article>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage :code="404">{{ $t('error-transcript-not-found') }}</ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const SLUG_REGEX = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const validateSlug = (slug) => SLUG_REGEX.test(slug);

const { t } = useI18n()
const { auth, xsrf } = useAuth();
const { slug } = useRoute()?.params;

const associated = defineModel('associated');
const editing = ref(false);
const slugChanged = ref(false);

const user = await useUser();
const post = await usePost(slug);
associated.value = post?.value?.associatedProject?.slug ?? null;
const canEdit = user.value ? useIsUserRole(user.value, 'admin') : false;
const allProjects = canEdit ? await useAllProjects() : null;

const savePost = async () => {
    if (editing.value) {
        await putPost();
    }
    editing.value = !editing.value;

    if (slugChanged.value) {
        navigateTo(`/posts/${post.value.slug}`, { external: true });
    }
}

const editSlug = async () => {
    useInput(t('post-enter-slug'), t('post-action-edit-slug', { 'url': FRONTEND_URL }),
            post.value.slug, (input) => validateSlug(input), async (confirm, slug) => {
        if (!confirm) return;
        post.value.slug = slug;
        slugChanged.value = true;
        await savePost();
    })
}

const putPost = async () => {
    post.value.associatedProject = associated.value ? await useProject(associated.value) : null;
    post.value = await $fetch(`${BASE_URL}/v1/posts/${slug}`, 
    { 
        method: 'PUT',
        credentials: auth ? 'include' : 'omit',
        headers: {
            'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
            'X-XSRF-TOKEN': xsrf
        },
        body: JSON.stringify(post.value)
    });
}

const deletePost = async () => {
    useConfirm(t('post-delete-confirm'), t('post-action-delete'), async (confirm) => {
        if (!confirm) return;
        try {
            await $fetch(`${BASE_URL}/v1/posts/${slug}`, 
            { 
                method: 'DELETE',
                credentials: auth ? 'include' : 'omit',
                headers: {
                    'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                    'X-XSRF-TOKEN': xsrf
                }
            });
        } catch (err) {
            useAlert('Failed to delete post: ' + err, 'Error');
            return;
        }
        navigateTo('/posts');
    })
}
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

.page-content .title-editor {
    width: 100%;
    margin: 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 800;
}

.details {
    display: flex;
    justify-content: space-between;
    color: var(--light-gray)
}

.warning {
    color: gold;
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    gap: 0.5rem;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.details .time-n-tag {
    gap: 1.25rem !important;
}

.row img {
    width: 32px;
    border-radius: 50%;
}

textarea.body {
    width: 100%;
    min-height: 40vh;
    margin: 0.5rem 0;
}

.time select {
    width: 120px;
}

.project select {
    width: 200px;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    margin-top: 1.5rem;
}
</style>