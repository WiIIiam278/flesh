<template>
    <Icon :name="icon" class="iconified-text-icon" />
    <span class="iconified-text-text">
        <slot />
    </span>
</template>

<style scoped>
.iconified-text-icon {
    font-size: 1.2rem;
    margin-right: 0.175rem;
    margin-bottom: 0.1rem;
}

.iconified-text-text {
    margin-left: 0.175rem;
    font-style: normal;
}
</style>

<script>
export default {
    name: 'IconifiedText',
    props: {
        icon: {
            type: String,
            required: true,
        }
    }
}
</script>