<template>
    <div class="emulator">
        <div class="column">
            <div class="detials">
                <h2>Controls</h2>
                <p>Use the following controls to play the game. Press ESC to exit the emulator.</p>
            </div>
            <div class="controls">
                <ControlMapping button="A" keybind="Z" />
                <ControlMapping button="B" keybind="X" />
                <ControlMapping button="X" keybind="A" />
                <ControlMapping button="Y" keybind="S" />
                <ControlMapping button="L" keybind="Q" />
                <ControlMapping button="R" keybind="E" />
                <ControlMapping button="Start" keybind="ENTER" />
                <ControlMapping button="Select" keybind="V" />
                <ControlMapping button="DPAD" keybind="Arrow Keys" />
                <ControlMapping button="Touch" keybind="Mouse" />
            </div>
        </div>
        <div class="column">
            <iframe class="frame shadow"
                    :src="`/emulator.html?gameUrl=${urlEncodeUrl}&gameName=${urlEncodeName}&core=${urlEncodeCore}`"
                    width="360px" height="540px" frameBorder="0" scrolling="no"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen allowTransparency>
            </iframe>
        </div>
    </div>
</template>

<script setup>
import ControlMapping from './ControlMapping.vue';

const { gameUrl, gameName, gameCore } = defineProps({
    gameUrl: String,
    gameName: String,
    gameCore: String
});

const urlEncodeName = computed(() => encodeURIComponent(gameName));
const urlEncodeUrl = computed(() => encodeURIComponent(gameUrl));
const urlEncodeCore = computed(() => encodeURIComponent(gameCore));
</script>

<style scoped>
.emulator {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    width: 100%;
}

@media (max-width: 1080px) {
    .emulator {
        flex-direction: column-reverse;
    }

    .column, .controls {
        width: 100% !important;
    }
}

.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 1em;
    width: 45%;
}

.column .detials {
    margin: 1rem 0;
}

.column .controls {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    justify-items: center;
}

.column .frame {
    border-radius: 0.5rem;
    box-shadow: 0 0 4rem var(--gray);
    margin: 0 1rem;
}
</style>