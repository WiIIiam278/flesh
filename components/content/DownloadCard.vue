<template>
<div class="download-card" @click="download">
    <div class="file-icon">
        <Icon name="fa6-solid:file-zipper" />
    </div>
    <div class="file-details">
        <div class="file-name">{{ file }}</div>
        <div class="file-size" v-if="size">{{ sizeString }}</div>
        <div class="file-size" v-else>Download</div>
    </div>
</div>
</template>

<style scoped>
.download-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--gray);
    max-width: 30rem;
    min-width: 20rem;
    border-radius: 0.5rem;
    border: 0.2rem solid transparent;
    padding: 0.3rem;
}

.download-card:hover {
    cursor: pointer;
    filter: brightness(0.9);
    border: 0.2rem solid var(--accent);
    scale: 1.02;
}

.file-icon {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}

.file-details {
    display: flex;
    flex-direction: column;
}

.file-name {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--accent)
}

.file-size {
    font-size: 0.9rem;
    color :var(--light-gray);
}
</style>

<script setup>
const { bucket, file, endpoint } = defineProps({
    bucket: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: false,
        default: 'https://s3.william278.net/'
    }
})

const url = computed(() => {
    return endpoint + bucket + '/' + file
})

// Download
const download = () => {
    window.open(url.value, '_blank')
}

// Fetch file size using HEAD request
const size = ref(0)
const sizeString = computed(() => {
    if (size.value < 1024) {
        return size.value + ' B'
    } else if (size.value < 1024 * 1024) {
        return (size.value / 1024).toFixed(2) + ' KB'
    } else if (size.value < 1024 * 1024 * 1024) {
        return (size.value / 1024 / 1024).toFixed(2) + ' MB'
    } else {
        return (size.value / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    }
})

const fetchSize = async () => {
    const response = await fetch(url.value, {
        method: 'HEAD'
    })
    size.value = parseInt(response.headers.get('Content-Length'))
}
fetchSize()
</script>