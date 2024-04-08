<template>
    <div v-if="project.id" class="project-card">
        <div class="header">
            <NuxtLink class="image hover-image" v-if="project.icon" :to="'/project/' + project.id">
                <object v-if="project.icon.svg" :data="'/images/icons/' + project.icon.svg" type="image/svg+xml" />
                <img v-else-if="project.icon.png" :src="'/images/icons/' + project.icon.png" />
            </NuxtLink>
            <div class="details">
                <NuxtLink :to="'/project/' + project.id">
                    <h3 class="name">{{ project.name ? project.name : project.id }}</h3>
                </NuxtLink>
                <div class="pills">
                    <TagPill v-for="tag in project.tags.slice(0, 3)" :tag="tag" :key="tag" />
                </div>
            </div>
        </div>
        <div class="body">
            <div class="description">
                <div class="tagline" v-if="project.tagline">
                    <IconifiedText class="discontinued" v-if="project.discontinued" icon="fa6-solid:box-archive">
                        {{$t('project-archived')}}
                    </IconifiedText>
                    <p>{{ project.tagline }}</p>
                </div>
                <div class="buttons">
                    <ButtonLink v-if="project.documentation" :link="'/docs/' + project.id" icon="fa6-solid:book" hollow>
                        {{$t('link-docs')}}
                    </ButtonLink>
                    <ButtonLink v-for="link in project.links" :link="link.link" hollow>{{ link.text }}</ButtonLink>
                    <ButtonLink v-if="project.repository" :link="project.repository" icon="fa6-brands:github">
                    </ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.itch" :link="project.ids.itch"
                        icon="fa6-brands:itch-io"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.universaldb" :link="project.ids.universaldb"
                        icon="fa6-solid:down-long"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.spigot"
                        :link="'https://spigotmc.org/resources/' + project.ids.spigot" icon="fa6-solid:faucet">
                    </ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.polymart"
                        :link="'https://polymart.org/resource/' + project.ids.polymart" icon="fa6-solid:p"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.modrinth"
                        :link="'https://modrinth.com/plugin/' + project.ids.modrinth" icon="fa6-solid:wrench">
                    </ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.builtbybit"
                        :link="'https://builtbybit.com/resources/' + project.ids.builtbybit" icon="fa6-solid:cube">
                    </ButtonLink>
                </div>
            </div>
            <div class="stats" v-if="stats">
                <div class="stat" v-if="stats.total_downloads">
                    <IconifiedText icon="fa6-solid:download">
                        {{ stats.total_downloads >= 1000 ? (stats.total_downloads / 1000).toFixed(1) + 'k' : stats.total_downloads }}
                    </IconifiedText>
                </div>
                <div class="stat" v-if="stats.average_rating">
                    <IconifiedText icon="fa6-solid:star">
                        {{ stats.average_rating.toFixed(1) }}
                    </IconifiedText>
                </div>
                <div class="stat" v-if="stats.latest_version">
                    <IconifiedText icon="fa6-solid:code-branch">
                        {{ stats.latest_version }}
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

// Expost stats as a fetch to /api/stats/:id
let {data} = await useFetch(`/api/stats/${project.id}`)
const stats = data;
</script>

<style scoped>
.project-card {
    border: 0.2rem solid var(--light-gray);
    border-radius: 0.5rem;
    min-width: 50%;
    max-width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    margin: 0.5rem 0.5rem;
    padding: 0.75rem;
}

.header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}

.details {
    justify-self: flex-end;
    margin-right: auto;
}

.image {
    justify-self: flex-end;
}

.image img {
    max-width: 64px;
    max-height: 64px;
    min-width: 64px;
    min-height: 64px;
    height: 100%;
    border-radius: 0.5em;
}

.image object {
    max-width: 64px;
    max-height: 64px;
    min-width: 64px;
    min-height: 64px;
    height: 100%;
    border-radius: 0.5rem;
}

.details {
    display: flex;
    flex-direction: column;
}

.name {
    margin: 0;
}

.pills {
    display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    margin: 0.4rem -0.2rem;
    font-size: 0.9rem;
}

.description {
    display: flex;
    flex-direction: column;
}

.tagline .discontinued {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    color: var(--light-gray)
}

.buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: auto;
    justify-self: flex-end;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 0.35rem;
}

.stats {
    display: flex;
    flex-direction: column;
    color: var(--light-gray);
    justify-content: flex-end;
    align-items: flex-end;
    margin-left: auto;
    font-size: 0.9rem;
}

.stats .stat {
    white-space: nowrap;
}

.body {
    width: 100%;
    display: flex;
    flex-direction: row;
}

/* Smaller than 350px */
@media only screen and (max-width: 22em) {
    .project-card {
        flex-direction: column;
    }

    .header {
        flex-direction: column;
        align-items: center;
    }

    .body {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .stats {
        margin-top: 0.5rem;
        margin-left: 0;
        flex-direction: row;
        gap: 1rem;
    }

    .image {
        margin-bottom: 0.5rem;
    }

    .details {
        margin-right: 0;
    }

    .buttons {
        justify-content: center;
    }
}
</style>