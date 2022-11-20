// Serve project stats via the api
import { get } from 'mineget';
import projects from '../../../assets/data/projects.json';

let timestamp;
const stats = {};

const updateStats = async () => {
    for (const project of projects) {
        if (!project.ids) continue;
        stats[project.id] = await get(project.ids);
    }
    timestamp = Date.now();
}


export default defineEventHandler(async () => {
    // Cache stats for an hour
    if (Object.keys(stats).length <= 0) {
        await updateStats();
    }
    if (Date.now() - timestamp < 3600000) {
        return stats;
    }
    
    updateStats();
    return stats;
});