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


export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('mdc:file:beforeParse', (file) => {
        if (file._id.endsWith('.md')) {
            file.body = parseWikiLinks(file.body, file._id)
        }
    })
})