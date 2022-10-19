<template>
    <NuxtLayout>
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
                <ContentDoc />
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
#page-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1400px;
    width: 90vw;
}

#left-column {
    flex: 1;
    padding: 0 1rem;
}

#right-column {
    flex: 1;
    padding: 0 1rem;
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
import projects from '/assets/data/projects.json'

definePageMeta({
    title: 'William278 - Home',
    description: 'Open source Minecraft server software & game projects.',
    layout: 'home'
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