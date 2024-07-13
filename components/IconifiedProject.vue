<template>
    <span :class="`iconified-project ${centered ? 'centered' : ''}`">
        <span v-if="project.metadata.icons" class="icon">
            <object v-if="project.metadata.icons['SVG']" :data="`/images/icons/${project.metadata.icons['SVG']}`" type="image/svg+xml" />
            <img v-else-if="project.metadata.icons['PNG']" :src="`/images/icons/${project.metadata.icons['PNG']}`" />
        </span>
        <span class="name">
            {{ project.metadata.name ? project.metadata.name : project.slug }}
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
    height: 1.2em;
}

.iconified-project .icon img {
    width: 1.2em;
    height: 1.2em;
}

.iconified-project .name {
    margin-left: 0.2em;
}
</style>

<script setup>
defineProps({
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
</script>