<template>
    <span class="iconified-project">
        <span v-if="project.icon" class="icon">
            <object v-if="project.icon.svg" :data="'/images/icons/' + project.icon.svg" type="image/svg+xml" />
            <img v-else-if="project.icon.png" :src="'/images/icons/' + project.icon.png" />
        </span>
        <span class="name">
            {{ project.name ? project.name : project.id }}
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

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>