// Serve project stats via the api
import mineget from "mineget";
import projects from '../../../assets/data/projects.json';

let timestamp;
const stats = {};

const updateStats = async () => {
    for (const project of projects) {
        if (!project.ids) continue;
        stats[project.id] = await mineget.get(project.ids)
            .catch(() => {
                return {
                    status_code: 500,
                    body: 'Internal server error'
                }
            });
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