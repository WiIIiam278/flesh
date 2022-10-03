<template>
    <div class="demo-reel shadow">
        <div class="name">
            <NuxtLink :to="'/project/' + project.id">
                <h3 class="title">
                    <IconifiedText icon="fa6-solid:play">{{ project.name }}</IconifiedText>
                </h3>
            </NuxtLink>
        </div>
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

.demo-reel .name {
    z-index: 1;
    position: absolute;
    align-self: flex-end;
    margin: auto;
    width: auto;
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
        project: {
            type: Object,
            required: true
        }
    }
}
</script>