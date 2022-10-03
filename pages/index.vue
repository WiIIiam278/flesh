<template>
    <div id="page-content">
        <div id="left-column">
            <h1>My projects</h1>
            <div id="projects-grid" class="collapsed">
                <ProjectCard v-if="expanderText === 'Show more'" v-for="index in Math.min(6, projects.length)"
                    :key="projects[index-1].id" :project="projects[index-1]" />
                <ProjectCard v-if="expanderText !== 'Show more'" v-for="project in projects" :key="project.id"
                    :project="project" />
            </div>
            <div id="below-grid">
                <a id="grid-size-button" @click="expandGrid">
                    <IconifiedText :icon="expanderIcon">{{ expanderText }}</IconifiedText>
                </a>
            </div>
        </div>
        <div id="right-column">
            <div id="main-header">
                <div id="header-text">
                    <h1>William278.net</h1>
                    <p id="tagline">Open source Minecraft server software & game projects.</p>
                </div>
                <a id="header-icon" href="https://twitter.com/William27528" target="_blank">
                    <img src="assets/images/icons/william-head.png" id="head-graphic" class="shadow"
                        alt="William278's player head" />
                </a>
            </div>
            <DemoReel video="loaded-dice-promo-banner.mp4" :project="projects[9]" />
            <p>This site contains easily-accessible documentation and information about my various projects.
                Additionally, I provide human support for my Minecraft plugins through the HuskHelp Discord.</p>
            <p>
                <Button href="/docs" icon="fa6-solid:book" hollow=true>Docs</Button>&nbsp;
                <Button href="https://discord.gg/8Y4Y4Z9" icon="fa6-brands:discord" hollow=true>Discord</Button>
            </p>
        </div>
    </div>
</template>

<style scoped>
#page-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1400px;
    padding: 0 2rem;
}

#left-column {
    flex: 1;
    margin-right: 2rem;
}

#right-column {
    flex: 1;
}

#main-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

#main-header #header-text {
    display: flex;
    flex-direction: column;
}

#header-text h1 {
    margin: 0;
}

#header-text p {
    margin: 0;
    font-size: large;
}

#main-header #header-icon {
    display: flex;
    justify-content: flex-end;
}

#head-graphic {
    margin: 1.5em 0;
    border-radius: 0.5em;
}

#projects-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
}

#below-grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0.3rem;
}

#grid-size-button:hover {
    cursor: pointer;
}
</style>

<script>
import projects from '~/assets/data/projects.json'

definePageMeta({
    title: 'William278 - Home',
    description: 'Open source Minecraft server software & game projects.',
    layout: 'basic'
})

export default {
    data() {
        return {
            expanderText: "Show more",
            expanderIcon: "fa6-solid:chevron-down",
            projects: projects
        }
    },
    methods: {
        expandGrid() {
            if (this.expanderText === "Show more") {
                this.expanderText = "Show less";
                this.expanderIcon = "fa6-solid:chevron-up";
            } else {
                this.expanderText = "Show more";
                this.expanderIcon = "fa6-solid:chevron-down";
            }
        }
    }
}
</script>