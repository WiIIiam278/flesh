<template>
    <!-- Render the markdown readme -->

</template>

<script setup>
// Get the project prop
const { project } = defineProps({
    project: {
        type: Object,
        required: true,
    }
});

const { readme } = await useAsyncData(
    'readme',
    () => {
        if (project.readme) {
            return queryContent(project.readme).findOne()
        }
        if (project.repository) {
            const readmeUrl = project.repository + '/raw/master/README.md'
            return fetch(readmeUrl)
                .then(response => response.text())
        }
        return "No readme found."
    })
</script>