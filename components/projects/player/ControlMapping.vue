<template>
    <li class="mapping">
        <ControlGlyph v-if="button && buttonId" :id="buttonId" :name="button" />
        <div v-else>{{ button }}</div>:
        <ControlGlyph v-if="keybind && keyId" :id="keyId" :name="keybind" />
        <div v-else>&nbsp;{{ keybind }}</div>
    </li>
</template>

<script setup>  
import ControlGlyph from './ControlGlyph.vue';

const { button, keybind } = defineProps({
    button: String,
    keybind: String
});

const buttonId = computed(() => {
    switch (button) {
        case 'Start':
        case 'Select':
        case 'Touch':
            return null;
        default:
            return `button-${button.toLowerCase()}.png`;
    }
});

const keyId = computed(() => {
    switch (keybind) {
        case 'Arrow Keys':
            return null;
        default:
            return `key-${keybind.toLowerCase()}.png`;
    }
});
</script>

<style scoped>
.mapping {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>