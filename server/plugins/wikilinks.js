const getProjectFromId = (id) => {
    // Split the ID by :
    const splitId = id.split(':');
    // Get the third item in the array
    const projectId = splitId[3];
    if (projectId) {
        return projectId;
    }
    return "";
}

// Match all links surrounded with double square brackets [[Like this]] and replace them with [Like this](Like-this)
const parseWikiLinks = (text, id) => {
    let parsed = text;
    const project = getProjectFromId(id);
    const wikiLinkRegex = /\[\[([^\]]*)\]\]/g;
    const wikiLinks = parsed.matchAll(wikiLinkRegex);
    for (const link of wikiLinks) {
        const linkName = link[1];
        const linkPath = linkName.replace(/ /g, '-');
        parsed = parsed.replace(link[0], `[${linkName}](/docs/${project}/${linkPath})`);
    }
    return parsed;
}

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:beforeParse', (file) => {
        if (file._id.endsWith('.md')) {
            file.body = parseWikiLinks(file.body, file._id)
        }
    })
})