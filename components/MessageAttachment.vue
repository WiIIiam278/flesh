<template>
    <div class="attachment">
        <img class="image-attachment shadow" v-if="isImage" :src="attachment.url"
            @error="this.target.src='/images/missing-image.png'" alt="Message attachment" />
        <video class="video-attachment shadow" v-else-if="isVideo" controls :src="attachment.url"
            alt="Message attachment" />
        <div class="audio-attachment boxed-attachment shadow" v-else-if="isAudio">
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-audio">{{ attachment.name }}</IconifiedText>
            </a>
            <span>Audio file</span>
            <audio controls :src="attachment.url" alt="Message attachment" />
        </div>
        <div class="text-attachment boxed-attachment shadow" v-else-if="isText">
            <article class="preview">
                <code>
                    <pre> {{ getText() }} </pre>
                </code>
            </article>
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-arrow-down">{{ attachment.name }}</IconifiedText>
            </a>
            <span>Text file</span>
        </div>
        <div class="file-attachment boxed-attachment shadow" v-else>
            <a class="attachment-link" :href="attachment.url" target="_blank" rel="noopener noreferrer">
                <IconifiedText icon="fa6-solid:file-arrow-down">{{ attachment.name }}</IconifiedText>
            </a>
            <span>File attachment</span>
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

const isImage = attachment.type.startsWith('image');
const isVideo = attachment.type.startsWith('video');
const isAudio = attachment.type.startsWith('audio');
const isText = attachment.type.startsWith('text');

// method for fetching text
const getText = useFetch(attachment.url);
</script>