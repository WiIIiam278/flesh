<template>
    <div id="grid-title">
        <h1>{{ $t('index-grid-header') }}</h1>
        <div class="filter-tags">
            <Icon class="tag-icon" name="fa6-solid:tag" />
            <span class="filters">
                <template v-for="tag in featuredTags">
                    <TagPill :tag="tag" isClickable :isSelected="selectedTags.includes(tag)" @selected="onTagSelected" />
                </template>
            </span>
        </div>
    </div>
    <div id="projects-grid">
        <template v-for="(project, index) in filtered">
            <ProjectCard v-if="expanded || index < shown" :index="index" :key="project.slug" :project="project" />
        </template>
    </div>
    <div id="below-grid" v-if="filtered?.length > shown">
        <a id="grid-size-button" @click="expanded = !expanded">
            <IconifiedText v-if="expanded" icon="fa6-solid:chevron-up">{{ $t('index-grid-collapse') }}</IconifiedText>
            <IconifiedText v-else icon="fa6-solid:chevron-down">{{ $t('index-grid-expand') }}</IconifiedText>
        </a>
    </div>
</template>

<script setup>
const projects = await useAllProjects();
const expanded = ref(false);
const selectedTags = ref([]);
    
const { shown } = defineProps({
    shown: {
        type: Number,
        default: 6
    },
    featuredTags: {
        type: Array,
        required: false,
        default: ['minecraft', 'game', 'library', 'web']
    }
});

const filtered = computed(() => {
    if (selectedTags.value.length) {
        return projects.value.filter(p => !p.metadata?.tags || selectedTags.value.every(tag => p.metadata.tags.includes(tag)));
    }
    return projects.value;
});

const onTagSelected = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value.splice(selectedTags.value.indexOf(tag), 1);
    } else {
        selectedTags.value.push(tag);
    }
}
</script>

<style scoped>
#projects-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
}

#grid-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0 0.5rem;
}

#grid-title h1 {
    margin: 0;
}

@media screen and (max-width: 1000px) {
    #grid-title {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    #grid-title h1 {
        margin-bottom: 0.5rem;
    }
}

.tag-icon {
    margin-right: 0.3rem;
    color: var(--light-gray);
}

#below-grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0.3rem;
}

#grid-size-button:hover {
    cursor: pointer;
}
</style>