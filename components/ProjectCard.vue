<template>
    <div v-if="project.id" class="project-card">
        <div class="header">
            <NuxtLink class="image hover-image" v-if="project.icon" :to="'project/' + project.id">
                <object v-if="project.icon.svg" :data="'/images/icons/' + project.icon.svg"
                    type="image/svg+xml" />
                <img v-else-if="project.icon.png" :src="'/images/icons/' + project.icon.png" />
            </NuxtLink>
            <div class="details">
                <NuxtLink :to="'project/' + project.id">
                    <h3 class="name">{{ project.name ? project.name : project.id }}</h3>
                </NuxtLink>
                <div class="pills">
                    <Pill v-for="tag in project.tags" :key="tag">{{ tag }}</Pill>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="description">
                <div class="tagline" v-if="project.tagline">
                    <p>{{ project.tagline }}</p>
                </div>
                <div class="buttons">
                    <ButtonLink v-if="project.documentation" :link="'/docs/' + project.id" icon="fa6-solid:book" hollow>Docs</ButtonLink>
                    <ButtonLink v-for="link in project.links" :link="link.link" hollow>{{ link.text }}</ButtonLink>
                    <ButtonLink v-if="project.repository" :link="project.repository" icon="fa6-brands:github"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.itch" :link="project.ids.itch" icon="fa6-brands:itch-io"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.spigot" :link="'https://spigotmc.org/resources/' + project.ids.spigot" icon="fa6-solid:faucet"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.polymart" :link="'https://polymart.org/resource/' + project.ids.polymart" icon="fa6-solid:p"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.songoda" :link="'https://songoda.com/marketplace/product/' + project.ids.songoda" icon="fa6-solid:shield-halved"></ButtonLink>
                    <ButtonLink v-if="project.ids && project.ids.modrinth" :link="'https://modrinth.com/plugin/' + project.ids.modrinth" icon="fa6-solid:wrench"></ButtonLink>
                
                </div>
            </div>
            <div class="stats">

            </div>
        </div>
    </div>
</template>

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
    color-scheme: light;
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

.buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: auto;
    justify-self: flex-end;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.buttons .button-link {
    margin-right: 0.5rem;
}

.body {
    display: flex;
    flex-direction: row;
}
</style>

<script>
export default {
    name: 'ProjectCard',
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>