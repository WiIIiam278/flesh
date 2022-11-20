// Serve project stats via the api
import { get } from 'mineget';
import projects from '../../../assets/data/projects.json'

let timestamp;
const stats = {};

const updateStats = async (project) => {
    stats[project.id] = await get(project.ids);
    timestamp = Date.now();
}

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const project = projects.find(p => p.id === id);
    if (!project || !project.ids) {
        return {
            status_code: 404,
            body: 'Not found'
        }
    }

    // Cache stats for an hour
    if (!Object.keys(stats).includes(project.id)) {
        await updateStats(project);
    }
    if (Date.now() - timestamp < 3600000) {
        return stats[project.id];
    }

    updateStats(project);
    return stats[project.id];
})