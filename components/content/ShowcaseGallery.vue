<template>
    <div class="gallery">
        <div class="gallery-item shadow" v-for="(slide, index) in slides" :key="index"
            :style="{ transform: `translateY(-${slideOffset}%)` }">
            <img :src="slide.img" :alt="slide.text" />
            <div class="caption">
                <a class="caption-link shadow" :href="slide.link" target="_blank">
                    {{ slide.text }}
                    <Icon name="fa6-solid:up-right-from-square" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const { slides } = defineProps({
    slides: {
        type: Array,
        required: true
    }
})

const slideCount = slides.length
const slide = ref(0)
const slideOffset = computed(() => slide.value * 100)

const nextSlide = () => {
    if (slide.value < slideCount - 1) {
        slide.value++
    } else {
        slide.value = 0
    }
}

onMounted(() => {
    setInterval(() => {
        nextSlide()
    }, 5000)
})
</script>

<style scoped>
.gallery {
    overflow: hidden;
    width: 100%;
    height: 200px;
    position: relative;
    border-radius: 0.5rem;
}

.gallery img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 200px;
    border-radius: 0.5rem;
}

.gallery .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 0.5rem;
    width: 100%;
    font-weight: 600;
}

.caption .caption-link {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
}

.gallery div {
    transition: transform 0.5s ease;
}

.gallery div:nth-child(1) {
    z-index: 1;
}

.gallery div:nth-child(2) {
    z-index: 2;
}

.gallery div:nth-child(3) {
    z-index: 3;
}

.gallery div:nth-child(4) {
    z-index: 4;
}

.gallery div:nth-child(5) {
    z-index: 5;
}
</style>