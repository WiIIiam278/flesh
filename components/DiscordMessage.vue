<template>
    <div class="discord-message">
        <Icon class="icon" :name="icon" />
        <span><slot /></span>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        },
        transcript: {
            type: Object,
            required: true
        }
    }
}
</script>