<template>
    <div class="main-header">
        <div class="header-text">
            <h1>{{ title }}</h1>
            <p class="tagline">
                <ContentSlot :use="$slots.default" unwrap="p" />
            </p>
        </div>
        <object data="/images/icons/william278.svg" class="head-graphic shadow" alt="William278.net husk silhouette logo" />
    </div>
</template>

<style scoped>
.main-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.main-header .header-text {
    display: flex;
    flex-direction: column;
}

.header-text h1 {
    margin: 0;
}

.header-text p {
    margin: 0;
    font-size: large;
}

.head-graphic {
    display: flex;
    justify-content: flex-end;
    border-radius: 0.5em;
    width: 64px;
    height: 64px;
}
</style>

<script setup>
const { title } = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>