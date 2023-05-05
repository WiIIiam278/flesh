<template>
    <blockquote :class="`notice ${type}`">
        <IconifiedText :icon="getIcon(type)">
            <span class="title">{{ title }}</span>
        </IconifiedText>
        <span class="body">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </span>
    </blockquote>
</template>

<script>
export default {
    name: 'Notice',
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'info'
        }
    },
    methods: {
        getIcon(type) {
            if (type === 'info') {
                return 'fa6-solid:circle-info'
            }
            return 'fa6-solid:triangle-exclamation';
        }
    },
}
</script>

<style scoped>
.notice {
    padding: 0.5rem;
    margin-top: 0;
}

.title {
    margin-right: 0.5rem;
    font-weight: 600;
}

.body {
    color: var(--light-gray) !important;
}

.info {
    color: skyblue !important;
}

.warning {
    color: gold !important;
}
</style>