<template>
    <div class="container">
        <div :class="`post ${type}`">
            <div class="title-row">
                <div class="title">
                    <Pill v-if="post.category?.length" class="pill">{{ $t(`post-category-${post.category}`) }}</Pill>
                    <NuxtLink :title="post.title" :to="`/posts/${post.slug}`"><h3 class="post-title">{{ post.title }}</h3></NuxtLink>
                </div>
                <NuxtLink v-if="post.associatedProject && displayProject && !post.imageUrl" class="project" :title="post.associatedProject.name" :to="`/project/${post.associatedProject.slug}`">
                    <IconifiedProject :project="post.associatedProject" />
                </NuxtLink>
            </div>
            <MDC class="contents" :value="contents" />
        </div>
        <NuxtLink class="thumbnail" v-if="post.imageUrl" :title="post.title" :to="`/posts/${post.slug}`">
            <img class="shadow" :src="post.imageUrl" :alt="post.title" />
        </NuxtLink>
    </div>
</template>

<script setup>
const { post, type, displayProject } = defineProps({
    post: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'card'
    },
    displayProject: {
        type: Boolean,
        required: false,
        default: true
    }
})
const contents = `<span class="date">${useTimeFormat(post.timestamp, true)} &ndash; </span>${post.body.split('\n')[0]}`;
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.container img {
    width: 100%;
    height: auto;
    max-width: 200px;
    max-height: 200px;
    border-radius: 0.5rem;
}

.post {
    text-decoration: none !important;
    color: var(--white);
    width: 100%;
}

.post.mini {
    display: flex;
    flex-direction: column;
}

.title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    container-type: inline-size;
    line-height: 1.15rem;
    margin-bottom: 0.35rem;
}

.title-row .title, .title-row .project {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-row .title {
    gap: 0.5rem;
}

.title .pill {
    color: var(--white) !important;
}

.title .pill, .title .post-title {
    margin: 0;
    line-height: 1.15;
}

.post .title-row .title {
    color: var(--accent);
}

.post .body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.post:deep(.contents) {
    padding: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    text-overflow: elipsis;
}

.post.mini:deep(.contents) {
    max-height: 3em;
}

.post.stack:deep(.contents) {
    max-height: 11em;
}

.post:deep(.contents p) {
    margin: 0;
}

.post:deep(.contents .date) {
    color: var(--light-gray);
}

@container (width < 450px) {
    .title-row .project {
        display: none;
    }
}
</style>
