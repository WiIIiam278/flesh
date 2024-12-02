<template>
    <div class="container">
        <hr />
        <h2>{{ $t('index-posts-header') }}</h2>
        <div class="posts">
            <PostPreview v-for="post of posts.content" type="mini" :post="post" />
        </div>
        <ButtonLink icon="fa6-solid:newspaper" to="/posts">{{ $t('link-more-posts') }}</ButtonLink>
    </div>
</template>

<script setup>
const { count } = defineProps({
    count: {
        type: Number,
        required: false,
        default: 2
    }
})

const posts = await useAllPosts(0, count);
</script>

<style scoped>
.container hr {
    margin: 1.5rem 0 0.75rem 0;
}

.container h2 {
    margin: 0 0 0.75rem 0;
    border: none;
}

.posts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0.5rem 0;
}
</style>