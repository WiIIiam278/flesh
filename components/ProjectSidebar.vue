<template>
    <div class="project-sidebar">
        <div class="header">
            <div class="meta">
                <h1 class="name">{{ project.name }}</h1>
                <div class="pills">
                    <TagPill v-for="tag in project.tags" :tag="tag" />
                </div>
            </div>
            <div class="icon" v-if="project.icon">
                <object v-if="project.icon.svg" :data="'/images/icons/' + project.icon.svg" type="image/svg+xml" />
                <img v-else-if="project.icon.png" :src="'/images/icons/' + project.icon.png" />
            </div>
        </div>
        <div class="gallery" v-if="project.assets && project.assets.images" @click="galleryClick()">
            <div v-for="image in project.assets.images"
                :class="'image hover-image ' + (project.assets.images.indexOf(image) === 0 ? 'shown' : '')" :key="image"
                :id="'gallery-' + project.assets.images.indexOf(image)">
                <img class="shadow" :src="'/images/' + image.url" :alt="image.description" />
            </div>
        </div>
        <div class="tagline">{{ project.tagline }}</div>
        <div class="buttons"
            v-if="project.documentation || (project.links && project.links.length > 0) || project.repository">
            <ButtonLink v-if="project.documentation" :link="'/docs/' + project.id" icon="fa6-solid:book" hollow>
                {{ $t('link-docs') }}
            </ButtonLink>
            <ButtonLink v-for="link in project.links" :link="link.link" hollow>
                {{ link.text }}
            </ButtonLink>
            <ButtonLink v-if="project.repository" :link="project.repository" icon="fa6-brands:github" hollow>
                {{ $t('project-link-repository') }}
            </ButtonLink>
        </div>
        <div class="buttons" v-if="project.ids">
            <ButtonLink v-if="project.ids.itch" :link="project.ids.itch" icon="fa6-brands:itch-io" hollow>
                {{ $t('project-link-itch') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids.universaldb" :link="project.ids.universaldb" icon="fa6-solid:down-long" hollow>
                {{ $t('project-link-universaldb') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids.spigot" :link="'https://spigotmc.org/resources/' + project.ids.spigot"
                icon="fa6-solid:faucet" hollow>
                {{ $t('project-link-spigot') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids.polymart" :link="'https://polymart.org/resource/' + project.ids.polymart"
                icon="fa6-solid:p" hollow>
                {{ $t('project-link-polymart') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.modrinth"
                :link="'https://modrinth.com/plugin/' + project.ids.modrinth" icon="fa6-solid:wrench" hollow>
                {{ $t('project-link-modrinth') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.hangar"
                :link="'https://hangar.papermc.io/' + project.ids.hangar" icon="fa6-solid:paper-plane" hollow>
                {{ $t('project-link-hangar') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.curseforge"
                :link="'https://www.curseforge.com/minecraft/mc-mods/' + project.ids.curseforge" icon="fa6-solid:fire" hollow>
                {{ $t('project-link-curseforge') }}
            </ButtonLink>
            <ButtonLink v-if="project.ids && project.ids.builtbybit"
                :link="'https://builtbybit.com/resources/' + project.ids.builtbybit" icon="fa6-solid:cube" hollow>
                {{ $t('project-link-builtbybit') }}
            </ButtonLink>
        </div>
        <div class="stats">
            <div class="stat" v-if="stats.lowest_price">
                <div class="stat-descriptor">{{ $t('project-price') }}</div>
                <div class="stat-data">
                    {{$t('project-price-sterling', {'price': stats.lowest_price.toFixed(2)})}}
                </div>
            </div>
            <div class="stat" v-if="project.license && project.license.id">
                <div class="stat-descriptor">{{ $t('project-license') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:scale-balanced">
                        <span>{{ project.license.id }}</span>
                        <a v-if="project.license.url" :href="project.license.url">
                            <Icon class="license-link" name="fa6-solid:arrow-up-right-from-square" /> 
                        </a>
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.total_downloads">
                <div class="stat-descriptor">{{ $t('project-downloads') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:download">
                        {{ stats.total_downloads >= 1000 ? (stats.total_downloads / 1000).toFixed(1) + 'k' :
                                stats.total_downloads
                        }}
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.average_rating">
                <div class="stat-descriptor">{{ $t('project-average-rating') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:star">
                        {{ stats.average_rating.toFixed(1) }}
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.latest_version">
                <div class="stat-descriptor">{{ $t('project-latest-version') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:code-branch">
                        {{ stats.latest_version }}
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.last_updated">
                <div class="stat-descriptor">{{ $t('project-last-updated') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:clock-rotate-left">
                        {{ new Date(stats.last_updated).toLocaleDateString() }}
                    </IconifiedText>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TagPill from './TagPill.vue';

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
})

let galleryIndex = 0;
const galleryClick = () => {
    document.getElementById('gallery-' + galleryIndex).classList.remove('shown');
    galleryIndex++;
    if (galleryIndex >= project.assets.images.length) {
        galleryIndex = 0;
    }
    document.getElementById('gallery-' + galleryIndex).classList.add('shown');
}

let { data } = await useFetch(`/api/stats/${project.id}`)
const stats = data;
</script>

<style scoped>
.project-sidebar {
    display: flex;
    flex-direction: column;
    min-width: 20vw;
    max-width: 100%;
    gap: 0.5rem;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

.tagline {
    margin: 0.8rem 0;
}

.gallery .image {
    width: 100%;
    height: auto;
    display: none;
}

.gallery .shown {
    display: block !important;
}

.image img {
    max-height: 16rem;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0.5rem;
}


.buttons {
    margin-left: -0.35rem;
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    margin: 0.5rem 0;
}

.stats .stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.175rem solid var(--light-gray);
    border-radius: 0.5rem;
    padding: 0.4rem 0.5rem;
}

.stat .stat-descriptor {
    font-size: 0.9rem;
    color: var(--light-gray);
}

.stat .license-link {
    margin-left: 0.3rem;
    font-size: 0.8rem;
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

    .meta .pills {
        justify-content: center;
    }
}
</style>