<template>
    <div class="project-sidebar">
        <div class="header">
            <div class="meta">
                <h1 class="name">{{ project.name }}</h1>
                <div class="pills">
                    <Pill v-for="tag in project.tags" :key="tag">{{ tag }}</Pill>
                </div>
            </div>
            <div class="icon">
                <object v-if="project.icon.svg" :data="'/images/icons/' + project.icon.svg" type="image/svg+xml" />
                <img v-else-if="project.icon.png" :src="'/images/icons/' + project.icon.png" />
            </div>
        </div>
        <div class="gallery" v-if="project.assets && project.assets.images" @click="galleryClick()">
            <div v-for="image in project.assets.images"
                :class="'image hover-image ' + (project.assets.images.indexOf(image) === 0 ? 'shown' : '')" :key="image"
                :id="'gallery-' + project.assets.images.indexOf(image)">
                <img :src="'/images/' + image.url" :alt="image.description" />
            </div>
        </div>
        <div class="tagline">{{ project.tagline }}</div>
        <div class="buttons">
            <ButtonLink v-if="project.documentation" :link="'/docs/' + project.id" icon="fa6-solid:book" hollow>
                Docs
            </ButtonLink>
            <ButtonLink v-for="link in project.links" :link="link.link" hollow>
                {{ link.text }}
            </ButtonLink>
            <ButtonLink v-if="project.repository" :link="project.repository" icon="fa6-brands:github" hollow>
                Repository
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.itch" :link="project.ids.itch" icon="fa6-brands:itch-io"
                hollow>
                itch.io
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.spigot"
                :link="'https://spigotmc.org/resources/' + project.ids.spigot" icon="fa6-solid:faucet" hollow>
                SpigotMC
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.polymart"
                :link="'https://polymart.org/resource/' + project.ids.polymart" icon="fa6-solid:p" hollow>
                Polymart
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.songoda"
                :link="'https://songoda.com/marketplace/product/' + project.ids.songoda" icon="fa6-solid:shield-halved"
                hollow>
                Songoda
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.modrinth"
                :link="'https://modrinth.com/plugin/' + project.ids.modrinth" icon="fa6-solid:wrench" hollow>
                Modrinth
            </ButtonLink>
        </div>
        <div class="statistics">

        </div>
    </div>
</template>

<script>
import ButtonLink from './content/ButtonLink.vue';
let galleryIndex = 0;
export default {
    props: {
        project: {
            type: Object,
            required: true,
        }
    },
    methods: {
        galleryClick() {
            document.getElementById('gallery-' + galleryIndex).classList.remove('shown');
            galleryIndex++;
            if (galleryIndex >= this.project.assets.images.length) {
                galleryIndex = 0;
            }
            document.getElementById('gallery-' + galleryIndex).classList.add('shown');
        }
    },
    components: { ButtonLink }
}
</script>

<style scoped>
.project-sidebar {
    display: flex;
    flex-direction: column;
    min-width: 20vw;
    max-width: 100%;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.header .meta {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.meta .name {
    margin-bottom: 0;
}

.meta .pills {
    display: flex;
    margin-left: -0.1rem;
}

.header .icon {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon img,
.icon object {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.gallery {
    margin: 0.5rem 0;
}

.gallery .image {
    max-height: 16rem;
    width: 100%;
    height: auto;
    display: none;
}

.gallery .shown {
    display: block !important;
}

.image img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.tagline {
    margin: 0.5rem 0;
}

.buttons {
    margin: 0.5rem -0.35rem;
}

/* Less than 800px */
@media screen and (max-width: 50rem) {
    .project-sidebar {
        min-width: 100%;
    }
}

/* Less than 650px */
@media screen and (max-width: 40.625rem) {
    /* Align everything centrally */
    .project-sidebar {
        align-items: center;
        margin: 1rem 0;
        max-width: 85vw;
    }

    /* Move the icon to the top */
    .header {
        flex-direction: column-reverse;
        text-align: center;
    }

    .header .meta {
        margin-bottom: 0.5rem;
    }

    .tagline {
        text-align: center;
    }

    .buttons {
        text-align: center;
    }
}
</style>