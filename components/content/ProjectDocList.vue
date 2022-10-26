<template>
    <ul class="project-doc-list">
        <li v-for="project in projects.filter(p => p.documentation)" :key="project.id" >
            <NuxtLink :to="'/docs/' + project.id">
                <IconifiedProject :project="project" />
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
import projects from '/assets/data/projects.json'

export default {
    data() {
        return {
            projects: projects
        }
    }
}
</script>