<template>
    <div :class="`post ${type}`">
        <div class="title-row">
            <div class="title">
                <Pill v-if="post.category?.length" class="pill">{{ $t(`post-category-${post.category}`) }}</Pill>
                <NuxtLink :to="`/posts/${post.slug}`"><h3 class="post-title">{{ post.title }}</h3></NuxtLink>
            </div>
            <NuxtLink v-if="post.associatedProject" class="project" :to="`/project/${post.associatedProject.slug}`">
                <IconifiedProject :project="post.associatedProject" />
            </NuxtLink>
        </div>
        <MDC class="contents" :value="contents" />
    </div>
</template>

<script setup>
const { post, type } = defineProps({
    post: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'card'
    }
})
const contents = `<span class="date">${useTimeFormat(post.timestamp, true)} &ndash; </span>${post.body.split('\n')[0]}`;
</script>

<style scoped>
.post {
    text-decoration: none !important;
    color: var(--white);
}

.post.mini {
    display: flex;
    flex-direction: column;
}

/* .post.stack {

} */

.post .title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.title .pill, .title .post-title {
    margin: 0;
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
</style>
