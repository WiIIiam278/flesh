// Serve project stats via the api
import mineget from "mineget";
import projects from '../../../assets/data/projects.json'

let timestamp;
const platforms = ['spigot', 'modrinth', 'polymart', 'hangar', 'github']
const stats = {};

const updateStats = async (project) => {
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
    timestamp = Date.now();
}

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const project = projects.find(p => p.id === id);
    if (!project || !(project.ids || project.repository)) {
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

    await updateStats(project);
    return stats[project.id];
})