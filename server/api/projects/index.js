// Serve projects via the api
import projects from '../../../assets/data/projects.json'

export default defineEventHandler(async (event) => {
    return projects
})