<template>
    <NuxtLink :to="`/posts/${post.slug}`" :class="`post ${type}`">
        <div class="title-row">
            <Pill v-if="post.category?.length" class="pill">{{ $t(`post-category-${post.category}`) }}</Pill>
            <h3 class="title">{{ post.title }}</h3>
        </div>
        <MDC class="contents" :value="contents" />
    </NuxtLink>
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

.post.stack {

}

.post .title-row {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    line-height: 1.15rem;
    align-items: center;
    margin-bottom: 0.35rem;
}

.title-row .pill, .title-row .title {
    margin: 0;
}

.post .title-row .title {
    color: var(--accent);
}

.post .title-row .title:hover {
    text-decoration: underline !important;
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
