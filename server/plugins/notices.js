// Special wiki markup parsing


export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:beforeParse', (file) => {
        if (file._id.endsWith('.md')) {
            file.body = parseNotices(file.body)
        }
    })
})