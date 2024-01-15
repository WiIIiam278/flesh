<template>
    <div v-if="releases.length > 0">
        <div class="title">Download {{ project.name }}</div>
        <div class="releases">
            <DownloadCard v-for="(release, index) in releases" :key="index" :projectName="project.name" :release="release" :primary="index === 0" />
        </div>
    </div>
    <div v-else>
        <div class="title">(No releases found for {{ project.name }}&hellip;)</div>
    </div>
    <div class="links">
        <ButtonLink v-if="project.repository" :link="project.repository" icon="fa6-brands:github" hollow>Past releases & changelogs&hellip;</ButtonLink>
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: Object
    }
});

const { data: releases } = await useFetch(`/api/releases/${project.id}`);
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

/* Display releases in a grid, with the first release taking up the full width, then subsequent releases being two-abreast */
.releases {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    padding: 0 2rem;
}

.releases .download-card:first-child {
    grid-column: 1 / span 2;
}

.releases .download-card:nth-child(2) {
    grid-column: 1 / span 1;
}

.links {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
</style>