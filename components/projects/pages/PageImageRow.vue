<template>
    <div class="row">
        <NuxtImg class="shadow" v-for="img in row" :src="`${ASSETS_URL}/${img}`" sizes="100% sm:300px md:600px" />
    </div>
</template>

<script setup>
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;
const { images } = defineProps({
    images: {
        type: String,
        required: true
    }
})
const row = [];
images.split(',').forEach(i => row.push(i));
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    margin: 1.5rem 0;
}

.row img {
    border-radius: 0.5rem;
    max-height: 240px;
    max-width: 100%;
    height: 100%;
    width: auto;
}
</style>