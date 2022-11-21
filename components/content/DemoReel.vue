<template>
    <NuxtLink :to="'/project/' + currentProject.id.toLowerCase()">
        <div class="demo-reel shadow">
            <video autoplay muted playsinline loop class="shadow" :src="'/videos/' + currentVideo.src" type="video/mp4">
                <span> {{ currentVideo.alt }} </span>
            </video>
            <div class="overlay shadow">
                <div class="project-icon shadow">
                    <object v-if="currentProject.icon.svg" :data="'/images/icons/' + currentProject.icon.svg"
                        type="image/svg+xml" />
                    <img v-else-if="currentProject.icon.png" :src="'/images/icons/' + currentProject.icon.png" />
                </div>
                <div class="project-name shadow">
                    {{ currentProject.name }}
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import projects from '/assets/data/projects.json'
const { videos, duration } = defineProps({
    videos: {
        type: Array,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

let currentTime = 0;
let videoIndex = 0;
const currentVideo = ref(videos[videoIndex]);
const currentProject = computed(() => projects.find(project => project.id === currentVideo.value.project));

// Increment current time every sec
setInterval(() => {
    currentTime += 1;
    if (currentTime >= duration) {
        currentTime = 0;
        videoIndex++;
        if (videoIndex >= videos.length) {
            videoIndex = 0;
        }
        currentVideo.value = videos[videoIndex];
    }
}, 1000);
</script>

<style scoped>
.demo-reel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 680px;
    max-height: 210px;
    background-color: var(--dark-gray);
    border-radius: 0.5rem;
}

.demo-reel:hover {
    cursor: pointer;
    transform: scale(1.01);
}

.demo-reel video {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border-radius: 0.5rem;
    transition: opacity 1s ease-in-out;
}

.demo-reel .overlay {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    z-index: 10;
    height: 0;
    width: 100%;
    transform: translate(-1rem, -1.6rem);
}

.overlay .project-icon {
    width: 2.5rem;
    height: 2.5rem;
}

.overlay .project-name {
    font-size: 1.3rem;
    font-weight: 700;
}

.project-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
}

.project-icon object {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}
</style>