<template>
    <div class="container">
        <NuxtLink class="thumbnail" :title="post.title" :to="`/posts/${post.slug}`">
            <img v-if="post.imageUrl" class="shadow" :src="`${ASSETS_URL}/${post.imageUrl}`" :alt="post.title" />
            <img v-else class="shadow" :src="`/images/thumbnails/posts/${post.slug}/thumb.png`" :alt="post.title" />
        </NuxtLink>
        <div class="post">
            <div class="title-row">
                <NuxtLink class="name" :title="post.title" :to="`/posts/${post.slug}`"><h3 class="post-title">{{ post.title }}</h3></NuxtLink>
                <div class="details">
                    <div class="time-project">
                        <IconifiedText icon="fa6-solid:calendar">{{ useTimeFormat(post.timestamp) }}</IconifiedText>
                        <NuxtLink v-if="post.associatedProject && displayProject && !post.imageUrl" class="project" :title="post.associatedProject.name" :to="`/project/${post.associatedProject.slug}`">
                            <IconifiedProject :project="post.associatedProject" />
                        </NuxtLink>
                    </div>
                    <IconifiedText class="tags" icon="fa6-solid:tag">
                        <Pill v-if="post.category?.length" class="pill">{{ $t(`post-category-${post.category}`) }}</Pill>
                    </IconifiedText>
                </div>
            </div>
            <MDC class="contents" :value="post.body.split('\n')[0]" />
        </div>
    </div>
</template>

<script setup>
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;
const { post, type, displayProject } = defineProps({
    post: {
        type: Object,
        required: true
    },
    displayProject: {
        type: Boolean,
        required: false,
        default: true
    }
})
</script>

<style scoped>
.pill {
    margin: 0;
    font-size: 0.9rem;
}

.container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.container .post {
    width: 100%;
}

.title-row {
    flex-direction: column;
    display: flex;
    gap: 0.1rem;
}

.title-row .name:deep(h3) {
    padding: 0;
    margin: 0;
}

.title-row .details, .time-project {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    color: var(--light-gray)
}

.title-row .details {
    justify-content: space-between;
}

.tags .pill {
    color: white;
}

.thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;
}

.thumbnail img {
    max-width: 225px;
    max-height: 150px;
    width: 225px;
    aspect-ratio: 3 / 4;
    object-fit: fill;
    border-radius: 0.5rem;
}
</style>
