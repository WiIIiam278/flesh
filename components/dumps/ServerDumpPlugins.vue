<template>
    <div>
        <div class="above-bar">
            <div class="search-box">
                <Icon name="lets-icons:search" />
                <input type="text" v-model="filter" :placeholder="$t('dump-plugins-table-filter-by-name')" />
            </div>
            <div>{{ $t('dump-plugins-count', { 'count': plugins.length }) }}</div>
        </div>
        <table>
            <thead>
                <tr>
                    <th colspan="2">{{ $t('dump-plugins-table-name') }}</th>
                    <th>{{ $t('dump-plugins-table-version') }}</th>
                    <th>{{ $t('dump-plugins-table-status') }}</th>
                </tr>
            </thead>
            <tbody v-for="plugin in plugins.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)">
                <tr>
                    <td class="expand-collapse">
                        <Icon :name="`fa6-solid:chevron-${isExpanded(plugin) ? 'down' : 'right'}`" @click="isExpanded(plugin) ? expanded.splice(expanded.indexOf(plugin.name), 1) : expanded.push(plugin.name)" />
                    </td>
                    <td class="name">{{ plugin.name }}</td>
                    <td class="version">v{{ plugin.version }}</td>
                    <td class="labels">
                        <Pill class="enabled" v-if="plugin.enabled">{{ $t('dump-plugins-table-enabled' )}}</Pill>
                        <Pill class="disabled" v-else>{{ $t('dump-plugins-table-disabled' )}}</Pill>
                        <Pill v-for="label in plugin.labels" :style="`background-color: ${label.color};`">{{ label.name }}</Pill>
                    </td>
                </tr>
                <tr v-if="isExpanded(plugin)">
                    <td colspan="4" class="details">
                        <IconifiedText icon="fluent:text-description-16-filled">{{ plugin.description }}</IconifiedText>
                        <IconifiedText icon="material-symbols:person-rounded">{{ plugin.authors.join(", ") }}</IconifiedText>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const { plugins } = defineProps({
    plugins: {
        type: Array,
        required: false
    }
})

const filter = ref('');
const expanded = ref([])
const isExpanded = (plugin) => expanded.value.indexOf(plugin.name) > -1;
</script>

<style scoped>
.expand-collapse {
    width: 10px;
    font-size: 1.15rem;
    cursor: pointer;
}

.above-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-box {
    display: flex;
    font-size: 1.2rem;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
}

table {
    margin-top: 1rem;
}

.details {
    color: var(--light-gray)
}

.search {
    font-size: 1.2rem;
}

.name, .version, .status {
    width: 32%;
}

.labels .enabled {
    background-color: rgb(28, 151, 21);
}

.labels .disabled {
    background-color: rgb(151, 38, 21);
}
</style>