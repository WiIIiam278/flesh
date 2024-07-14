<template>
    <div class="tabs" v-if="tabs?.length > 1">
        <div v-for="tab in tabs" :class="`tab ${tab.id === selected ? 'selected' : ''}`" 
            :key="tab.id" @click="select(tab.id)">
            {{ tab?.name ?? tab.id }}
        </div>
    </div>
    <div class="tab-content">
        <slot />
    </div>
</template>

<script setup>
const { tabs } = defineProps({
    tabs: {
        type: Array,
        required: false
    }
});
const selected = defineModel('selected');

// Update selected tab based on hash
const { hash } = useRoute();
if (hash && tabs?.length > 1) {
    if (tabs.find(tab => tab.id === hash.substring(1).toLowerCase())) {
        selected.value = hash.substring(1).toLowerCase();
    }
}

// Change tab and update hash
const select = (id) => {
    if (selected.value === id) return;
    selected.value = id;
    navigateTo(`#${id}`);
}
</script>

<style scoped>
.tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 1rem 0;
    width: 100%;
}

.tabs .tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    margin-right: 0.5rem;
    padding: 0.35rem 0.85rem;
    border-radius: 0.5rem;
    background-color: var(--gray);
    cursor: pointer;
    box-sizing: border-box;
    border: 0.15rem solid transparent;
}

.tabs .tab.selected {
    background-color: var(--dark-gray);
}

.tabs .tab:hover {
    border: 0.15rem solid var(--accent);
}
</style>