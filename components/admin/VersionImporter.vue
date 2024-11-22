<template>
    <div>
        <div class="picker">
            <div class="picker-panel">
                <label for="project-select">Import Versions from GitHub for:</label>
                <select id="project-select" v-model="editing" :disabled="!selectable?.length">
                    <option v-for="project in selectable" :key="project.slug" :value="project" >
                        {{ project.slug }}
                    </option>
                </select>
            </div>
            <div class="picker-buttons">
                <NuxtLink v-if="editing" :to="`/project/${editing?.slug}/download`">
                    <IconifiedText icon="fa6-solid:arrow-up-right-from-square">View Downloads</IconifiedText>
                </NuxtLink>
                <button :disabled="!editing" @click="sendImportRequest">Start Import&hellip;</button>
            </div>
        </div>
        <div v-if="!editing" class="no-project-selected">
            <IconifiedText icon="fa6-solid:question">No project selected.</IconifiedText>
        </div>
        <div class="importer-grid" v-else>
            <div class="importer-field">
                <div>
                    <label for="import-source">Import Source:</label>
                    <select id="import-source" v-model="source" disabled>
                        <option value="RELEASE">RELEASE</option>
                    </select>
                </div>
            </div>
            <div class="importer-field">
                <div>
                    <label for="channel-name">Target Channel:</label>
                    <input id="channel-name" type="text" v-model="channelName" />
                </div>
            </div>
            <div class="importer-field matchers">
                <label for="distribution-matchers">Distribution Matchers:</label>
                <div class="distribution-matchers">
                    <div v-if="matchers.length" class="distribution-matcher" v-for="(_, index) of matchers">
                        <label for="match">Match:</label>
                        <input v-model="matchers[index].match" type="text" placeholder="Regex" />
                        <label for="distribution">Distribution:</label>
                        <div class="distribution-matcher-distribution">
                            <div>
                                <label for="name">Name:</label>
                                <input v-model="matchers[index].distribution.name" type="text" placeholder="Name" />
                            </div>
                            <div>
                                <label for="group-name">Group Name:</label>
                                <input v-model="matchers[index].distribution.groupName" type="text" placeholder="Group Name" />
                            </div>
                            <div>
                                <label for="description">Description:</label>
                                <input v-model="matchers[index].distribution.description" type="text" placeholder="Description" />
                            </div>
                            <div>
                                <label for="archived">Archived:</label>
                                <input v-model="matchers[index].distribution.archived" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-matchers">
                        <IconifiedText icon="fa6-solid:question">No matchers defined.</IconifiedText>
                    </div>
                </div>
                <div class="list-buttons">
                    <button @click="matchers.push(JSON.parse(getMatchDefault(editing)))" >Add Matcher</button>
                    <button class="red" @click="matchers.pop()">Remove Matcher</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { auth, xsrf } = useAuth();
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;

const getMatchDefault = (project) => `
{
    "match": "${project.metadata.name}-Fabric-.*\\\\+mc.1.20.1\\\\.jar",
    "distribution": {
        "name": "fabric-1.21",
        "groupName": "fabric",
        "description": "Fabric 1.21",
        "archived": false
    }
}`;
const projects = await useAllProjects();
const selectable = computed(() => projects.value.filter(p => p.metadata?.github && p.metadata?.listDownloads));
const editing = ref(null);

// Import request
const channelName = defineModel('channelName')
const source = defineModel('source');
const matchers = ref([]);
const getRequestBody = () => ({
    source: source.value,
    distributionMatchers: matchers.value
});

watch(() => editing.value, () => {
    channelName.value = 'release';
    source.value = 'RELEASE';
    matchers.value = []
});
editing.value = projects.value.filter(p => p.metadata?.github && p.metadata?.listDownloads)[0] || null;

const sendImportRequest = async () => {
    try {
        await $fetch(`${BASE_URL}/v1/projects/${editing.value.slug}/channels/${channelName.value}/versions/import/github`, {
            method: 'POST',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(getRequestBody())
        });
        useAlert('Import started successfully!', 'Success');
    } catch (err) {
        useAlert('Failed to import versions: ' + err, 'Error');
        return;
    }
};
</script>

<style scoped> 
.picker {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
}

@media screen and (max-width: 725px) {
    .picker {
        flex-direction: column;
        gap: 0.5rem;
    }
    .picker .picker-panel {
        justify-content: center;
    }
}

.picker .picker-panel {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    font-weight: 700;
}

.picker .picker-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
}

.importer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    background-color: var(--gray);
    padding: 1rem;
    border-radius: 0.5rem;
}

.importer-grid .importer-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.importer-field label {
    margin-right: 0.5rem;
}

.importer-grid .matchers {
    grid-column: span 2;
    background-color: var(--background);
    padding: 1rem;
    border-radius: 0.5rem;
}

.matchers .list-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.distribution-matchers {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1rem;
    align-items: center;
    justify-items: center;
}

.no-matchers {
    grid-column: span 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--light-gray);
}

.distribution-matcher {
    display: flex;
    flex-direction: column;
    width: min-content;
    padding: 0.5rem;
    border: 0.2rem solid var(--light-gray);
    border-radius: 0.5rem;
    gap: 0.75rem;
}

.distribution-matcher-distribution {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}
</style>