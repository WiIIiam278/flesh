<template>
    <div v-if="!canDownload()" class="upsell">
        <div v-if="user" class="error upsell">
            <IconifiedText icon="fa6-solid:lock"><h3>{{ $t('download-license-required') }}</h3></IconifiedText>
            <p>{{ $t('download-license-required-copy') }}</p>
        </div>
        <div v-else  class="error upsell">
            <IconifiedText icon="fa6-solid:lock"><h3>{{ $t('download-login-required') }}</h3></IconifiedText>
            <ButtonLink :href="`${useRuntimeConfig().public.API_BASE_URL}/login`" icon="fa6-solid:key" hollow>{{ $t('link-log-in') }}</ButtonLink>
        </div>
    </div>
    <div v-else-if="releaseChannels.length" class="downloads-menu">
        <div class="latest-release" v-if="latestRelease">
            <div class="download-buttons">
                <a class="button" :href="downloadUrl(latestRelease, DEFAULT_CHANNEL, download.distribution)" v-for="download of latestRelease.downloads">
                    <img class="icon" :src="`/images/platforms/${download.distribution.groupName}.png`" onerror="this.style.display='none'" />
                    <div class="details">
                        <div class="name">{{ download.distribution.description }}</div>
                        <div class="file">
                            <span class="file">{{ download.name }}</span>
                            <span class="size-hash">{{ $t('download-file-size', {'size': formatFileSize(download.fileSize)}) }}</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="changelog">
                <h2 class="release-name">{{ project.metadata.name }} {{ latestRelease.name }} ({{ new Date(latestRelease.timestamp).toLocaleDateString() }})</h2>
                <MDC :value="getChangelog(latestRelease)" tag="article" unwrap="p" />
            </div>
        </div>
        <div class="other-releases">
            <h3 v-if="releaseChannels.length" class="channel-picker">
                <span>{{ $t('download-browse-all') }}</span>
                <select :disabled="releaseChannels.length <= 1" v-model="selectedChannel" @change="updateVersions(pageNumber, itemsPerPage)">
                    <option v-for="channel in releaseChannels" :key="channel" :value="channel">{{ useCapitalized(channel) }}</option>
                </select>
                <span>{{ $t('download-versions') }}</span>
            </h3>
            <div class="version-options">
                <div v-if="Object.keys(getDistGroups()).length > 1" class="option dist-group-picker">
                    <label for="dist-group-select">{{ $t('download-filter-label') }}</label>
                    <label v-for="(groupName, group) in getDistGroups()" :for="`dist-group-${group}`" :key="groupName"
                        :class="`dist-group ${selectedDistGroup === group ? 'selected' : ''}`">
                        <img class="icon" :src="`/images/platforms/${group}.png`" onerror="this.style.display='none'" />
                        <span class="name">{{ useCapitalized(group) }}</span>
                        <input type="radio" :id="`dist-group-${group}`" name="dist-group" :value="group" 
                            @change="updateDistSelection" v-model="selectedDistGroup" />
                    </label>
                </div>
                <div class="dist-picker" v-if="selectedDistGroup && getDistGroups()[selectedDistGroup].length > 1">
                    <label for="dist-select">{{ $t('download-version-label') }}</label>
                    <select v-model="selectedDist" @change="updateVersions(pageNumber, itemsPerPage)">
                        <option v-for="dist in getDistGroups()[selectedDistGroup]" :key="dist.name" :value="dist">{{ dist.description }}</option>
                    </select>
                    <Pill v-if="selectedDist?.archived">{{ $t('distribution-archived') }}</Pill>
                    <Pill v-else-if="selectedDist?.statusLabel">{{ selectedDist.statusLabel }}</Pill>
                </div>
            </div>
            <div v-if="versions.value" class="version-browser">
                <div class="versions">
                    <div class="version" v-for="version in versions.value.content">
                        <div class="download-details">
                            <a class="download-button" :href="downloadUrl(version, selectedChannel, selectedDist)">
                                <IconifiedText icon="fa6-solid:download">{{ version.name }}</IconifiedText>
                            </a>
                            <div class="download-changelog" @click="useAlert(getChangelog(version), `${project.metadata.name} ${version.name}`, null, true)">
                                <MDC :value="getChangelog(version, true)" tag="article" unwrap="p" />
                            </div>
                        </div>
                        <div class="download-date">
                            {{ new Date(version.timestamp).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
                <Pagination :data="versions.value" v-on:update="(page, perPage) => updateVersions(page, perPage)" />
            </div>
            <div v-else class="error versions">
                <IconifiedText icon="fa6-solid:circle-info"><h4>{{ $t('download-distribution-no-versions', {'project': project.metadata.name, 'distribution': selectedDist.description}) }}</h4></IconifiedText>
            </div>
        </div>
    </div>
    <div v-else class="error upsell">
        <IconifiedText icon="fa6-solid:circle-info"><h3>{{ $t('download-no-versions') }}</h3></IconifiedText>
        <p>{{ $t('download-no-versions-copy') }}</p>
    </div>
</template>

<script setup>
const DEFAULT_CHANNEL = 'release';
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const { t } = useLocalePath();

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
const downloadUrl = (release, channel, dist) => `${BASE_URL}/v1/projects/${project.slug}/channels/${channel}/versions/${release.name}/distributions/${dist.name}`;
const getChangelog = (release, short = false) => !short ? release.changelog : release.changelog.split('\n')[0];
const canDownload = () => !project.restricted || user.value && (useIsUserRole(user.value, 'staff') || user.value.purchases.some(p => p === project.slug));

const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
});
const { releaseChannels } = project;

