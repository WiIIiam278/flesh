<template>
    <div class="container">
        <h1 v-if="title?.length">{{ title }}</h1>
        <p v-if="body?.length">{{ body }}</p>
        <slot />
    </div>
</template>

<script setup>
const { 
    title, body, color1, color2
} = defineProps({
    title: { type: String, required: false, default: '' },
    body: { type: String, required: false, default: '' }
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.container h1 {
    border: none !important;
    color: var(--white);
    font-size: 2rem;
    margin: 0;
    text-align: center;
}

.container p {
    margin-top: 1rem;
    text-align: center;
    max-width: 65%;
}
</style>

