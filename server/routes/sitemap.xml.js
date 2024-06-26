import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

// If the path contains docs/project/ replace it with docs/
const filterPath = (path) => {
  // If the path matches a regex of /docs/project/NAME/LANG/TOPIC, replace with /docs/NAME/TOPIC
  const match = path.match(/\/docs\/project\/([^/]+)\/([^/]+)\/([^/]+)/)
  if (match) {
    return `/docs/${match[1]}/${match[3]}`
  }
  
  // If the path ends with /LANG, remove it
  const langMatch = path.match(/(.+)\/[a-z]{2}$/)
  if (langMatch) {
    return langMatch[1]
  }
  
  return path;
}

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: 'https://william278.net'
  })

  for (const doc of docs) {
    sitemap.write({
      url: filterPath(doc._path),
      changefreq: 'monthly'
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})