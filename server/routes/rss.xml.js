import RSS from 'rss'
import ufs from 'url-file-size'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const fetchPosts = async (page) => (await $fetch(`${BASE_URL}/v1/posts`, { params: { page: page } }));

export default defineEventHandler(async (event) => {
    const { res } = event;

    // Query content
    const currentPage = parseInt(getQuery(event)?.page ?? '1');
    if (currentPage <= 0) {
        setResponseStatus(event, 400, "Bad request");
        return "Bad request";
    }
    const { content, page } = await fetchPosts(currentPage - 1);
    const { totalPages } = page;
    if (currentPage > totalPages) {
        setResponseStatus(event, 400, "Bad request");
        return "Bad request";
    }

    // Generate feed
    const feed = new RSS({
        title: 'William278.net Posts',
        language: 'en',
        site_url: 'https://william278.net/',
        feed_url: 'https://william278.net/rss.xml',
        image_url: 'https://william278.net/images/icons/william278.png',
        custom_elements: [
            { 'link': {
                _attr: {
                    'rel': 'self',
                    'href': `https://william278.net/rss.xml?page=${currentPage}`
                }
            }},
            { 'link': {
                _attr: {
                    'rel': 'first',
                    'href': `https://william278.net/rss.xml?page=1`
                }
            }},
            { 'link': {
                _attr: {
                    'rel': 'last',
                    'href': `https://william278.net/rss.xml?page=${totalPages}`
                }
            }}
        ]
    });

    // Format pages
    if (currentPage !== totalPages) {
        feed.custom_elements.push({ 'link': {
            _attr: {
                'rel': 'next',
                'href': `https://william278.net/rss.xml?page=${currentPage + 1}`
            }
        }});
    }
    if (currentPage > 1) {
        feed.custom_elements.push({ 'link': {
            _attr: {
                'rel': 'previous',
                'href': `https://william278.net/rss.xml?page=${currentPage - 1}`
            }
        }});
    }

    for (const post of content) {
        feed.item({
            title: post.title ?? '-',
            url: `https://william278.net/posts/${post.slug}`,
            date: new Date(post.timestamp),
            description: post.body?.split('\n')[0] ?? '-'
            // enclosure: {
            //     url: `https://william278.net/images/${post.image}`,
            //     type: 'image/png',
            //     size: await ufs(`https://william278.net/images/${post.image}`)
            // }
        })
    }

    const feedString = feed.xml({ indent: true });
    res.setHeader('content-type', 'application/rss+xml');
    res.end(feedString);
})