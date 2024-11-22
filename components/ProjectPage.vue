<template>
    <div>
        {{ page }}
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
});
const page = useProjectPage();
</script>