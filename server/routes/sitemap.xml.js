import { setResponseHeader } from 'h3'
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
const fetchPosts = async () => {
  const { totalPages } = (await $fetch(`${BASE_URL}/v1/posts`)).page;
  const pages = [];
  for (let p = 0; p < totalPages; p++) {
    Array.prototype.push.apply(pages, (await $fetch(`${BASE_URL}/v1/posts?page=${p}`)).content);
  }
  console.log(pages);
  return pages;
};

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

const writePosts = (posts, sitemap) => {
  sitemap.write({
    url: '/posts',
    changefreq: 'daily',
    priority: 0.8
  })
  posts.forEach(p => {
    sitemap.write({
      url: `/posts/${p.slug}`,
      changefreq: 'monthly',
      priority: 0.7
    })
  })
}

export default defineEventHandler(async (event) => {
  // Set content-type
  setResponseHeader(event, 'Content-Type', 'application/xml');

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
  const posts = await fetchPosts();

  // Write pages
  writeHomepage(sitemap);
  writeProjects(projects, sitemap);
  writeDocs(projects, docsPages, sitemap);
  writePosts(posts, sitemap);
  writeSpecialPages(sitemap);

  sitemap.end()

  return streamToPromise(sitemap);
})