<template>
    <div class="container" :style="`flex-direction: row${imagePosition === 'left' ? '' : '-reverse'};`">
        <img class="image shadow" :src="`${ASSETS_URL}/${imageUrl}`" :alt="title" />
        <div class="text">
            <MDC v-if="title?.length" :value="title" tag="h2" unwrap="p" />
            <MDC v-if="body?.length" :value="body" tag="p" unwrap="p" />
            <slot />
        </div>
    </div>
</template>

<script setup>
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;
const {  title, body, color1, color2, imageUrl, imagePosition } = defineProps({
    title: { type: String, required: false, default: '' },
    body: { type: String, required: false, default: '' },
    imageUrl: { type: String, required: true },
    imagePosition: { type: String, required: false, default: 'left' }
})
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    gap: 1rem;
    width: 100%;
    margin: 3rem 0;
}

.container:deep(h1) {
    font-size: 2rem;
    margin: 0;
}

.container:deep(p) {
    margin-top: 1rem;
}

.image {
    height: auto;
    width: 48%;
    border-radius: 0.5rem;
}

.text {
    width: 48%;
}

@media screen and (max-width: 800px) {
    .container {
        flex-direction: column !important;
        justify-content: center;
    }

    .image {
        width: 100%;
    }

    .text {
        width: 100%;
    }
}
</style>