import { SitemapStream, streamToPromise } from 'sitemap'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;

const fetchProjects = async () => (await $fetch(`${BASE_URL}/v1/projects`)).filter(p => !p.metadata?.hidden);
const fetchDocsPages = async (projects) => {
  const pages = {};
  for (const p of projects.filter(p => p.metadata?.documentation)) {
    pages[p.slug] = Object.entries(await $fetch(`${BASE_URL}/v1/projects/${p.slug}/docs`));
  }
  return pages;
}

const writeHomepage = (sitemap) => {
  sitemap.write({
    url: '/',
    changefreq: 'daily',
    priority: 0.9
  })
}

const writeSpecialPages = (sitemap) => {
  sitemap.write({
    url: '/terms',
    changefreq: 'monthly',
    priority: 0.1
  })
  sitemap.write({
    url: '/redis-hosts',
    changefreq: 'monthly',
    priority: 0.2
  })
}

const writeProjects = (projects, sitemap) => projects.forEach(p => sitemap.write({
  url: `/project/${p.slug}`,
  changefreq: 'daily',
  priority: 0.8
}));

const writeDocs = (projects, pages, sitemap) => {
  sitemap.write({
    url: '/docs',
    changefreq: 'daily',
    priority: 0.7
  })
  projects.filter(p => p.metadata.documentation).forEach(p => {
    sitemap.write({
      url: `/docs/${p.slug}`,
      changefreq: 'monthly',
      priority: 0.6
    })
    pages[p.slug]?.filter(e => !e[0].startsWith('_') && e[0] !== 'home').forEach(e => {
      sitemap.write({
        url: `/docs/${p.slug}/${e[0]}`,
        changefreq: 'weekly',
        priority: 0.5
      })
    })
  })
}

export default defineEventHandler(async (event) => {
  // Build sitemap
  const sitemap = new SitemapStream({
    hostname: FRONTEND_URL,
    xmlns: {
      xhtml: true,
      image: true,
      video: true,
      custom: [
        'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
      ],
    }
  })

  // Fetch all documents
  const projects = await fetchProjects();
  const docsPages = await fetchDocsPages(projects);

  // Write pages
  writeHomepage(sitemap);
  writeProjects(projects, sitemap);
  writeDocs(projects, docsPages, sitemap);
  writeSpecialPages(sitemap);

  sitemap.end()

  return streamToPromise(sitemap)
})