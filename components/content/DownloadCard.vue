<template>
    <div class="download-card" @click="download" :class="`platform-${release.platform.name.toLowerCase()} ${primary ? 'primary' : ''}`">
        <img class="icon" :src="release.platform.icon" :alt="`${release.platform.name} icon`" />
        <div class="platform">
            <div class="details">
                <span class="name">{{ projectName }} &ndash; {{ release.platform.name }}</span>
                <span class="description">{{ release.platform.description }}</span>
                <code class="file">
                    <div>{{ release.name }}</div>
                    <div v-if="release.size">{{ formatSize(release.size) }}</div>
                </code>
            </div>
        </div>
    </div>
</template>

<style scoped>
.download-card {
    border: 0.2rem transparent solid;
    background-color: var(--gray);
    border-radius: 0.75rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.download-card:hover {
    border: 0.2rem solid var(--accent);
    cursor: pointer;
}

.platform .name {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--accent);
}

.details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 0.5rem;
}

.details .file {
    font-size: 0.9rem;
    margin-top: 0.2rem;
    color: var(--light-gray);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.icon {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
}
.primary {
    margin: 1rem 0;
}

.platform-spigot:hover {
    border-color: #ff8c00 !important;
}

.platform-fabric:hover {
    border-color: #c6bca5 !important;
}

.platform-sponge:hover {
    border-color: #ffe206 !important;
}
</style>

<script setup>
const { release } = defineProps({
    projectName: {
        type: String
    },
    release: {
        type: Object
    },
    primary: {
        type: Boolean,
        default: false
    }
})

// Download
const download = () => {
    window.open(release.url, '_blank')
}

// Fetch file size using HEAD request
const formatSize = (size) => {
    if (size < 1024) {
        return size + ' B'
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + ' KB'
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
    } else {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    }
};
</script>