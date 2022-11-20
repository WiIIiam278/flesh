const { get } = require('mineget')
const projects = require('../assets/data/projects.json')
const fs = require('fs')
let stats = {};

module.exports = {
    fetchStats: async () => {
        console.log('Fetching stats...');
        for (const project of projects) {
            if (!project.ids) {
                continue;
            }

            stats[project.id] = await get(project.ids);
        }

        // Create stats if not exist
        fs.writeFile('./assets/data/stats.json', JSON.stringify(stats, null, 4), (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}