const pageNumber = ref(1);
const itemsPerPage = ref(15);
const versions = ref(null);

const selectedDistGroup = ref(null);
const selectedDist = ref(null);
const selectedChannel = ref(DEFAULT_CHANNEL);
const updateDistSelection = async () => {
    selectedDistGroup.value = selectedDistGroup.value;
    pageNumber.value = 1;
    selectedDist.value = selectedDistGroup.value ? getDistGroups()[selectedDistGroup.value][0] : null;
    await updateVersions(pageNumber.value, itemsPerPage.value)
};

const latestRelease = await useLatestVersion(project.slug, DEFAULT_CHANNEL);
const distributions = await useDistributions(project.slug);
const user = await useUser();

const getDistGroups = (() => {
    const grouped = {};
    for (const dist of distributions.value) {
        if (!grouped[dist.groupName]) {
            grouped[dist.groupName] = [];
        }
        if (!selectedDistGroup.value) {
            selectedDistGroup.value = dist.groupName;
            updateDistSelection();
        }
        grouped[dist.groupName].push(dist);
        grouped[dist.groupName].sort((a, b) => a.sortingWeight ?? 0 > b.sortingWeight ?? 0 ? 1 : -1);
    }
    return grouped;
});

const updateVersions = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    versions.value = await useVersions(project.slug, selectedChannel.value, selectedDist.value?.name, pageNumber.value - 1, itemsPerPage.value);
});
await updateVersions(pageNumber.value, itemsPerPage.value);
</script>

<style scoped>
.upsell {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
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

.changelog .content {
    overflow-y: auto;
    max-height: 100%;
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

.other-releases {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    margin: 2rem 0;
}

.other-releases .channel-picker {
    text-align: center;
    margin-bottom: 0.5rem;
    border-bottom: 0.15rem solid var(--gray);
    padding-bottom: 0.5rem;
}

.channel-picker select, .dist-picker select {
    width: min-content;
    margin: 0 0.5rem;
}

.version-options {
    display: flex;
    justify-content: space-between;
}

.option select {
    width: 150px;
}

.dist-group-picker .dist-group {
    padding: 0.3rem 0.5rem;
    border: 0.15rem solid var(--gray);
    border-radius: 0.5rem;
    background-color: var(--gray);
    color: var(--accent);
    cursor: pointer;
    display: flex;
}

.dist-group:hover {
    background-color: var(--dark-gray);
}

.dist-group .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
}

.dist-group .name {
    font-size: 1rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    flex: 1;
}

.dist-group.selected {
    border-color: var(--accent);
}

.dist-group input[type="radio"] {
    display: none;
}

.version-options .option {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.versions {
    display: flex;
    flex-direction: column;
}

.versions .version {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
}

.version .download-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
}

.download-details .download-changelog {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 40vw;
    max-height: 1.5rem;
    cursor: pointer;
}

.download-details .download-changelog:hover {
    filter: brightness(85%);
}

.versions .version:hover {
    background-color: var(--dark-gray);
    border-radius: 0.5rem;
    transition: background-color 0.1s;
}

.version .download-button {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    border: 0.15rem solid var(--gray);
    min-width: 4.5rem;
    border-radius: 0.5rem;
    background-color: var(--gray);
    color: var(--accent);
    cursor: pointer;
}

@media screen and (max-width: 1100px) {
    .latest-release .download-buttons {
        width: 50%;
    }
}

@media screen and (max-width: 725px) {
    .latest-release {
        flex-direction: column;
    }

    .latest-release .download-buttons {
        width: 100%;
    }

    .latest-release .changelog {
        width: 100%;
    }
}
</style>