<template>
    <div class="emulator-content">
        <div class="ds">
            <iframe class="emulator-frame shadow"
                :src="`/emulator.html?gameUrl=${urlEncodeUrl}&gameName=${urlEncodeName}&core=${urlEncodeCore}`"
                width="360px" height="540px" frameBorder="0" scrolling="no"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullscreen allowTransparency></iframe>
            <object class="system-overlay" width="610" height="640" data="/images/nintendo-dsi.svg">
                <img src="/images/nintendo-dsi.png" alt="Nintendo DS system" />
            </object>
        </div>
    </div>
</template>

<script setup>
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
.emulator-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
}

.ds {
    position: relative;
    z-index: 2;
    width: 610px;
    height: 640px;
    margin: 0 auto;
    background: var(--main-gray);
    border-radius: 10px;
    overflow: hidden;
    pointer-events: none;
}

.ds .emulator-frame {
    position: absolute;
    z-index: -1;
    left: 127px;
    top: 48px;
    object-fit: cover;
    pointer-events: all !important;
}
</style>