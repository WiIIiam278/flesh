import RSS from 'rss'
import ufs from 'url-file-size'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
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
        site_url: `${FRONTEND_URL}/`,
        feed_url: `${FRONTEND_URL}/rss.xml`,
        image_url: `${FRONTEND_URL}/images/icons/william278.png`,
        custom_elements: [
            { 'link': {
                _attr: {
                    'rel': 'self',
                    'href': `${FRONTEND_URL}/rss.xml?page=${currentPage}`
                }
            }},
            { 'link': {
                _attr: {
                    'rel': 'first',
                    'href': `${FRONTEND_URL}/rss.xml?page=1`
                }
            }},
            { 'link': {
                _attr: {
                    'rel': 'last',
                    'href': `${FRONTEND_URL}/rss.xml?page=${totalPages}`
                }
            }}
        ]
    });

    // Format pages
    if (currentPage !== totalPages) {
        feed.custom_elements.push({ 'link': {
            _attr: {
                'rel': 'next',
                'href': `${FRONTEND_URL}/rss.xml?page=${currentPage + 1}`
            }
        }});
    }
    if (currentPage > 1) {
        feed.custom_elements.push({ 'link': {
            _attr: {
                'rel': 'previous',
                'href': `${FRONTEND_URL}/rss.xml?page=${currentPage - 1}`
            }
        }});
    }

    for (const post of content) {
        const item = {
            title: post.title ?? '-',
            url: `${FRONTEND_URL}/posts/${post.slug}`,
            date: new Date(post.timestamp),
            description: post.body?.split('\n')[0] ?? '-'
        };

        // Get image URL
        let url = post.imageUrl 
            ? (post.imageUrl[0] === '/') ?  `${FRONTEND_URL}${post.imageUrl}` : post.imageUrl
            : `${FRONTEND_URL}/images/thumbnails/posts/${post.slug}/card.png`;

        item.enclosure = {
            url: url,
            type: 'image/png',
        }

        // Get image size
        try {
            item.enclosure.size = await ufs(url)
        } catch (err) {
            console.log('Error getting image file size for RSS feed: ' + err)
        }
        feed.item(item)
    }

    const feedString = feed.xml({ indent: true });
    res.setHeader('content-type', 'application/rss+xml');
    res.end(feedString);
})