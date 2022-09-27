<template>
    <a class="iconified-text">
        <font-awesome-icon :icon="[type, icon]" class="icon" />
        <span class="text">{{ text }}</span>
    </a>
</template>

<style scoped>
.iconified-text {
    padding-left: 0.175rem;
    padding-right: 0.175rem;
}

.iconified-text .icon {
    margin-right: 0.175rem;
}

.iconified-text .text {
    margin-left: 0.175rem;
}
</style>

<script>
export default {
    name: 'IconifiedText',
    props: {
        type: {
            type: String,
            required: false,
            default: 'fas'
        },
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    }
}
</script>