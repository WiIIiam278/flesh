<template>
    <div id="projects-grid" class="collapsed">
        <ProjectCard v-for="index in Math.min(shown, projects.length)"
            :key="projects[index-1].id" :project="projects[index-1]" />
        <ProjectCard v-if="expanded" v-for="project in projects.slice(shown)" :key="project.id"
            :project="project" />
    </div>
    <div id="below-grid">
        <a id="grid-size-button" @click="expandGrid">
            <IconifiedText :icon="expanderIcon">{{ expanderText }}</IconifiedText>
        </a>
    </div>
</template>

<style scoped>
#projects-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
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

export default {
    data() {
        return {
            expanded: false,
            expanderText: "Show more",
            expanderIcon: "fa6-solid:chevron-down",
            projects: projects
        }
    },
    props: {
        shown: {
            type: Number,
            required: false,
            default: 6
        }
    },
    methods: {
        expandGrid() {
            this.expanded = !this.expanded;
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