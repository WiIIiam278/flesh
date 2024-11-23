<template>
    <div class="badges" v-if="meta.links">
        <PlatformBadge class="badge" v-for="link in meta.links" :platform="link.id" :link="link.url" />
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
})
const { metadata: meta } = project;
</script>

<style scoped>
.badges {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 3rem 0;
}
</style>