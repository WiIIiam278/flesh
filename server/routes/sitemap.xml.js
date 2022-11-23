import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

// If the path contains docs/project/ replace it with docs/
const filterPath = (path) => {
  if (path.includes('docs/project/')) {
    return path.replace('docs/project/', 'docs/')
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