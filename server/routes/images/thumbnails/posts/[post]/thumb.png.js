import { setResponseHeader } from 'h3'
import { registerFont, createCanvas, loadImage } from 'canvas'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;

const fetchPost = async (slug) => await $fetch(`${BASE_URL}/v1/posts/${slug}`)

// Add background and gradient
const drawBackground = (ctx, canvas) => {
  ctx.fillStyle = '#131313';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, 150);
  gradient.addColorStop(0, '#142B42');
  gradient.addColorStop(1, '#08111B');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawCategory = async (cat, x, y, ctx, canvas) => {
  let glyph = 'news';
  if (cat === 'changelogs') {
    glyph = 'box';
  } else if (cat === 'blog') {
    glyph = 'blog';
  } else if (cat === 'promotions') {
    glyph = 'star';
  }
  const image = await loadImage(`${FRONTEND_URL}/images/glyphs/${glyph}.png`);
  const imageSize = 65;
  ctx.drawImage(image, x, y, imageSize, imageSize);
}

const drawIcon = async (metadata, x, y, ctx, canvas) => {
  const icon = metadata?.icons['PNG_TRANSPARENT'] ?? metadata?.icons['PNG'];
  if (!icon) {
    return;
  }
  const image = await loadImage(`${ASSETS_URL}/${icon}`);
  const imageSize = 75;
  ctx.drawImage(image, x, y, imageSize, imageSize);
}

// 404 not found
const notFound = (event) => {
  setResponseStatus(event, 404);
  return "Not found";
}

export default defineEventHandler(async (event) => {
  // Set content-type
  setResponseHeader(event, 'Content-Type', 'image/png');
  const post = await fetchPost(await getRouterParam(event, 'post'));
  if (!post) return notFound();

  // Register fonts
  registerFont('server/routes/images/thumbnails/font/regular.ttf', { family: 'Nunito' });
  registerFont('server/routes/images/thumbnails/font/bold.ttf', { family: 'NunitoBold' });
  const canvas = createCanvas(225, 150);
  const ctx = canvas.getContext('2d');

  // Draw BG
  drawBackground(ctx, canvas);

  // Draw category icon to the right
  const project = post.associatedProject;
  if (project) {
    await drawIcon(project?.metadata, 30, 38, ctx, canvas);
  }
  await drawCategory(post.category, project ? 125 : 80, 42, ctx, canvas);

  // Return the image buffer
  return canvas.toBuffer();
});