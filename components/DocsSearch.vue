<template>
    <div class="search-interface">
        <div class="search">
            <label for="search">
                <IconifiedText icon="fa6-solid:magnifying-glass">
                    <input id="search" placeholder="Search" v-model="query" type="search" autocomplete="off" />
                </IconifiedText>
            </label>
        </div>
        <div class="results" v-if="data.length">
            <ul>
                <li class="result" v-for="{ _path, title, description } in data" :key="_path">
                    <div class="link">
                        <NuxtLink :to="'/docs/' + _path.split('/').slice(3).join('/')">{{ title }}</NuxtLink>
                    </div>
                    <div class="description" v-if="description.length">
                        {{ (description.length > 48) ? description.slice(0, 48-1) + '&hellip;' : description }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.search-interface {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 50vh;
    overflow-y: auto;
    border-bottom: 1px solid var(--light-gray);
}

.results ul {
    list-style: none;
    padding: 0;
    width: 100%;
}

.results .result {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
}

.result .description {
    color: var(--light-gray);
}

.search {
    color: var(--light-gray);
}

.search input {
    color: white;
    border: 0.15rem solid var(--light-gray);
    border-radius: 0.5rem;
    padding: 0.3rem;
    margin-left: 0.3rem;
}
</style>

<script setup>
const { project } = defineProps({
    project: {
        type: String,
        required: false
    }
});

const query = ref('');
const docs = ref([]);

const filterDocs = (query) => {
    const queryWords = query.split(' ');
    return docs.value.filter(doc => {
        const titleWords = doc.title.split(' ');
        const descriptionWords = doc.description.split(' ');
        return queryWords.every(word => {
            return titleWords.some(titleWord => titleWord.toLowerCase().includes(word.toLowerCase())) || descriptionWords.some(descriptionWord => descriptionWord.toLowerCase().includes(word.toLowerCase()));
        });
    });
}

const { data, refresh } = await useAsyncData('search', () => {
    if (query.value === '') return [];
    if (!docs.value.length) {
        return queryContent(project ? `/docs/project/${project}` : '/docs/project/').find().then(data => {
            docs.value = data;
            return filterDocs(query.value);
        });
    } else {
        return filterDocs(query.value);
    }
});

watch([query], () => {
    refresh()
})
</script>