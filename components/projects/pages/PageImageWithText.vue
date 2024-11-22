<template>
    <div class="container" :style="`flex-direction: row${imagePosition === 'left' ? '' : '-reverse'};`">
        <img class="image shadow" :src="imageUrl" :alt="title" />
        <div class="text">
            <h2 v-if="title?.length">{{ title }}</h2>
            <p v-if="body?.length">{{ body }}</p>
            <slot />
        </div>
    </div>
</template>

<script setup>
const { 
    title, body, color1, color2, imageUrl, imagePosition
} = defineProps({
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
        flex-direction: column;
        justify-content: center;
    }

    .image {
        width: unset;
    }

    .text {
        width: unset;
    }
}

.container h1 {
    font-size: 2rem;
    margin: 0;
}

.container p {
    margin-top: 1rem;
}
</style>