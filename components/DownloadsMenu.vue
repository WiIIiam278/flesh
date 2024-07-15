<template>
    <div>
        <div class="channel-picker">
            <label for="dist-select">Channel:</label>
            <select v-model="selectedChannel" @change="updateVersions">
                <option v-for="channel in releaseChannels" :key="channel" :value="channel">{{ channel }}</option>
            </select>
        </div>
        <div class="dist-group-picker">
            <label for="dist-group-select">Platform:</label>
            <div class="dist-group" v-for="(name, group) in distGroups" :key="groupName">
                <label :for="`dist-group-${group}`">
                    <!-- todo icon -->
                    {{ group }}
                </label>
                <input type="radio" :id="`dist-group-${group}`" name="dist-group" :value="name" 
                    @change="updateDistSelection" v-model="selectedDistGroup" />
            </div>
        </div>
        <div class="dist-picker" v-if="selectedDistGroup && selectedDistGroup.length > 1">
            <label for="dist-select">Distribution:</label>
            <select v-model="selectedDist" @change="updateVersions">
                <option v-for="dist in selectedDistGroup" :key="dist.id" :value="dist.id">{{ dist.description }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
const DEFAULT_CHANNEL = 'release';
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const { auth, xsrf } = useAuth();

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
const updateDistSelection = () => {
    selectedDistGroup.value = selectedDistGroup.value ?? Object.keys(distGroups.value)[0];
    selectedDist.value = selectedDistGroup.value[0].id;
    updateVersions();
};

const distributions = await useDistributions(project.slug);
const distGroups = computed(() => {
    const grouped = {};
    for (const dist of distributions.value) {
        if (!grouped[dist.groupName]) {
            grouped[dist.groupName] = [];
        }
        grouped[dist.groupName].push(dist);
    }
    return grouped;
});

const updateVersions = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    versions.value = await useVersions(project.slug, selectedChannel.value, pageNumber.value - 1, itemsPerPage.value);
});
await updateVersions(pageNumber.value, itemsPerPage.value);

</script>