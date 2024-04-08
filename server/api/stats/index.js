// Serve project stats via the api
import mineget from "mineget";
import projects from '../../../assets/data/projects.json';

let timestamp;
const platforms = ['spigot', 'modrinth', 'polymart', 'github']
const stats = {};

const updateStats = async () => {
    for (const project of projects) {
        const ids = {};

        // Add github id if available
        if (project.repository && project.repository.includes('github.com')) { 
            ids['github'] = project.repository.replace('https://github.com/', ''); 
        }
    
        // Filter by allowed platforms
        if (project.ids) {
            platforms.forEach(platform => {
                if (project.ids[platform]) {
                    ids[platform] = project.ids[platform];
                }
            });
        }
    
        stats[project.id] = await mineget.get(ids)
            .catch(e => {
                console.log(e);
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