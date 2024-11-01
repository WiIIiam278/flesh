<template>
    <div class="latest-release" v-if="release">
        <div class="download-buttons">
            <a class="button" :href="useDownloadUrl(project, channel, release, download.distribution)" v-for="download of release.downloads">
                <img class="icon" :src="`/images/platforms/${download.distribution.groupName}.png`" onerror="this.style.display='none'" />
                <div class="details">
                    <div class="name">{{ download.distribution.description }}</div>
                    <div class="file">
                        <span class="file">{{ download.name }}</span>
                        <span class="size-hash">
                            {{ $t('download-file-size', { 'size': formatFileSize(download.fileSize) }) }}
                        </span>
                    </div>
                </div>
            </a>
        </div>
        <div class="changelog">
            <h2 class="release-name">{{ project.metadata.name }} {{ release.name }} ({{ new Date(release.timestamp).toLocaleDateString() }})</h2>
            <MDC :value="release.changelog" tag="article" unwrap="p" />
        </div>
    </div>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const { project, channel } = defineProps({
    project: {
        type: Object,
        required: true
    },
    channel: {
        type: String,
        required: true
    }
})

const release = await useLatestVersion(project.slug, channel);
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<style scoped>
.latest-release {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    max-width: 100%;
    justify-content: space-between;
}

.latest-release .download-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 40%;
}

.latest-release .changelog {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 60%;
    max-height: 500px;
    overflow-y: auto;
}

.changelog .release-name {
    width: fit-content;
    margin: 0 0 1rem 0;
}

.changelog:deep(article) {
    margin: 0;
}

.download-buttons .button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 0.15rem solid var(--gray);
    border-radius: 0.5rem;
    background-color: var(--gray);
    color: var(--accent);
    cursor: pointer;
}

.download-buttons .button:hover, .version .download-button:hover {
    background-color: var(--dark-gray);
    background: linear-gradient(transparent, #00fb9b1e);
    text-decoration: none;
}

.button .icon {
    width: 2rem;
    max-height: 4rem;
}

.button .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.details .name {
    font-size: 1.1rem;
    font-weight: 700;
}

.details .file {
    color: var(--light-gray);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 1100px) {
    .latest-release .download-buttons {
        width: 50%;
    }
}

@media screen and (max-width: 725px) {
    .latest-release {
        flex-direction: column-reverse;
    }

    .latest-release .download-buttons {
        width: 100%;
    }

    .latest-release .changelog {
        width: 100%;
    }
}

.error {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
}
</style>