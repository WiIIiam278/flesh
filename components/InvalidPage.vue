<template>
    <span class="invalid-page">{{ name }}</span>
</template>

<script setup>
const { name } = defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.invalid-page {
    color: var(--light-gray);
    text-decoration: line-through;
}
</style>