<template>
    <div v-if="tabs.length > 1" class="tabs">
        <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ selected: selectedTab === tab.id }" v-on:click="selectTab(tab)">
            {{ tab.name }}
        </div>
    </div>
    <div class="tab-content">
        <slot />
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: Object
});
const tabs = [{ name: 'About', id: 'about'}];
const selectedTab = defineModel('selected');
if (project.emulator) {
    tabs.unshift({ name: 'Play', id: 'play' });
}

// Select a tab
function selectTab(tab) {
    selectedTab.value = tab.id;
}

// Open the first tab by default
selectedTab.value = tabs[0].id;
</script>

<style scoped>
.tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;
    width: 100%;
}

.tabs .tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0.4em;
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