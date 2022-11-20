// Serve project stats via the api
import { get } from 'mineget';
import projects from '../../../assets/data/projects.json';

let timestamp;
const stats = {};

export default defineEventHandler(async (event) => {
    // Cache stats for an hour
    if (Object.keys(stats).length > 0 && Date.now() - timestamp < 3600000) {
        return stats;
    }
    
    for (const project of projects) {
        if (!project.ids) {
            continue;
        }

        stats[project.id] = await get(project.ids);
        timestamp = Date.now();
    }
    return stats;
});