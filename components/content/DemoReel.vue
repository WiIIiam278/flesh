<template>
    <div class="demo-reel shadow">
        <video autoplay muted playsinline loop>
            <source :src="'/assets/videos/' + video" type="video/mp4">
            <span>Your browser does not support HTML5! :-(</span>
        </video>
    </div>
</template>

<style>
.demo-reel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 680px;
    max-height: 210px;
}

.demo-reel video {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}
</style>

<script>
export default {
    name: 'DemoReel',
    props: {
        video: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: false,
            default: 'Demo reel video'
        },
        project_id: {
            type: String,
            required: true
        }
    }
}
</script>