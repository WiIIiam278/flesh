// Match all ""> **Text:** Blah" and replace with the following. If the text is "Warning", then type should be warning:
// ::notice
// ----
// title: Text
// type: info
// ----
// Blah
// ::
const parseNotices = (text) => {
    let parsed = text;

    const noticeRegex = /> \*\*([^\*]*)\*\* ([^\n]*)\n([^\n]*)\n/g;
    const notices = parsed.matchAll(noticeRegex);
    for (const notice of notices) {
        const noticeTitle = notice[1];
        const noticeType = noticeTitle.replace(":", "").toLowerCase() === 'warning' ? 'warning' : 'info';
        const noticeBody = notice[2];
        parsed = parsed.replace(notice[0], `::notice\n----\ntitle: '${noticeTitle}'\ntype: '${noticeType}'\n----\n\n${noticeBody}\n\n::\n`);
    }
    return parsed;
}

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:beforeParse', (file) => {
        if (file._id.endsWith('.md')) {
            file.body = parseNotices(file.body)
        }
    })
})