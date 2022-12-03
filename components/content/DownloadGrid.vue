<template>
    <div class="downloads-grid">
        <slot />
    </div>
</template>

<style scoped>
.downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-gap: 0.5rem;
}
</style>

<script setup>
</script>