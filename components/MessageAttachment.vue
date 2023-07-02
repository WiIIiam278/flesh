<template>
    <div class="attachment">
        <img class="image-attachment shadow" v-if="getType() === 'Image'" :src="attachment.url"
            @error="this.target.src = '/images/missing-image.png'" alt="Message attachment" />
        <video class="video-attachment shadow" v-else-if="getType() === 'Video'" controls :src="attachment.url"
            alt="Message attachment" />
        <div class="audio-attachment boxed-attachment shadow" v-else-if="getType() === 'Audio'">
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-audio">{{ attachment.name }}</IconifiedText>
            </a>
            <audio controls :src="attachment.url" alt="Message attachment" />
        </div>
        <div class="text-attachment boxed-attachment shadow" v-else-if="getType() === 'Text'">
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-arrow-down">{{ attachment.name }}</IconifiedText>
            </a>
            <code class="preview">
                <pre> {{ text }} </pre>
            </code>
        </div>
        <div class="file-attachment boxed-attachment shadow" v-else>
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-arrow-down">{{ attachment.name }}</IconifiedText>
            </a>
            <span>{{ getType() }} attachment</span>
        </div>
    </div>
</template>

<style scoped>
.attachment,
.attachment video,
.attachment img {
    max-height: 45vh;
    max-width: 50vw;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
}

.attachment .preview {
    max-height: 45vh;
    max-width: 50vw;
    margin: 0.5rem 0;
    padding-left: 1rem;
    border-radius: 0.5rem;
    overflow: scroll;
}

.boxed-attachment {
    background-color: var(--background);
    padding: 1rem;
    display: flex;
    border-radius: 0.5rem;
    flex-direction: column;
    width: fit-content;
    gap: 0.5rem;
    max-width: 50vw;
    color: var(--light-gray);
}
</style>

<script setup>
const { attachment } = defineProps({
    attachment: {
        type: Object,
        required: true
    }
});

const getType = () => {
    if (attachment.type.startsWith('image')) {
        return 'Image';
    } else if (attachment.type.startsWith('video')) {
        return 'Video';
    } else if (attachment.type.startsWith('audio')) {
        return 'Audio';
    } else if (attachment.type.startsWith('text')) {
        return 'Text';
    } else {
        return 'File';
    }
}

const text = getType() === 'Text'
    ? await fetch(attachment.url, new Headers({
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
    }))
        .then(response => {
            if (response && response.ok) {
                return response.text();
            } else {
                return "Download to view file";
            }
        })
        .catch(() => "Download to view file")
    : attachment.name;
</script>