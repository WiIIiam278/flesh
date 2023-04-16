<template>
    <div class="releases">
        <NuxtLink class="link" v-for="release in releases" :to="release.url">
            <div class="release shadow">
                <img class="platform-icon" :src="release.platform.icon" />
                <div class="platform-details">
                    <IconifiedText icon="fa6-solid:download">{{ release.platform.name }}</IconifiedText>
                    <span class="description">{{ release.platform.description }}</span>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: String,
        required: true
    },
});

const { data: releases } = await useFetch(`/api/releases/${project}`);
</script>

<style scoped>
.link {
    text-decoration: none;
}

.releases {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.release {
    background-color: var(--gray);
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: large;
    width: 100%;
    border: 0.2rem solid transparent;
}

.release .platform-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
}

.platform-details .description {
    font-size: 0.9rem;
    font-weight: normal;
    color: var(--light-gray);
}

.release:hover {
    border: 0.2rem solid var(--accent);
    scale: 1.02;
}

.release img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    filter: drop-shadow(0 0 0.075rem var(--dark-gray));
}

.spigot {
    color: #ed8106;
}

.fabric {
    color: #c6bca5;
}

.sponge {
    color: #f7cf0d
}
</style>