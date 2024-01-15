// Serve stats via the api
import projects from '../../../assets/data/projects.json'
const endpoint = 'https://api.github.com/repos/';

const releases = {};

const formatReleases = (json, releases) => {
    const latestReleases = [];
    if (json.length > 0) {
        releases.platforms.forEach(platform => {
            json[0].assets.forEach(asset => {
                if (asset.name.startsWith(platform.match)) {
                    latestReleases.push({
                        platform: platform,
                        name: asset.name,
                        url: asset.browser_download_url,
                        size: asset.size,
                    });
                    return;
                }
            });
        });
    }
    return latestReleases;
}

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const project = projects.find(p => p.id === id);
    if (!project || !project.releases || !project.repository) {
        return {
            status_code: 404,
            body: 'Not found'
        }
    }

    if (releases[project.id]) {
        return releases[project.id];
    }

    const response = await fetch(endpoint + project.repository.replace('https://github.com/', '') + '/releases');
    const json = await response.json();
    if (json.length <= 0) {
        return {
            status_code: 404,
            body: 'No releases found'
        }
    }
    releases[project.id] = formatReleases(json, project.releases);
    return releases[project.id];
})