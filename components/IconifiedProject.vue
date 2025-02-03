<template>
    <span :class="`iconified-project ${centered ? 'centered' : ''}`">
        <span v-if="meta.icons" class="icon">
            <object v-if="meta.icons['SVG']" :data="`${ASSETS_URL}/${meta.icons['SVG']}`" type="image/svg+xml" />
            <img v-else-if="meta.icons['PNG']" :src="`${ASSETS_URL}/${meta.icons['PNG']}`" />
        </span>
        <span class="name">
            {{ meta.name ? meta.name : project.slug }}
        </span>
    </span>
</template>

<style scoped>
.iconified-project {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
}

.centered {
    margin: 0 auto;
    justify-content: center;
}

.iconified-project .icon {
    margin-right: 0.2em;
    margin-top: 0.25em;
}

.iconified-project .icon object {
    width: 1.2em;
    min-width: 1.2em;
    aspect-ratio: 1;
}

.iconified-project .icon img {
    width: 1.2em;
    min-width: 1.2em;
    aspect-ratio: 1;
}

.iconified-project .name {
    margin-left: 0.2em;
}
</style>

<script setup>
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;

const { project, centered } = defineProps({
    project: {
        type: Object,
        required: true
    },
    centered: {
        type: Boolean,
        default: false,
        required: false
    }
})
const { metadata: meta } = project;
</script>