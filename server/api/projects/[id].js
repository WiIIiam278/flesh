// Serve projects via the api
import projects from '../../../assets/data/projects.json'

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const project = projects.find(p => p.id === id);
    if (!project) {
        return {
            status_code: 404,
            body: 'Not found'
        }
    }
    return project;
})