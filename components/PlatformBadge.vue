<template>
    <a :href="link" :title="`Available on ${name}`" target="_blank">
        <object :data="`/images/badges/${platform}.svg`" :alt="`${name} badge`" />
    </a>
</template>

<script setup>
const { platform, link } = defineProps({
    platform: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
const name = useCapitalized(platform);
</script>

<style scoped>
</style>